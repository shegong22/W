import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function contextFor(role: "admin" | "user"): TrpcContext {
  return {
    user: {
      id: 1,
      openId: `${role}-test-user`,
      email: `${role}@example.com`,
      name: role,
      loginMethod: "test",
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("inquiries", () => {
  it("rejects inquiry listing for non-admin users", async () => {
    const caller = appRouter.createCaller(contextFor("user"));
    await expect(caller.inquiries.list()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("requires explicit consent before creating an inquiry", async () => {
    const caller = appRouter.createCaller(contextFor("user"));
    await expect(caller.inquiries.create({
      name: "Example Company",
      email: "buyer@example.com",
      requirement: "Need a COA-backed peptide product inquiry.",
      consent: false,
    })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});

describe("inquiries.update", () => {
  it("rejects non-admin users from updating inquiry workflow", async () => {
    const caller = appRouter.createCaller(contextFor("user"));
    await expect(caller.inquiries.update({ id: 1, status: "contacted", notes: "Followed up" })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
