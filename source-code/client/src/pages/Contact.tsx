import { useState } from "react";
import { ArrowUpRight, Mail, MapPin, Phone, ShieldCheck, Plus, Trash2 } from "lucide-react";
import SiteLayout, { PageHero } from "@/components/SiteLayout";
import { useSiteCopy } from "@/hooks/useSiteCopy";
import { productCatalog } from "@/data/productCatalog";

export default function Contact() {
  const copy = useSiteCopy();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [company, setCompany] = useState("");
  const [inquiryType, setInquiryType] = useState("Business inquiry");
  const [products, setProducts] = useState([{ name: "", sku: "" }]);
  const [requirement, setRequirement] = useState("");
  const [consent, setConsent] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inquiryApiUrl = "https://tidbioconsol-7pvrbanu.manus.space";

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccess(false);
    setSubmitError("");
    if (!consent) return;
    const productLines = products.map((product, index) => `${index + 1}. ${product.name || "Not selected"} / ${product.sku || "Not selected"}`).join("\n");
    const structuredRequirement = `Inquiry type: ${inquiryType}\nProducts / SKUs:\n${productLines}\nCompany: ${company || "Not provided"}\nCountry / Region: ${country}\n\nDetails:\n${requirement}`;
    if (!inquiryApiUrl) {
      setSubmitError("The online inquiry service is not configured. Please email tidepeptide@gmail.com or contact us on WhatsApp.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(`${inquiryApiUrl}/api/public/inquiries`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, country, company: company || null, inquiryType, products: productLines, requirement: structuredRequirement, consent: true }) });
      if (!response.ok) throw new Error("Submission failed");
      setName(""); setEmail(""); setCountry(""); setCompany(""); setInquiryType("Business inquiry"); setProducts([{ name: "", sku: "" }]); setRequirement(""); setConsent(false); setSuccess(true);
    } catch {
      setSubmitError("We could not submit this enquiry. Please email tidepeptide@gmail.com or contact us on WhatsApp.");
    } finally { setIsSubmitting(false); }
  };

  return <SiteLayout><main><PageHero index="05" kicker={copy.get("contact.hero.kicker", "Contact Us / CONTACT TIDE")} title={<>{copy.get("contact.hero.title", "Tell us")}<br /><em>{copy.get("contact.hero.titleEm", "what comes next.")}</em></>} intro={copy.get("contact.hero.intro", "Leave your product, specification, quantity, or OEM/ODM requirement and we will contact you through WhatsApp.")} /><section className="contact-section contact-page-section" id="partnership-form"><div className="container contact-layout"><div><div className="section-head"><div className="section-index">05A</div><div><span className="archive-label">{copy.get("contact.channels.kicker", "DIRECT CHANNELS")}</span><h2>{copy.get("contact.channels.title", "Start with one message")}<br /><em>{copy.get("contact.channels.titleEm", "and move forward.")}</em></h2></div></div><div className="contact-links"><a href="https://wa.me/85266153262" target="_blank" rel="noreferrer"><Phone size={18} /><span>WhatsApp / +852 6615 3262</span><ArrowUpRight size={15} /></a><a href="https://wa.me/85253929189" target="_blank" rel="noreferrer"><Phone size={18} /><span>{copy.get("contact.channels.whatsapp", "WhatsApp / +852 5392 9189")}</span><ArrowUpRight size={15} /></a><a href="mailto:tidepeptide@gmail.com"><Mail size={18} /><span>tidepeptide@gmail.com</span><ArrowUpRight size={15} /></a><div><MapPin size={18} /><span>{copy.get("contact.channels.location", "Guangzhou, Guangdong, China")}</span></div><div><ShieldCheck size={18} /><span>{copy.get("contact.channels.credentials", "COA documentation · OEM/ODM support")}</span></div></div></div><form className="contact-form premium-partnership-form" onSubmit={submit}><div className="form-form-heading"><span className="archive-label">REQUEST PARTNERSHIP / BUSINESS REGISTRATION</span><h2>Tell us where<br /><em>we can help.</em></h2><p>Share a few details and our China-based peptide team will follow up with a clear next step.</p></div><div className="form-row"><label>{copy.get("contact.form.nameLabel", "Your Name")}<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Full name" required /></label><label>{copy.get("contact.form.emailLabel", "Work Email")}<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="you@company.com" required /></label></div><div className="product-request-list"><div className="product-request-list-head"><span>Products / SKUs</span><small>Select one or more products for this inquiry.</small></div>{products.map((product, productIndex) => <div className="product-request-row" key={`product-${productIndex}`}><span className="product-request-number">{String(productIndex + 1).padStart(2, "0")}</span><select value={product.name} onChange={(event) => setProducts((current) => current.map((item, index) => index === productIndex ? { name: event.target.value, sku: "" } : item))} required><option value="">Select a product</option>{productCatalog.map((option) => <option key={option.name} value={option.name}>{option.name}</option>)}</select><select value={product.sku} onChange={(event) => setProducts((current) => current.map((item, index) => index === productIndex ? { ...item, sku: event.target.value } : item))} disabled={!product.name} required><option value="">{product.name ? "Select SKU" : "SKU"}</option>{(productCatalog.find((option) => option.name === product.name)?.skus ?? []).map((option) => <option key={option} value={option}>{option}</option>)}</select>{products.length > 1 && <button type="button" className="product-remove-button" onClick={() => setProducts((current) => current.filter((_, index) => index !== productIndex))} aria-label={`Remove product ${productIndex + 1}`}><Trash2 size={15} /></button>}</div>)}<button type="button" className="product-add-button" onClick={() => setProducts((current) => [...current, { name: "", sku: "" }])}><Plus size={15} /> Add another product</button></div><div className="form-row"><label>Country / Region<input value={country} onChange={(event) => setCountry(event.target.value)} placeholder="United States / Canada / Europe" required /></label><label>Company / Institution<input value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Company or research institution" /></label></div><label>Inquiry Type<select value={inquiryType} onChange={(event) => setInquiryType(event.target.value)}><option>Business inquiry</option><option>Bulk order support</option><option>Technical consultation</option><option>OEM / ODM discussion</option></select></label><label>{copy.get("contact.form.requirementLabel", "What should our team know?")}<textarea value={requirement} onChange={(event) => setRequirement(event.target.value)} placeholder={copy.get("contact.form.requirementPlaceholder", "Describe the product, specification, quantity, or COA requirement")} rows={6} required minLength={10} /></label><label className="consent"><input checked={consent} onChange={(event) => setConsent(event.target.checked)} type="checkbox" required /> {copy.get("contact.form.consent", "I agree that Tide may use this information to contact me.")}</label>{success && <p className="form-success">{copy.get("contact.form.success", "Your enquiry has been received. Tide will review it and contact you shortly.")}</p>}{submitError && <p className="form-error">{submitError}</p>}<button className="button button-light" type="submit" disabled={isSubmitting}>{isSubmitting ? copy.get("contact.form.sending", "Sending...") : copy.get("contact.form.submit", "Send Enquiry")} <ArrowUpRight size={17} /></button></form></div></section></main></SiteLayout>;
}
