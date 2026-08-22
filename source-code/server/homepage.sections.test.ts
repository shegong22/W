import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const aboutSource = readFileSync(resolve(import.meta.dirname, "../client/src/pages/About.tsx"), "utf8");

describe("homepage section regression", () => {
  it("removes only the two user-marked sections", () => {
    expect(aboutSource).not.toContain("production-flow-section");
    expect(aboutSource).not.toContain("capability-section");
    expect(aboutSource).not.toContain("about.capability.");
    expect(aboutSource).toContain("client-visit-section");
    expect(aboutSource).toContain("quality-section");
    expect(aboutSource).not.toContain("oem-section");
    expect(aboutSource).not.toContain("about.oem.kicker");
    expect(aboutSource).not.toContain("oem-flow");
    expect(aboutSource).toContain("factory-cta-section");
    expect(aboutSource).toContain("factory-cta");
    expect(aboutSource).toContain('href="/contact"');
  });
});
