// Design philosophy: Contemporary Scientific Editorial — a complete, uncropped field-notes archive using every uploaded customer file.
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import SiteLayout, { PageHero } from "@/components/SiteLayout";
import { useSiteCopy } from "@/hooks/useSiteCopy";

const feedbackFiles = [
  "/manus-storage/feedback-1_0538cdc0.jpg", "/manus-storage/feedback-2_45bfb60e.jpg", "/manus-storage/feedback-3_bdd8a11c.jpg", "/manus-storage/feedback-4_d066181f.jpg", "/manus-storage/feedback-5_29e48f3a.jpg", "/manus-storage/feedback-6_5e5922a4.jpg", "/manus-storage/feedback-7_af6e97c1.jpg", "/manus-storage/feedback-8_4d905265.jpg", "/manus-storage/feedback-9_a8b89655.jpg",
];
const deliveryFiles = [
  "/manus-storage/delivery-1_b2a1580f.jpg", "/manus-storage/delivery-2_a0acd26b.jpg", "/manus-storage/delivery-3_b513e47e.jpg", "/manus-storage/delivery-4_567f0739.jpg", "/manus-storage/delivery-5_61afaf99.jpg", "/manus-storage/delivery-6_3aeaf61e.jpg", "/manus-storage/delivery-7_06b2f77a.jpg", "/manus-storage/delivery-8_db263c4c.jpg", "/manus-storage/delivery-9_a2a9308a.jpg",
];

function ArchiveGrid({ title, label, files, prefix }: { title: string; label: string; files: string[]; prefix: string }) {
  return <section className="feedback-archive"><div className="archive-section-head"><div><span className="archive-label">{label}</span><h2>{title}</h2></div><span className="archive-count">{String(files.length).padStart(2, "0")} FILES</span></div><div className="full-feedback-grid">{files.map((src, index) => <a className="full-feedback-card" href={src} target="_blank" rel="noreferrer" key={src}><div className="full-feedback-image"><img src={src} alt={`${prefix} ${index + 1}`} /></div><div className="full-feedback-meta"><span>{prefix} / {String(index + 1).padStart(2, "0")}</span><ArrowUpRight size={15} /></div></a>)}</div></section>;
}

export default function Feedback() {
  const copy = useSiteCopy();
  return <SiteLayout><main><PageHero index="04" kicker={copy.get("feedback.hero.kicker", "CUSTOMER FEEDBACK / FIELD NOTES")} title={<>{copy.get("feedback.hero.title", "Customer Feedback,")}<br /><em>{copy.get("feedback.hero.titleEm", "Complete Archive.")}</em></>} intro={copy.get("feedback.hero.intro", "Your customer feedback and delivery records are shown independently in full. Every image keeps its original proportions; click to view the original image.")} /><section className="section feedback-page-section"><div className="container"><div className="feedback-top-note"><div className="quote-mark">“</div><div><p>{copy.get("feedback.note.body", "Consistent quality, clear documentation, and traceable delivery are the strongest language of long-term collaboration.")}</p><span>{copy.get("feedback.note.caption", "— TIDE / PARTNERSHIP NOTE 04")}</span></div><Link className="text-link" href="/contact">{copy.get("feedback.note.cta", "Start the Next Collaboration")} <ArrowUpRight size={15} /></Link></div><ArchiveGrid title={copy.get("feedback.archive.feedbackTitle", "Customer Feedback Files")} label={copy.get("feedback.archive.feedbackLabel", "CUSTOMER FEEDBACK / 09 FILES")} files={feedbackFiles} prefix={copy.get("feedback.archive.feedbackPrefix", "FEEDBACK FILE")} /><ArchiveGrid title={copy.get("feedback.archive.deliveryTitle", "Delivery Records")} label={copy.get("feedback.archive.deliveryLabel", "DELIVERY RECORDS / 09 FILES")} files={deliveryFiles} prefix={copy.get("feedback.archive.deliveryPrefix", "DELIVERY FILE")} /><div className="feedback-end-note"><ChevronDown size={18} /><span>{copy.get("feedback.archive.endNote", "All customer files are shown above.")}</span></div></div></section></main></SiteLayout>;
}
