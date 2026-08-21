import { useState } from "react";
import { ArrowUpRight, MapPin, Phone, ShieldCheck } from "lucide-react";
import SiteLayout, { PageHero } from "@/components/SiteLayout";
import { trpc } from "@/lib/trpc";
import { useSiteCopy } from "@/hooks/useSiteCopy";

export default function Contact() {
  const copy = useSiteCopy();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [requirement, setRequirement] = useState("");
  const [consent, setConsent] = useState(false);
  const [success, setSuccess] = useState(false);
  const createInquiry = trpc.inquiries.create.useMutation({
    onSuccess: () => {
      setName("");
      setEmail("");
      setRequirement("");
      setConsent(false);
      setSuccess(true);
    },
  });

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccess(false);
    if (!consent) return;
    createInquiry.mutate({ name, email, requirement, consent: true });
  };

  return <SiteLayout><main><PageHero index="05" kicker={copy.get("contact.hero.kicker", "Contact Us / CONTACT TIDE")} title={<>{copy.get("contact.hero.title", "Tell us")}<br /><em>{copy.get("contact.hero.titleEm", "what comes next.")}</em></>} intro={copy.get("contact.hero.intro", "Leave your product, specification, quantity, or OEM/ODM requirement and we will contact you through WhatsApp.")} /><section className="contact-section contact-page-section"><div className="container contact-layout"><div><div className="section-head"><div className="section-index">05A</div><div><span className="archive-label">{copy.get("contact.channels.kicker", "DIRECT CHANNELS")}</span><h2>{copy.get("contact.channels.title", "Start with one message")}<br /><em>{copy.get("contact.channels.titleEm", "and move forward.")}</em></h2></div></div><div className="contact-links"><a href="https://wa.me/85253929189" target="_blank" rel="noreferrer"><Phone size={18} /><span>{copy.get("contact.channels.whatsapp", "WhatsApp / +852 5392 9189")}</span><ArrowUpRight size={15} /></a><div><MapPin size={18} /><span>{copy.get("contact.channels.location", "Guangzhou, Guangdong / China / Guangzhou, China")}</span></div><div><ShieldCheck size={18} /><span>{copy.get("contact.channels.credentials", "COA documentation · OEM/ODM support")}</span></div></div></div><form className="contact-form" onSubmit={submit}><div className="form-row"><label>{copy.get("contact.form.nameLabel", "Your Name")}<input value={name} onChange={(event) => setName(event.target.value)} placeholder={copy.get("contact.form.namePlaceholder", "Name / Company")} required /></label><label>{copy.get("contact.form.emailLabel", "Contact Email")}<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder={copy.get("contact.form.emailPlaceholder", "you@company.com")} required /></label></div><label>{copy.get("contact.form.requirementLabel", "Research Requirement")}<textarea value={requirement} onChange={(event) => setRequirement(event.target.value)} placeholder={copy.get("contact.form.requirementPlaceholder", "Describe the product, specification, quantity, or COA requirement")} rows={6} required minLength={10} /></label><label className="consent"><input checked={consent} onChange={(event) => setConsent(event.target.checked)} type="checkbox" required /> {copy.get("contact.form.consent", "I agree that Tide may use this information to contact me.")}</label>{success && <p className="form-success">{copy.get("contact.form.success", "Your enquiry has been received. Tide will review it and contact you shortly.")}</p>}{createInquiry.error && <p className="form-error">{copy.get("contact.form.error", "We could not submit this enquiry. Please try WhatsApp directly.")}</p>}<button className="button button-light" type="submit" disabled={createInquiry.isPending}>{createInquiry.isPending ? copy.get("contact.form.sending", "Sending...") : copy.get("contact.form.submit", "Send Enquiry")} <ArrowUpRight size={17} /></button></form></div></section></main></SiteLayout>;
}
