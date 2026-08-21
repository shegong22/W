import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createContext(role: "admin" | "user"): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "media-test-user",
      email: "media@example.com",
      name: "Media Test User",
      loginMethod: "manus",
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => undefined } as TrpcContext["res"],
  };
}

describe("media admin procedures", () => {
  it("rejects media listing for non-admin users", async () => {
    const caller = appRouter.createCaller(createContext("user"));
    await expect(caller.media.list()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("rejects media deletion for non-admin users", async () => {
    const caller = appRouter.createCaller(createContext("user"));
    await expect(caller.media.delete({ id: 1 })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("rejects invalid delete ids before database access", async () => {
    const caller = appRouter.createCaller(createContext("admin"));
    await expect(caller.media.delete({ id: 0 })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("rejects invalid asset slots before storage upload", async () => {
    const caller = appRouter.createCaller(createContext("admin"));
    await expect(caller.media.upload({
      slot: "Home Product RT60",
      category: "home",
      title: "Retatrutide RT60",
      altText: "Retatrutide RT60 real batch presentation",
      fileName: "rt60.png",
      mimeType: "image/png",
      dataBase64: "a".repeat(100),
    })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});
