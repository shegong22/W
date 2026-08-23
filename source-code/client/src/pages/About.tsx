// Design philosophy: Contemporary Scientific Editorial — a direct, evidence-led factory dossier for Tide.
import { ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck, Boxes, FileCheck2, Globe2, Layers3, PackageCheck, ShieldCheck, Waypoints } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import SiteLayout, { SectionHead } from "@/components/SiteLayout";
import { useManagedMedia } from "@/hooks/useManagedMedia";
import { useSiteCopy } from "@/hooks/useSiteCopy";

const labImage = "/assets/asian-cleanroom_8ac53ec9.jpg";

const homeSlides = [
  { slot: "home_hero_cleanroom", fallback: "/assets/tide-lab-hero-cleanroom_ffb4f311.jpg", kicker: "01 / GUANGZHOU FACILITY", title: <>Precision built<br /><em>into every stage.</em></>, body: "A Chinese peptide factory connecting R&D, production coordination, analytical documentation, and global supply.", action: "Contact Us", href: "/contact" },
  { slot: "home_hero_synthesis", fallback: "/assets/tide-lab-hero-synthesis_18f9f3f8.jpg", kicker: "02 / PEPTIDE SCIENCE", title: <>Complex sequences,<br /><em>clear control.</em></>, body: "From di-peptides to 40+ amino acid sequences, Tide organizes technical requirements with precision.", action: "Meet our laboratory", href: "/laboratory" },
  { slot: "home_hero_batch", fallback: "/assets/tide-lab-hero-batch_0a8104c6.jpg", kicker: "03 / BATCH DOCUMENTATION", title: <>Every batch leaves<br /><em>a visible record.</em></>, body: "Review product models, batch presentation, COA documentation, and delivery milestones before you order.", action: "Review COA reports", href: "/coa" },
  { slot: "home_hero_analytical", fallback: "/assets/tide-lab-hero-analytical_1e7ff08d.jpg", kicker: "04 / FACTORY EVIDENCE", title: <>See the work<br /><em>before partnership.</em></>, body: "Real Guangzhou production evidence, organized handling, and direct communication for Western B2B buyers.", action: "Chat on WhatsApp", href: "https://wa.me/85253929189" },
] as const;

export default function About() {
  const managed = useManagedMedia();
  const copy = useSiteCopy();
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = homeSlides[activeSlide];
  const slideKicker = copy.get(`about.hero.${activeSlide + 1}.kicker`, slide.kicker);
  const slideBody = copy.get(`about.hero.${activeSlide + 1}.body`, slide.body);
  const slideAction = copy.get(`about.hero.${activeSlide + 1}.action`, slide.action);
  const slideTitleFallback = typeof slide.title === "string" ? slide.title : "Precision built into every stage.";

  useEffect(() => {
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % homeSlides.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  const moveSlide = (direction: 1 | -1) => setActiveSlide((current) => (current + direction + homeSlides.length) % homeSlides.length);

  return (
    <SiteLayout>
      <main>
        <section className="tide-interactive-hero" aria-label="Tide peptide factory highlights">
          <div className="tide-interactive-image" key={slide.slot} style={{ backgroundImage: `linear-gradient(90deg, rgba(5,24,54,.84) 0%, rgba(9,43,88,.5) 48%, rgba(9,43,88,.12) 100%), url(${managed.get(slide.slot, slide.fallback)})` }} />
          <div className="tide-interactive-grid" aria-hidden="true" />
          <div className="container tide-interactive-inner">
            <div className="tide-interactive-meta"><span>{copy.get("about.hero.meta", "ABOUT TIDE")}</span><span>{copy.get("about.hero.location", "GUANGZHOU, CHINA")}</span></div>
            <div className="tide-interactive-copy" key={slide.slot}>
              <span className="archive-label">{slideKicker}</span>
              <h1>{copy.get(`about.hero.${activeSlide + 1}.title`, slideTitleFallback)}</h1>
              <p>{slideBody}</p>
              {slide.href.startsWith("http") ? <a className="button button-light" href={slide.href} target="_blank" rel="noreferrer">{slideAction} <ArrowUpRight size={16} /></a> : <Link className="button button-light" href={slide.href}>{slideAction} <ArrowUpRight size={16} /></Link>}
            </div>
            <div className="tide-interactive-controls">
              <div className="tide-slide-count"><strong>{String(activeSlide + 1).padStart(2, "0")}</strong><span>/ {String(homeSlides.length).padStart(2, "0")}</span><i style={{ width: `${((activeSlide + 1) / homeSlides.length) * 100}%` }} /></div>
              <div className="tide-slide-buttons"><button type="button" onClick={() => moveSlide(-1)} aria-label="Previous Tide highlight"><ArrowLeft size={18} /></button><button type="button" onClick={() => moveSlide(1)} aria-label="Next Tide highlight"><ArrowRight size={18} /></button></div>
            </div>
          </div>
        </section>


        <section className="section facility-profile-section"><div className="container facility-profile"><div className="facility-profile-heading"><span className="archive-label">{copy.get("about.facility.kicker", "TIDE PEPTIDE LABORATORY / FACILITY OVERVIEW")}</span><h2>{copy.get("about.facility.title", "A Guangzhou facility,")}<br /><em>{copy.get("about.facility.titleEm", "producing for global customers.")}</em></h2><div className="facility-stat"><strong>72,000<span>㎡</span></strong><small>{copy.get("about.facility.statLabel", "Dedicated research, development & production space")}</small></div></div><div className="facility-profile-copy"><p className="facility-lead">{copy.get("about.facility.lead", "Located in Guangzhou, China, our state-of-the-art peptide manufacturing facility spans over 72,000 square meters of dedicated research, development, and production space. We have invested heavily in advanced automation and cutting-edge analytical instrumentation to ensure that every peptide leaving our facility meets the highest global standards of purity and performance.")}</p><p>{copy.get("about.facility.body", "Our team comprises PhD-level scientists, seasoned chemists, and dedicated quality assurance professionals who collaborate seamlessly to tackle the most challenging peptide synthesis requirements. Whether you require a simple di-peptide or a complex 40+ amino acid sequence with specific modifications, we possess the expertise and proprietary equipment to deliver with precision and consistency.")}</p><div className="facility-points"><div><strong>{copy.get("about.facility.point01.title", "01 / Research & Development")}</strong><span>{copy.get("about.facility.point01.body", "R&D and Product Documentation coordination")}</span></div><div><strong>{copy.get("about.facility.point02.title", "02 / Manufacturing")}</strong><span>{copy.get("about.facility.point02.body", "Peptide production and specification confirmation")}</span></div><div><strong>{copy.get("about.facility.point03.title", "03 / Automation")}</strong><span>{copy.get("about.facility.point03.body", "Automation and process management")}</span></div><div><strong>{copy.get("about.facility.point04.title", "04 / Analytical Instrumentation")}</strong><span>{copy.get("about.facility.point04.body", "Analytical testing and batch documentation support")}</span></div></div></div></div></section>


        <section className="section laboratory-order-section about-order-section homepage-trust-section">
          <div className="container">
            <div className="homepage-trust-intro">
              <div><span className="section-index">01</span><span className="archive-label">{copy.get("about.order.kicker", "SECURE ORDERING / SHIPPING PROCESS")}</span><h2>{copy.get("about.order.title", "Every order has a clear route")}<br /><em>{copy.get("about.order.titleEm", "from confirmation to delivery.")}</em></h2></div>
              <div><p className="lead-paragraph">{copy.get("about.order.lead", "We make payment, processing, packaging, tracking, and final delivery visible before the partnership begins.")}</p><p>{copy.get("about.order.intro", "Our process is built for Western B2B customers who need clear actions, documented milestones, and direct communication with a Chinese peptide factory.")}</p></div>
            </div>
            <div className="homepage-trust-feature-grid">
              <figure><img src={managed.get("home_order_quality", "/assets/tide-order-quality-control_16f20e7b.jpg")} alt="Chinese Asian quality specialist reviewing peptide order and batch documentation" /><figcaption><span>ORDER DOCUMENTATION</span><strong>Payment begins with a clear record.</strong></figcaption></figure>
              <div className="laboratory-order-grid homepage-order-grid">
                <article className="laboratory-order-card"><span className="laboratory-order-number">01</span><FileCheck2 size={22} /><h3>{copy.get("about.order.step01.title", "Invoice Issuance")}</h3><p>{copy.get("about.order.step01.body", "We will generate a proforma invoice for your order. You may settle the payment via PayPal or Cryptocurrency (USDT).")}</p></article>
                <article className="laboratory-order-card"><span className="laboratory-order-number">02</span><BadgeCheck size={22} /><h3>{copy.get("about.order.step02.title", "Payment Confirmation")}</h3><p>{copy.get("about.order.step02.body", "Please complete the payment for the invoice and send us a screenshot of the successful transaction for our records.")}</p></article>
                <article className="laboratory-order-card"><span className="laboratory-order-number">03</span><PackageCheck size={22} /><h3>{copy.get("about.order.step03.title", "Processing & Dispatch")}</h3><p>{copy.get("about.order.step03.body", "Upon confirmation of payment, our warehouse team immediately begins processing and packaging the order for shipment.")}</p></article>
                <article className="laboratory-order-card"><span className="laboratory-order-number">04</span><Globe2 size={22} /><h3>{copy.get("about.order.step04.title", "Shipment Tracking")}</h3><p>{copy.get("about.order.step04.body", "As soon as the order is dispatched, we provide the logistics tracking number and actual photographs of the packaged products.")}</p></article>
                <article className="laboratory-order-card"><span className="laboratory-order-number">05</span><ShieldCheck size={22} /><h3>{copy.get("about.order.step05.title", "Final Delivery")}</h3><p>{copy.get("about.order.step05.body", "Your order is delivered directly to the shipping address provided, with full traceability until it reaches your doorstep.")}</p></article>
              </div>
            </div>
            <div className="homepage-guarantee-layout">
              <div className="homepage-guarantee-copy"><span className="archive-label">{copy.get("about.guarantees.kicker", "OUR GUARANTEES / OUR GUARANTEES")}</span><h2>{copy.get("about.guarantees.title", "Responsibility that continues")}<br /><em>{copy.get("about.guarantees.titleEm", "after the order is placed.")}</em></h2><p>{copy.get("about.guarantees.intro", "Our guarantees are designed around delivery responsibility, repeat collaboration, and transparent access to the Guangzhou factory environment.")}</p><div className="laboratory-guarantee-grid about-guarantee-grid"><article><span>01</span><h3>{copy.get("about.guarantees.01.title", "100% Delivery Guarantee")}</h3><p>{copy.get("about.guarantees.01.body", "If your package gets held by customs, we will give you a full refund or resend it according to the confirmed order arrangement. We take responsibility for helping you receive the shipment safely.")}</p></article><article><span>02</span><h3>{copy.get("about.guarantees.02.title", "Win-Win Partnership")}</h3><p>{copy.get("about.guarantees.02.body", "Our profits come from repeat business. We focus on stable supply, consistent communication, and a long-term relationship that benefits both sides.")}</p></article><article><span>03</span><h3>{copy.get("about.guarantees.03.title", "On-Site Factory Tour")}</h3><p>{copy.get("about.guarantees.03.body", "If you travel to China, we would be happy to host you. Visit our Guangzhou laboratory to see how we maintain production standards.")}</p></article></div></div>
              <figure className="homepage-guarantee-image"><img src={managed.get("home_order_packaging", "/assets/tide-order-packaging_c385cde9.jpg")} alt="Chinese Asian cleanroom staff packaging peptide vials for shipment" /><figcaption><span>PACKAGING EVIDENCE</span><strong>Actual product photographs can accompany dispatch.</strong></figcaption></figure>
            </div>
            <figure className="homepage-tour-banner"><img src={managed.get("home_order_factory_tour", "/assets/tide-order-factory-tour_a86d4ecd.jpg")} alt="Chinese Asian scientists and visitor touring a Guangzhou peptide production facility" /><figcaption><span>GUANGZHOU FACTORY TOUR</span><strong>See the environment before a long-term partnership begins.</strong></figcaption></figure>
          </div>
        </section>


        <section className="section about-peptide-visuals"><div className="container"><div className="about-visual-head"><span className="archive-label">{copy.get("about.visual.kicker", "PEPTIDE FACILITY / Peptide Factory Field View")}</span><h2>{copy.get("about.visual.title", "From R&D to production,")}<br /><em>{copy.get("about.visual.titleEm", "every step has a corresponding environment.")}</em></h2><p>{copy.get("about.visual.intro", "Tide offers more than written introductions: customers can see the environments supporting peptide R&D, clean production, and quality control.")}</p></div><div className="about-peptide-grid"><figure className="about-peptide-card about-peptide-feature"><img src={managed.get("about_facility_rd", "/assets/tide-about-rd-coordination_0c7c2f18.jpg")} alt="Peptide synthesis research and development" /><figcaption><span>01 / SYNTHESIS & R&D</span><strong>Peptide R&D and Synthesis Coordination</strong><p>We establish a clear production foundation around product planning, R&D documentation, and specification confirmation.</p></figcaption></figure><figure className="about-peptide-card"><img src={managed.get("about_facility_cleanroom", "/assets/tide-about-controlled-cleanroom_30949468.jpg")} alt="Cleanroom pharmaceutical manufacturing" /><figcaption><span>02 / CLEANROOM</span><strong>Cleanroom Production Environment</strong><p>Controlled environmental management supports peptide production and batch operations.</p></figcaption></figure><figure className="about-peptide-card"><img src={managed.get("about_facility_lyophilization", "/assets/tide-about-lyophilization-process_903a0427.jpg")} alt="Freeze drying peptide vials" /><figcaption><span>03 / LYOPHILIZATION</span><strong>Lyophilization and Product Form</strong><p>We align product form, pack size, and related documentation.</p></figcaption></figure><figure className="about-peptide-card"><img src={managed.get("about_facility_production", "/assets/lyophilization_e21206db.png")} alt="Peptide production equipment" /><figcaption><span>04 / PRODUCTION</span><strong>Production Equipment and Process</strong><p>Equipment coordination and process management support consistent peptide delivery.</p></figcaption></figure></div></div></section>

        <section className="section client-visit-section"><div className="container"><div className="client-visit-head"><div><span className="archive-label">{copy.get("about.visit.kicker", "FACTORY EVIDENCE / GUANGZHOU SITE")}</span><h2>{copy.get("about.visit.title", "Real environments,")}<br /><em>{copy.get("about.visit.titleEm", "visible before the partnership begins.")}</em></h2></div><p>{copy.get("about.visit.intro", "Selected frames from Tide's Guangzhou production site. The homepage uses only cleanroom operations, local factory staff, product handling, and equipment evidence—no generic Western stock imagery.")}</p></div><div className="client-visit-grid"><figure className="client-visit-card"><img src={managed.get("about_visit_equipment_video_clean", "/assets/visit-equipment-dialogue-4x3_6719123d.jpg")} alt="Asian Tide factory staff discussing peptide production equipment in a cleanroom" /><figcaption><span>01 / CLIENT VISIT · EQUIPMENT REVIEW</span><strong>Factory equipment review</strong></figcaption></figure><figure className="client-visit-card"><img src={managed.get("about_visit_observation_video_clean", "/assets/visit-production-observation-4x3_3c6dac84.jpg")} alt="Client group meeting with Tide factory staff during a Guangzhou facility visit" /><figcaption><span>02 / CLIENT VISIT · ON-SITE MEETING</span><strong>Client group on-site meeting</strong></figcaption></figure><figure className="client-visit-card"><img src={managed.get("about_visit_product_photo_clean", "/assets/visit-product-vial-tray-4x3_53c56d19.jpg")} alt="Client visit photo taken at the Tide Guangzhou facility" /><figcaption><span>03 / CLIENT VISIT · VISIT PHOTO</span><strong>Client visit photo</strong></figcaption></figure></div></div></section>

        

        <section className="section quality-section">
          <div className="container quality-layout">
            <div><span className="archive-label">{copy.get("about.quality.kicker", "QUALITY CONTROL")}</span><h2>{copy.get("about.quality.title", "Credibility comes from")}<br /><em>{copy.get("about.quality.titleEm", "verifiable details.")}</em></h2><p className="quality-lead">{copy.get("about.quality.intro", "We do not publish unverified certifications, facility figures, operating years, or customer counts. For customers, accurate product documentation, batch records, and clear communication matter more than unsupported claims.")}</p></div>
            <div className="quality-list"><div><ShieldCheck /><div><strong>{copy.get("about.quality.01.title", "Product Information Confirmation")}</strong><p>{copy.get("about.quality.01.body", "Confirm the product name, specification, packaging, and sourcing quantity to keep quotations and files aligned.")}</p></div></div><div><BadgeCheck /><div><strong>{copy.get("about.quality.02.title", "COA File Matching")}</strong><p>{copy.get("about.quality.02.body", "Review COA documentation by batch for internal assessment and record keeping.")}</p></div></div><div><Layers3 /><div><strong>{copy.get("about.quality.03.title", "Files and Delivery Coordination")}</strong><p>{copy.get("about.quality.03.body", "After product and documentation confirmation, we coordinate payment, packaging, logistics, and delivery milestones.")}</p></div></div><div><PackageCheck /><div><strong>{copy.get("about.quality.04.title", "Pre- and After-Sales Follow-up")}</strong><p>{copy.get("about.quality.04.body", "Customers can send product, specification, or OEM/ODM requirements directly through WhatsApp.")}</p></div></div></div>
          </div>
        </section>

                <section className="section factory-cta-section">
          <div className="container"><div className="factory-cta"><div><strong>{copy.get("about.oem.ctaTitle", "Looking for a stable peptide factory?")}</strong><p>{copy.get("about.oem.ctaBody", "Send us your product list or OEM/ODM requirement.")}</p></div><Link className="button button-primary" href="/contact">{copy.get("about.oem.cta", "Contact Tide")} <ArrowUpRight size={16} /></Link></div></div>
        </section>
      </main>
    </SiteLayout>
  );
}
