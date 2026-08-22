// Design philosophy: Contemporary Scientific Editorial in a premium blue system — each page is a distinct archive chapter.
import { Link } from "wouter";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSiteCopy } from "@/hooks/useSiteCopy";

const navItems = [
  ["nav.about", "About TIDE", "/"],
  ["nav.manufacturing", "Manufacturing", "/laboratory"],
  ["nav.coa", "COA Reports", "/coa"],
  ["nav.technology", "Technology", "/products"],
  ["nav.portfolio", "Portfolio", "/products"],
  ["nav.partners", "Partners", "/partners"],
  ["nav.contact", "Contact", "/contact"],
] as const;

type NavProps = { mobile?: boolean; onNavigate?: () => void };
function NavigationLinks({ mobile = false, onNavigate }: NavProps) {
  return <>{navItems.map(([key, fallback, href], index) => <Link className={mobile ? "mobile-link-reveal" : "nav-link-reveal"} style={{ animationDelay: `${index * 35}ms` }} key={href} href={href} onClick={onNavigate}>{fallback}</Link>)}</>;
}

function BrandReveal() {
  const [visible, setVisible] = useState(false);
  const copy = useSiteCopy();
  useEffect(() => {
    if (window.location.pathname !== "/") return;
    try { if (window.sessionStorage.getItem("tide-logo-reveal-seen") === "1") return; window.sessionStorage.setItem("tide-logo-reveal-seen", "1"); } catch { /* Continue without session persistence. */ }
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), 3000);
    return () => window.clearTimeout(timer);
  }, []);
  if (!visible) return null;
  return <div className="brand-reveal" role="status" aria-label="Tide logo reveal loading" onClick={() => setVisible(false)}><div className="brand-reveal-field" aria-hidden="true"><span className="brand-drop" /><span className="brand-ripple brand-ripple-a" /><span className="brand-ripple brand-ripple-b" /><span className="brand-ripple brand-ripple-c" /></div><div className="brand-reveal-mark"><img src="/assets/tide-logo_e4a10c2a.png" alt="Tide scientific institution" /><span>TIDE / PEPTIDES</span></div><button className="brand-reveal-skip" type="button" onClick={(event) => { event.stopPropagation(); setVisible(false); }}>{copy.get("layout.revealSkip", "Skip")}</button></div>;
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const copy = useSiteCopy();
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  useEffect(() => { const items = Array.from(document.querySelectorAll<HTMLElement>(".reveal-on-scroll, .site-shell main > .section, .site-shell main > .contact-page-section")); if (!("IntersectionObserver" in window)) { items.forEach((item) => item.classList.add("is-visible")); return; } const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }); }, { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }); items.forEach((item) => observer.observe(item)); return () => observer.disconnect(); }, []);
  return <div className="site-shell"><BrandReveal /><header className={`site-header page-header ${scrolled ? "is-scrolled" : ""}`}><Link className="brand" href="/" aria-label="Tide Peptides home"><img className="brand-logo" src="/assets/tide-logo_e4a10c2a.png" alt="Tide Peptides" /></Link><nav className="desktop-nav" aria-label="Primary navigation"><NavigationLinks /></nav><div className="header-actions"><a className="header-cta" href="https://wa.me/85253929189" target="_blank" rel="noreferrer">Request Partnership <ArrowUpRight size={15} /></a></div><button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Open menu">{mobileOpen ? <X /> : <Menu />}</button>{mobileOpen && <nav className="mobile-nav" aria-label="Mobile navigation"><NavigationLinks mobile onNavigate={() => setMobileOpen(false)} /></nav>}</header>{children}<footer className="site-footer"><div className="container footer-inner"><div className="brand footer-brand"><img className="brand-logo" src="/assets/tide-logo_e4a10c2a.png" alt="Tide Peptides" /></div><span>{copy.get("layout.copyright", "© 2026 Tide Peptides")}</span><span>{copy.get("layout.footerTagline", "Pure · Potent · Precise · Serving Global Research")}</span></div></footer></div>;
}

export function PageHero({ index, total = "08", kicker, title, intro }: { index: string; total?: string; kicker: string; title: React.ReactNode; intro: string }) {
  return <section className="page-hero page-hero-animated"><div className="container page-hero-inner"><div className="hero-index hero-reveal hero-delay-1">{index} <span>/ {total}</span></div><div><span className="archive-label hero-reveal hero-delay-2">{kicker}</span><h1 className="hero-title-reveal">{title}</h1><p className="hero-reveal hero-delay-4">{intro}</p></div></div></section>;
}

export function SectionHead({ index, kicker, title, intro }: { index: string; kicker: string; title: React.ReactNode; intro?: string }) {
  return <div className="section-head"><div className="section-index">{index}</div><div><span className="archive-label">{kicker}</span><h2>{title}</h2>{intro && <p>{intro}</p>}</div></div>;
}
