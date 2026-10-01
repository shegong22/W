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

type ReportGroup = { label: string; title: string; lead: string; reports: Report[] };

const r = (
  ref: string,
  product: string,
  purity: string,
  lot: string,
  reported: string,
  file: string,
): Report => ({ ref, product, purity, lot, reported, file });

const reportGroups: ReportGroup[] = [
  {
    label: "CATEGORY 01 / METABOLIC & WEIGHT MANAGEMENT",
    title: "Metabolic & weight management",
    lead: "Receptor-agonist and metabolic research models, including the highest tested purities in the current batch set.",
    reports: [
      r("01", "AOD-9604 5mg", "99.68%", "A2926040", "09 / 22 / 2026", "coa-aod9604-5mg.png"),
      r("02", "Cagrilintide 10mg", "99.86%", "A2926009", "09 / 22 / 2026", "coa-cagrilintide-10mg.png"),
      r("03", "GLP1-S 5mg", "99.74%", "A2926001", "09 / 22 / 2026", "coa-glp1-s-5mg.png"),
      r("04", "GLP1-S 10mg", "99.73%", "A2926002", "09 / 22 / 2026", "coa-glp1-s-10mg.png"),
      r("05", "GLP2-T 10mg", "99.96%", "A2926004", "09 / 17 / 2026", "coa-glp2-t-10mg.png"),
      r("06", "GLP2-T 30mg", "99.83%", "A2926006", "09 / 22 / 2026", "coa-glp2-t-30mg.png"),
      r("07", "GLP3-R 20mg", "99.89%", "A2926071", "09 / 22 / 2026", "coa-glp3-r-20mg.png"),
      r("08", "MOTS-c 10mg", "99.43%", "A2926047", "09 / 22 / 2026", "coa-mots-c-10mg.png"),
      r("09", "MOTS-c 40mg", "99.45%", "A2926061", "09 / 22 / 2026", "coa-mots-c-40mg.png"),
    ],
  },
  {
    label: "CATEGORY 02 / GROWTH HORMONE & SECRETAGOGUES",
    title: "Growth hormone & secretagogues",
    lead: "GHRH analogues, ghrelin-mimetic secretagogues and pituitary signalling models with confirmational mass data.",
    reports: [
      r("10", "CJC-1295/Ipamorelin 5mg/5mg", "99.84%", "A2926030", "09 / 22 / 2026", "coa-cjc1295-ipamorelin-5-5.png"),
      r("11", "CJC-1295/Ipamorelin 10mg/10mg", "99.81%", "A2926075", "09 / 22 / 2026", "coa-cjc1295-ipamorelin-10-10.png"),
      r("12", "Ipamorelin 5mg", "99.94%", "A2926037", "09 / 22 / 2026", "coa-ipamorelin-5mg.png"),
      r("13", "Sermorelin 5mg", "99.12%", "A2926033", "09 / 22 / 2026", "coa-sermorelin-5mg.png"),
      r("14", "Sermorelin 10mg", "99.18%", "A2926034", "09 / 22 / 2026", "coa-sermorelin-10mg.png"),
      r("15", "Tesamorelin 5mg", "99.01%", "A2926035", "09 / 22 / 2026", "coa-tesamorelin-5mg.png"),
      r("16", "Kisspeptin 10mg", "99.70%", "A2926072", "09 / 22 / 2026", "coa-kisspeptin-10mg.png"),
    ],
  },
  {
    label: "CATEGORY 03 / REPAIR, RECOVERY & LONGEVITY",
    title: "Repair, recovery & longevity",
    lead: "Structural repair peptides, copper peptides, cellular-energy and telomere research models, including the four-component 10mg/50mg/10mg/10mg blend.",
    reports: [
      r("17", "BPC-157 5mg", "99.58%", "A2926024", "09 / 22 / 2026", "coa-bpc157-5mg.png"),
      r("18", "BPC-157/TB-500 5mg/5mg", "99.59%", "A2926014", "09 / 17 / 2026", "coa-bpc157-tb500-5mg-5mg.png"),
      r("19", "BPC-157/TB-500 10mg/10mg", "99.45%", "A2926067", "09 / 22 / 2026", "coa-bpc157-tb500-10mg-10mg.png"),
      r("20", "GHK-Cu 50mg", "99.62%", "A2926039", "09 / 22 / 2026", "coa-ghk-cu-50mg.png"),
      r("21", "GHK-Cu 100mg", "99.88%", "A2926076", "09 / 22 / 2026", "coa-ghk-cu-100mg.png"),
      r("22", "KPV 10mg", "99.68%", "A2926041", "09 / 22 / 2026", "coa-kpv-10mg.png"),
      r("23", "KPV/GHK-Cu/BPC-157/TB-500 10mg/50mg/10mg/10mg", "99.65%", "A2926013", "09 / 17 / 2026", "coa-kpv-ghk-cu-bpc157-tb500.png"),
      r("24", "GLOW 70mg", "99.85%", "A2926062", "09 / 22 / 2026", "coa-glow-70mg.png"),
      r("25", "Epitalon 50mg", "99.62%", "A2926023", "09 / 22 / 2026", "coa-epitalon-50mg.png"),
      r("26", "NAD+ 500mg", "99.97%", "A2926015", "09 / 22 / 2026", "coa-nad-500mg.png"),
      r("27", "NAD+ 1000mg", "99.98%", "A2926057", "09 / 22 / 2026", "coa-nad-1000mg.png"),
    ],
  },
  {
    label: "CATEGORY 04 / NEURO, SLEEP & PIGMENTATION",
    title: "Neuro, sleep & pigmentation",
    lead: "Nootropic, anxiolytic, sleep-pathway and pigmentation research models regularly requested by overseas laboratories.",
    reports: [
      r("28", "DSIP 10mg", "99.31%", "A2926018", "09 / 22 / 2026", "coa-dsip-10mg.png"),
      r("29", "Semax 5mg", "99.46%", "A2926026", "09 / 22 / 2026", "coa-semax-5mg.png"),
      r("30", "Semax 10mg", "99.42%", "A2926027", "09 / 22 / 2026", "coa-semax-10mg.png"),
      r("31", "Selank 5mg", "99.85%", "A2926019", "09 / 22 / 2026", "coa-selank-5mg.png"),
      r("32", "Selank 10mg", "99.87%", "A2926020", "09 / 22 / 2026", "coa-selank-10mg.png"),
      r("33", "Melanotan-II 10mg", "99.78%", "A2926011", "09 / 17 / 2026", "coa-melanotan-ii-10mg.png"),
    ],
  },
  {
    label: "CATEGORY 05 / LABORATORY SOLVENTS & DILUENTS",
    title: "Laboratory solvents & diluents",
    lead: "Reconstitution and dilution media supplied with the same documentation standard as the peptide batch set.",
    reports: [
      r("34", "Bacteriostatic Water (BAC) 3ml", "99.84%", "A2926048", "09 / 22 / 2026", "coa-bacteriostatic-water-bac-3ml.png"),
      r("35", "Research Water 10ml", "99.82%", "A2926049", "09 / 22 / 2026", "coa-research-water-10ml.png"),
      r("36", "Research Water 30ml", "99.81%", "A2926077", "09 / 22 / 2026", "coa-research-water-30ml.png"),
    ],
  },
];

const allReports = reportGroups.flatMap((group) => group.reports);
const purityValues = allReports.map((report) => Number.parseFloat(report.purity));
const purityRange = `${Math.min(...purityValues).toFixed(2)}% – ${Math.max(...purityValues).toFixed(2)}%`;

function ReportCard({ report }: { report: Report }) {
  const src = `/assets/coa-user/${report.file}`;
  return <a className="coa-photo-card" href={src} target="_blank" rel="noreferrer"><div className="coa-photo-image"><img src={src} alt={`${report.product} Certificate of Analysis — Freedom Diagnostics report, lot ${report.lot}, tested purity ${report.purity}`} loading="lazy" decoding="async" /></div><div className="coa-photo-meta"><div className="coa-photo-copy"><span className="coa-photo-ref">COA {report.ref}<ArrowUpRight size={13} /></span><strong className="coa-photo-name">{report.product}</strong><span className="coa-photo-facts">LOT {report.lot} · REPORTED {report.reported}</span></div><div className="coa-purity-chip"><b>{report.purity}</b><i>Purity</i></div></div></a>;
}

function ReportGroupSection({ group }: { group: ReportGroup }) {
  return <section className="coa-archive coa-archive--category"><div className="coa-archive-head"><div><span className="archive-label">{group.label}</span><h2>{group.title}</h2><p className="coa-archive-lead">{group.lead}</p></div><span className="archive-count">{String(group.reports.length).padStart(2, "0")} FILES</span></div><div className="coa-photo-grid">{group.reports.map((report) => <ReportCard key={report.ref} report={report} />)}</div></section>;
}

export default function COA() {
  const copy = useSiteCopy();
  return <SiteLayout><main><PageHero index="03" kicker={copy.get("coa.hero.kicker", "COA REPORTS / QUALITY FILES")} title={<>{copy.get("coa.hero.title", "Quality is not a slogan.")}<br /><em>{copy.get("coa.hero.titleEm", "It is a document.")}</em></>} intro={copy.get("coa.hero.intro", "36 current Freedom Diagnostics certificates of analysis covering the 2026 batch set. Every record states the tested purity, lot number and report date — open any card to inspect the original laboratory document.")} /><section className="section coa-page-section"><div className="container"><div className="coa-archive-facts"><div><strong>{allReports.length}</strong><span>CERTIFICATES ON FILE</span></div><div><strong>{purityRange}</strong><span>TESTED PURITY RANGE</span></div><div><strong>SEP 17 – 22, 2026</strong><span>REPORTING WINDOW</span></div><div><strong>Freedom Diagnostics</strong><span>LABORATORY · UNITED STATES</span></div></div>{reportGroups.map((group) => <ReportGroupSection key={group.label} group={group} />)}<div className="feedback-end-note"><ClipboardCheck size={18} /><span>{copy.get("coa.endNote", "All current certificates are listed above. Ask our team for a specific product or lot document that is not shown here.")}</span></div></div></section></main></SiteLayout>;
}
