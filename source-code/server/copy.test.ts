import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createContext(role: "admin" | "user"): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "copy-test-user",
      email: "copy@example.com",
      name: "Copy Test User",
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

describe("site copy admin procedures", () => {
  it("rejects copy listing for non-admin users", async () => {
    const caller = appRouter.createCaller(createContext("user"));
    await expect(caller.copy.list()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("rejects invalid content keys before database access", async () => {
    const caller = appRouter.createCaller(createContext("admin"));
    await expect(caller.copy.upsert({
      contentKey: "Bad Key!",
      page: "about",
      section: "hero",
      field: "title",
      label: "Invalid key",
      value: "Test",
      valueType: "text",
    })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("rejects copy deletion with a non-positive id", async () => {
    const caller = appRouter.createCaller(createContext("admin"));
    await expect(caller.copy.delete({ id: 0 })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});
