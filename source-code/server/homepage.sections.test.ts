import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const aboutSource = readFileSync(resolve(import.meta.dirname, "../client/src/pages/About.tsx"), "utf8");
const feedbackSource = readFileSync(resolve(import.meta.dirname, "../client/src/pages/Feedback.tsx"), "utf8");
const specPageSource = readFileSync(resolve(import.meta.dirname, "../client/src/pages/SpecPage.tsx"), "utf8");
const appSource = readFileSync(resolve(import.meta.dirname, "../client/src/App.tsx"), "utf8");

describe("homepage section regression", () => {
  it("preserves the existing homepage and standalone feedback archive", () => {
    expect(aboutSource).not.toContain("production-flow-section");
    expect(aboutSource).not.toContain("capability-section");
    expect(aboutSource).not.toContain("about.capability.");
    expect(aboutSource).toContain("client-visit-section");
    expect(aboutSource).toContain('copy.get("about.hero.meta", "ABOUT TIDE")');
    expect(aboutSource).not.toContain('copy.get("about.hero.meta", "ABOUT TIDE / 07")');
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
    expect(appSource).toContain('function PartnersFeedback() { return <Feedback />; }');
    expect(appSource).toContain('<Route path="/partners" component={PartnersFeedback} />');
    expect(appSource).not.toContain('titleOverride="Feedback Files"');
    expect(appSource).toContain('function FeedbackRoute() { return <Feedback />; }');
    expect(appSource).toContain('<Route path="/feedback" component={FeedbackRoute} />');
    expect(specPageSource).not.toContain("spec-feedback-preview");
    expect(specPageSource).not.toContain("feedbackPreview");
    expect(specPageSource).not.toContain('feedback-1_0538cdc0.jpg');
    expect(specPageSource).not.toContain('delivery-3_b513e47e.jpg');
    expect(readFileSync(resolve(import.meta.dirname, "../client/src/components/SiteLayout.tsx"), "utf8")).toContain('["nav.partners", "Feedback Files", "/partners"]');
    expect(specPageSource).toContain("spec-partner-support-preview");
    expect(specPageSource).toContain("partnerSupportPreview />");

    const partnersSource = specPageSource.slice(specPageSource.indexOf("export function Partners()"), specPageSource.indexOf("export function ContactSpec()"));
    expect(partnersSource).not.toContain("GLOBAL B2B SUPPORT");
    expect(partnersSource).toContain("PARTNERSHIP PRINCIPLES");

    const manufacturingSource = specPageSource.slice(specPageSource.indexOf("export function Manufacturing()"), specPageSource.indexOf("export function Technology()"));
    expect(manufacturingSource).toContain("partnerSupportPreview />");
  });
});
