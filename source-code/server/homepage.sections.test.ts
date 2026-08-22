import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const aboutSource = readFileSync(resolve(import.meta.dirname, "../client/src/pages/About.tsx"), "utf8");
const feedbackSource = readFileSync(resolve(import.meta.dirname, "../client/src/pages/Feedback.tsx"), "utf8");
const specPageSource = readFileSync(resolve(import.meta.dirname, "../client/src/pages/SpecPage.tsx"), "utf8");

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
    expect(aboutSource).not.toContain("about-feedback-bridge");
    expect(aboutSource).not.toContain("about.feedback.kicker");
    expect(aboutSource).toContain('href="/contact"');
    expect(feedbackSource).toContain("Customer Feedback Files");
    expect(feedbackSource).toContain("Delivery Records");
    expect(feedbackSource).toContain("feedback-archive");
    expect(specPageSource).toContain("spec-feedback-preview");
    expect(specPageSource).toContain("feedbackPreview");
    expect(specPageSource).toContain('feedback-1_0538cdc0.jpg');
    expect(specPageSource).toContain('delivery-3_b513e47e.jpg');
    expect(specPageSource).toContain('feedbackPreview />');
  });
});
