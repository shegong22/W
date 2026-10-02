import { ArrowUpRight, ClipboardCheck } from "lucide-react";
import SiteLayout, { PageHero } from "@/components/SiteLayout";
import { useSiteCopy } from "@/hooks/useSiteCopy";

type Report = {
  ref: string;
  product: string;
  purity: string;
  lot: string;
  reported: string;
  file: string;
};

const r = (
  ref: string,
  product: string,
  purity: string,
  lot: string,
  reported: string,
  file: string,
): Report => ({ ref, product, purity, lot, reported, file });

const reports: Report[] = [
  r("01", "AOD-9604 5mg", "99.68%", "A2926040", "09 / 22 / 2026", "coa-aod9604-5mg.png"),
  r("02", "Bacteriostatic Water (BAC) 3ml", "99.84%", "A2926048", "09 / 22 / 2026", "coa-bacteriostatic-water-bac-3ml.png"),
  r("03", "BPC-157 5mg", "99.58%", "A2926024", "09 / 22 / 2026", "coa-bpc157-5mg.png"),
  r("04", "BPC-157/TB-500 10mg/10mg", "99.45%", "A2926067", "09 / 22 / 2026", "coa-bpc157-tb500-10mg-10mg.png"),
  r("05", "BPC-157/TB-500 5mg/5mg", "99.59%", "A2926014", "09 / 17 / 2026", "coa-bpc157-tb500-5mg-5mg.png"),
  r("06", "Cagrilintide 10mg", "99.86%", "A2926009", "09 / 22 / 2026", "coa-cagrilintide-10mg.png"),
  r("07", "CJC-1295/Ipamorelin 10mg/10mg", "99.81%", "A2926075", "09 / 22 / 2026", "coa-cjc1295-ipamorelin-10-10.png"),
  r("08", "CJC-1295/Ipamorelin 5mg/5mg", "99.84%", "A2926030", "09 / 22 / 2026", "coa-cjc1295-ipamorelin-5-5.png"),
  r("09", "DSIP 10mg", "99.31%", "A2926018", "09 / 22 / 2026", "coa-dsip-10mg.png"),
  r("10", "Epitalon 50mg", "99.62%", "A2926023", "09 / 22 / 2026", "coa-epitalon-50mg.png"),
  r("11", "GHK-Cu 100mg", "99.88%", "A2926076", "09 / 22 / 2026", "coa-ghk-cu-100mg.png"),
  r("12", "GHK-Cu 50mg", "99.62%", "A2926039", "09 / 22 / 2026", "coa-ghk-cu-50mg.png"),
  r("13", "GLOW 70mg", "99.85%", "A2926062", "09 / 22 / 2026", "coa-glow-70mg.png"),
  r("14", "GLP1-S 10mg", "99.73%", "A2926002", "09 / 22 / 2026", "coa-glp1-s-10mg.png"),
  r("15", "GLP1-S 5mg", "99.74%", "A2926001", "09 / 22 / 2026", "coa-glp1-s-5mg.png"),
  r("16", "GLP2-T 10mg", "99.96%", "A2926004", "09 / 17 / 2026", "coa-glp2-t-10mg.png"),
  r("17", "GLP2-T 30mg", "99.83%", "A2926006", "09 / 22 / 2026", "coa-glp2-t-30mg.png"),
  r("18", "GLP3-R 20mg", "99.89%", "A2926071", "09 / 22 / 2026", "coa-glp3-r-20mg.png"),
  r("19", "Ipamorelin 5mg", "99.94%", "A2926037", "09 / 22 / 2026", "coa-ipamorelin-5mg.png"),
  r("20", "Kisspeptin 10mg", "99.70%", "A2926072", "09 / 22 / 2026", "coa-kisspeptin-10mg.png"),
  r("21", "KPV 10mg", "99.68%", "A2926041", "09 / 22 / 2026", "coa-kpv-10mg.png"),
  r("22", "KPV/GHK-Cu/BPC-157/TB-500 10mg/50mg/10mg/10mg", "99.65%", "A2926013", "09 / 17 / 2026", "coa-kpv-ghk-cu-bpc157-tb500.png"),
  r("23", "Melanotan-II 10mg", "99.78%", "A2926011", "09 / 17 / 2026", "coa-melanotan-ii-10mg.png"),
  r("24", "MOTS-c 10mg", "99.43%", "A2926047", "09 / 22 / 2026", "coa-mots-c-10mg.png"),
  r("25", "MOTS-c 40mg", "99.45%", "A2926061", "09 / 22 / 2026", "coa-mots-c-40mg.png"),
  r("26", "NAD+ 1000mg", "99.98%", "A2926057", "09 / 22 / 2026", "coa-nad-1000mg.png"),
  r("27", "NAD+ 500mg", "99.97%", "A2926015", "09 / 22 / 2026", "coa-nad-500mg.png"),
  r("28", "Research Water 10ml", "99.82%", "A2926049", "09 / 22 / 2026", "coa-research-water-10ml.png"),
  r("29", "Research Water 30ml", "99.81%", "A2926077", "09 / 22 / 2026", "coa-research-water-30ml.png"),
  r("30", "Selank 10mg", "99.87%", "A2926020", "09 / 22 / 2026", "coa-selank-10mg.png"),
  r("31", "Selank 5mg", "99.85%", "A2926019", "09 / 22 / 2026", "coa-selank-5mg.png"),
  r("32", "Semax 10mg", "99.42%", "A2926027", "09 / 22 / 2026", "coa-semax-10mg.png"),
  r("33", "Semax 5mg", "99.46%", "A2926026", "09 / 22 / 2026", "coa-semax-5mg.png"),
  r("34", "Sermorelin 10mg", "99.18%", "A2926034", "09 / 22 / 2026", "coa-sermorelin-10mg.png"),
  r("35", "Sermorelin 5mg", "99.12%", "A2926033", "09 / 22 / 2026", "coa-sermorelin-5mg.png"),
  r("36", "Tesamorelin 5mg", "99.01%", "A2926035", "09 / 22 / 2026", "coa-tesamorelin-5mg.png"),
];

function ReportCard({ report }: { report: Report }) {
  const src = `/assets/coa-user/${report.file}`;
  return <a className="coa-photo-card" href={src} target="_blank" rel="noreferrer"><div className="coa-photo-image"><img src={src} alt={`${report.product} Certificate of Analysis — Freedom Diagnostics report, lot ${report.lot}, tested purity ${report.purity}`} loading="lazy" decoding="async" /></div><div className="coa-photo-meta"><span>FREEDOM / COA {report.ref} · {report.product}</span><ArrowUpRight size={15} /></div></a>;
}

export default function COA() {
  const copy = useSiteCopy();
  return <SiteLayout><main><PageHero index="03" kicker={copy.get("coa.hero.kicker", "COA REPORTS / QUALITY FILES")} title={<>{copy.get("coa.hero.title", "Quality is not a slogan.")}<br /><em>{copy.get("coa.hero.titleEm", "It is a document.")}</em></>} intro={copy.get("coa.hero.intro", "36 current Freedom Diagnostics certificates of analysis covering the 2026 batch set. Each file is the original laboratory document — open any card to inspect purity, lot number and report date.")} /><section className="section coa-page-section"><div className="container"><section className="coa-archive"><div className="coa-archive-head"><div><span className="archive-label">LABORATORY 01 / FREEDOM COA FORMAT</span><h2>Freedom Certificate of Analysis</h2></div><span className="archive-count">36 FILES</span></div><div className="coa-photo-grid">{reports.map((report) => <ReportCard key={report.ref} report={report} />)}</div></section><div className="feedback-end-note"><ClipboardCheck size={18} /><span>{copy.get("coa.endNote", "All current certificates are listed above. Ask our team for a specific product or lot document that is not shown here.")}</span></div></div></section></main></SiteLayout>;
}
