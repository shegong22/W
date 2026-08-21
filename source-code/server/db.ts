import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertInquiry, InsertMediaAsset, InsertUser, InsertSiteCopy, inquiries, mediaAssets, siteCopy, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function createInquiry(input: Omit<InsertInquiry, "id" | "createdAt">) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const result = await db.insert(inquiries).values(input);
  return { id: Number(result[0].insertId) };
}

export async function listInquiries() {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  return db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
}

export async function updateInquiry(id: number, status: string, notes: string | null) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.update(inquiries).set({ status, notes }).where(eq(inquiries.id, id));
  const result = await db.select().from(inquiries).where(eq(inquiries.id, id)).limit(1);
  return result[0];
}

export async function listSiteCopy() {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  return db.select().from(siteCopy).orderBy(siteCopy.page, siteCopy.section, siteCopy.field);
}

export async function upsertSiteCopy(input: InsertSiteCopy) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.insert(siteCopy).values(input).onDuplicateKeyUpdate({
    set: { page: input.page, section: input.section, field: input.field, label: input.label, value: input.value, valueType: input.valueType },
  });
  return db.select().from(siteCopy).where(eq(siteCopy.contentKey, input.contentKey)).limit(1);
}

export async function deleteSiteCopy(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.delete(siteCopy).where(eq(siteCopy.id, id));
  return { success: true } as const;
}

export async function listMediaAssets(includeInactive = false) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const query = db.select().from(mediaAssets).orderBy(desc(mediaAssets.updatedAt));
  return includeInactive ? query : query.where(eq(mediaAssets.isActive, 1));
}

export async function getMediaAssetBySlot(slot: string) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const result = await db.select().from(mediaAssets).where(eq(mediaAssets.slot, slot)).limit(1);
  return result[0];
}

export async function upsertMediaAsset(input: Omit<InsertMediaAsset, "id" | "createdAt" | "updatedAt">) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.insert(mediaAssets).values(input).onDuplicateKeyUpdate({
    set: {
      category: input.category,
      title: input.title,
      altText: input.altText,
      fileName: input.fileName,
      fileKey: input.fileKey,
      url: input.url,
      mimeType: input.mimeType,
      isActive: input.isActive,
      updatedAt: new Date(),
    },
  });
  return getMediaAssetBySlot(input.slot);
}

export async function deleteMediaAsset(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.delete(mediaAssets).where(eq(mediaAssets.id, id));
  return { success: true } as const;
}
