import { useState } from "react";
import { ArrowUpRight, MapPin, Phone, ShieldCheck } from "lucide-react";
import SiteLayout, { PageHero } from "@/components/SiteLayout";
import { trpc } from "@/lib/trpc";
import { useSiteCopy } from "@/hooks/useSiteCopy";
import { productCatalog } from "@/data/productCatalog";

export default function Contact() {
  const copy = useSiteCopy();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [company, setCompany] = useState("");
  const [inquiryType, setInquiryType] = useState("Business inquiry");
  const [productName, setProductName] = useState("");
  const [sku, setSku] = useState("");
  const [requirement, setRequirement] = useState("");
  const [consent, setConsent] = useState(false);
  const [success, setSuccess] = useState(false);
  const createInquiry = trpc.inquiries.create.useMutation({
    onSuccess: () => {
      setName("");
      setEmail("");
      setCountry("");
      setCompany("");
      setInquiryType("Business inquiry");
      setProductName("");
      setSku("");
      setRequirement("");
      setConsent(false);
      setSuccess(true);
    },
  });

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccess(false);
    if (!consent) return;
    const structuredRequirement = `Inquiry type: ${inquiryType}\nProduct: ${productName || "Not selected"}\nSKU: ${sku || "Not selected"}\nCompany: ${company || "Not provided"}\nCountry / Region: ${country}\n\nDetails:\n${requirement}`;
    createInquiry.mutate({ name, email, requirement: structuredRequirement, consent: true });
  };

  return <SiteLayout><main><PageHero index="05" kicker={copy.get("contact.hero.kicker", "Contact Us / CONTACT TIDE")} title={<>{copy.get("contact.hero.title", "Tell us")}<br /><em>{copy.get("contact.hero.titleEm", "what comes next.")}</em></>} intro={copy.get("contact.hero.intro", "Leave your product, specification, quantity, or OEM/ODM requirement and we will contact you through WhatsApp.")} /><section className="contact-section contact-page-section" id="partnership-form"><div className="container contact-layout"><div><div className="section-head"><div className="section-index">05A</div><div><span className="archive-label">{copy.get("contact.channels.kicker", "DIRECT CHANNELS")}</span><h2>{copy.get("contact.channels.title", "Start with one message")}<br /><em>{copy.get("contact.channels.titleEm", "and move forward.")}</em></h2></div></div><div className="contact-links"><a href="https://wa.me/85253929189" target="_blank" rel="noreferrer"><Phone size={18} /><span>{copy.get("contact.channels.whatsapp", "WhatsApp / +852 5392 9189")}</span><ArrowUpRight size={15} /></a><div><MapPin size={18} /><span>{copy.get("contact.channels.location", "Guangzhou, Guangdong / China / Guangzhou, China")}</span></div><div><ShieldCheck size={18} /><span>{copy.get("contact.channels.credentials", "COA documentation · OEM/ODM support")}</span></div></div></div><form className="contact-form premium-partnership-form" onSubmit={submit}><div className="form-form-heading"><span className="archive-label">REQUEST PARTNERSHIP / BUSINESS REGISTRATION</span><h2>Tell us where<br /><em>we can help.</em></h2><p>Share a few details and our China-based peptide team will follow up with a clear next step.</p></div><div className="form-row"><label>{copy.get("contact.form.nameLabel", "Your Name")}<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Full name" required /></label><label>{copy.get("contact.form.emailLabel", "Work Email")}<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="you@company.com" required /></label></div><div className="form-row"><label>Product Name<select value={productName} onChange={(event) => { setProductName(event.target.value); setSku(""); }} required><option value="">Select a product</option>{productCatalog.map((product) => <option key={product.name} value={product.name}>{product.name}</option>)}</select></label><label>SKU<select value={sku} onChange={(event) => setSku(event.target.value)} disabled={!productName} required><option value="">{productName ? "Select a SKU" : "Select product first"}</option>{(productCatalog.find((product) => product.name === productName)?.skus ?? []).map((option) => <option key={option} value={option}>{option}</option>)}</select></label></div><div className="form-row"><label>Country / Region<input value={country} onChange={(event) => setCountry(event.target.value)} placeholder="United States / Canada / Europe" required /></label><label>Company / Institution<input value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Company or research institution" /></label></div><label>Inquiry Type<select value={inquiryType} onChange={(event) => setInquiryType(event.target.value)}><option>Business inquiry</option><option>Bulk order support</option><option>Technical consultation</option><option>OEM / ODM discussion</option></select></label><label>{copy.get("contact.form.requirementLabel", "What should our team know?")}<textarea value={requirement} onChange={(event) => setRequirement(event.target.value)} placeholder={copy.get("contact.form.requirementPlaceholder", "Describe the product, specification, quantity, or COA requirement")} rows={6} required minLength={10} /></label><label className="consent"><input checked={consent} onChange={(event) => setConsent(event.target.checked)} type="checkbox" required /> {copy.get("contact.form.consent", "I agree that Tide may use this information to contact me.")}</label>{success && <p className="form-success">{copy.get("contact.form.success", "Your enquiry has been received. Tide will review it and contact you shortly.")}</p>}{createInquiry.error && <p className="form-error">{copy.get("contact.form.error", "We could not submit this enquiry. Please try WhatsApp directly.")}</p>}<button className="button button-light" type="submit" disabled={createInquiry.isPending}>{createInquiry.isPending ? copy.get("contact.form.sending", "Sending...") : copy.get("contact.form.submit", "Send Enquiry")} <ArrowUpRight size={17} /></button></form></div></section></main></SiteLayout>;
}
