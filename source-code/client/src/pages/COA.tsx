import { ArrowUpRight, ClipboardCheck } from "lucide-react";
import SiteLayout, { PageHero } from "@/components/SiteLayout";
import { useSiteCopy } from "@/hooks/useSiteCopy";

type Report = readonly [string, string];

const freedomReports: Report[] = [
  ["/assets/IMG_0528_1649ec7f.PNG", "FREEDOM / COA 01"],
  ["/assets/IMG_0529_d7f6949d.PNG", "FREEDOM / COA 02"],
  ["/assets/IMG_0530_32a09a7f.PNG", "FREEDOM / COA 03"],
  ["/assets/IMG_0533_01e0fac5.PNG", "FREEDOM / COA 04"],
  ["/assets/IMG_0534_84dc1bf8.PNG", "FREEDOM / COA 05"],
  ["/assets/IMG_0535_bca42668.PNG", "FREEDOM / COA 06"],
  ["/assets/IMG_0537_83476208.PNG", "FREEDOM / COA 07"],
  ["/assets/IMG_0538_22b2602c.PNG", "FREEDOM / COA 08"],
  ["/assets/IMG_0542_4eab78fa.PNG", "FREEDOM / COA 09"],
  ["/assets/IMG_0543_0f0aed3a.PNG", "FREEDOM / COA 10"],
  ["/assets/IMG_0544_f523a5cd.PNG", "FREEDOM / COA 11"],
  ["/assets/IMG_0545_b1d94de8.PNG", "FREEDOM / COA 12"],
];

const janoshikReports: Report[] = [
  ["/assets/IMG_0531_c8444ca8.PNG", "JANOSHIK / TEST 01"],
  ["/assets/IMG_0536_ad49c087.PNG", "JANOSHIK / TEST 02"],
  ["/assets/IMG_0539_7a11648b.PNG", "JANOSHIK / TEST 03"],
  ["/assets/IMG_0540_c427b23f.PNG", "JANOSHIK / TEST 04"],
  ["/assets/IMG_0541_53cdc967.PNG", "JANOSHIK / TEST 05"],
  ["/assets/IMG_0547_528135c6.PNG", "JANOSHIK / TEST 06"],
];

function ReportGroup({ title, label, reports }: { title: string; label: string; reports: Report[] }) {
  return <section className="coa-archive"><div className="coa-archive-head"><div><span className="archive-label">{label}</span><h2>{title}</h2></div><span className="archive-count">{String(reports.length).padStart(2, "0")} FILES</span></div><div className="coa-photo-grid">{reports.map(([src, record], index) => <a className="coa-photo-card" href={src} target="_blank" rel="noreferrer" key={src}><div className="coa-photo-image"><img src={src} alt={`${record} original laboratory report`} loading="eager" /></div><div className="coa-photo-meta"><span>{record}</span><ArrowUpRight size={15} /></div></a>)}</div></section>;
}

export default function COA() {
  const copy = useSiteCopy();
  return <SiteLayout><main><PageHero index="03" total="18" kicker={copy.get("coa.hero.kicker", "COA REPORTS / QUALITY FILES")} title={<>{copy.get("coa.hero.title", "Quality is not a slogan.")}<br /><em>{copy.get("coa.hero.titleEm", "It is a document.")}</em></>} intro={copy.get("coa.hero.intro", "A complete visual archive of Tide batch documentation, separated by laboratory and report format. Every report keeps its original proportions; click any record to inspect the full document.")} /><section className="section coa-page-section"><div className="container"><div className="coa-intro-note"><ClipboardCheck /><span>{copy.get("coa.intro.note", "18 original reports are separated below by laboratory format for faster review and clearer quality documentation.")}</span><a href="/assets/peptide-price_28c35eda.pdf" target="_blank" rel="noreferrer">{copy.get("coa.intro.download", "Download Product List")} <ArrowUpRight size={15} /></a></div><div className="coa-toolbar"><span>{copy.get("coa.toolbar.count", "18 REPORTS / 02 LABORATORY FORMATS")}</span><span className="coa-sort-note">{copy.get("coa.toolbar.sort", "EACH GROUP SORTED BY ORIGINAL FILE SEQUENCE")}</span></div><ReportGroup title={copy.get("coa.group.freedomTitle", "Freedom Certificate of Analysis")} label={copy.get("coa.group.freedomLabel", "LABORATORY 01 / FREEDOM COA FORMAT")} reports={freedomReports} /><ReportGroup title={copy.get("coa.group.janoshikTitle", "Janoshik Test Reports")} label={copy.get("coa.group.janoshikLabel", "LABORATORY 02 / JANOSHIK TEST FORMAT")} reports={janoshikReports} /><div className="feedback-end-note"><ClipboardCheck size={18} /><span>{copy.get("coa.endNote", "All uploaded reports are shown above, separated by laboratory format.")}</span></div></div></section></main></SiteLayout>;
}
