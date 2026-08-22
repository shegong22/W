import { ArrowUpRight, ClipboardCheck } from "lucide-react";
import SiteLayout, { PageHero } from "@/components/SiteLayout";
import { useSiteCopy } from "@/hooks/useSiteCopy";

type Report = readonly [string, string];

const freedomReports: Report[] = [
  ["/assets/coa-user/16360a57a635f4906d46986967c2d0d1.webp", "FREEDOM / COA 01"],
  ["/assets/coa-user/39536e43156b5d049fb900838633ef25.webp", "FREEDOM / COA 02"],
  ["/assets/coa-user/56bea56a1ac3ee4b0a12d016a0b0357a.webp", "FREEDOM / COA 03"],
  ["/assets/coa-user/5ddcff606d095a38aef6e8d8478f855b.webp", "FREEDOM / COA 04"],
  ["/assets/coa-user/89cbe404f3de962a6341b3a3d48506fa.webp", "FREEDOM / COA 05"],
  ["/assets/coa-user/8aa54eee7180fbe785b89143d7eba545.webp", "FREEDOM / COA 06"],
  ["/assets/coa-user/915947d0e54e0134b0e2e156d8e90865.webp", "FREEDOM / COA 07"],
  ["/assets/coa-user/afcb97e2fdb268398fd02f4d8f233a2b.webp", "FREEDOM / COA 08"],
  ["/assets/coa-user/eb9cb814e012af915a8e9166f2a7d66a.webp", "FREEDOM / COA 09"],
  ["/assets/coa-user/ec745fcc7301ca5251b90aa45b325b33.webp", "FREEDOM / COA 10"],
  ["/assets/coa-user/f082c01fb820ba9f9855f8ec101f9e78.webp", "FREEDOM / COA 11"],
  ["/assets/coa-user/fbd46801a11205b7d1b5c00deff5fe6e.webp", "FREEDOM / COA 12"],
];

const janoshikReports: Report[] = [
  ["/assets/coa-user/1210ffceff35db4c523e68ba0edd915f.webp", "JANOSHIK / TEST 01"],
  ["/assets/coa-user/3a8127c53645476a3396e0f10b14fdbf.webp", "JANOSHIK / TEST 02"],
  ["/assets/coa-user/838ad86253732949c5148f57d591ec8b.webp", "JANOSHIK / TEST 03"],
  ["/assets/coa-user/a8616f3277c0eb52ed00db0df5993e61.webp", "JANOSHIK / TEST 04"],
  ["/assets/coa-user/b835c5c7c3281976fd1115870a976536.webp", "JANOSHIK / TEST 05"],
  ["/assets/coa-user/d99fb62e56c8c3a553b172191aa17309.webp", "JANOSHIK / TEST 06"],
];

function ReportGroup({ title, label, reports }: { title: string; label: string; reports: Report[] }) {
  return <section className="coa-archive"><div className="coa-archive-head"><div><span className="archive-label">{label}</span><h2>{title}</h2></div><span className="archive-count">{String(reports.length).padStart(2, "0")} FILES</span></div><div className="coa-photo-grid">{reports.map(([src, record], index) => <a className="coa-photo-card" href={src} target="_blank" rel="noreferrer" key={src}><div className="coa-photo-image"><img src={src} alt={`${record} original laboratory report`} loading="eager" /></div><div className="coa-photo-meta"><span>{record}</span><ArrowUpRight size={15} /></div></a>)}</div></section>;
}

export default function COA() {
  const copy = useSiteCopy();
  return <SiteLayout><main><PageHero index="03" total="18" kicker={copy.get("coa.hero.kicker", "COA REPORTS / QUALITY FILES")} title={<>{copy.get("coa.hero.title", "Quality is not a slogan.")}<br /><em>{copy.get("coa.hero.titleEm", "It is a document.")}</em></>} intro={copy.get("coa.hero.intro", "A complete visual archive of Tide batch documentation, separated by laboratory and report format. Every report keeps its original proportions; click any record to inspect the full document.")} /><section className="section coa-page-section"><div className="container"><ReportGroup title="Freedom Certificate of Analysis" label="LABORATORY 01 / FREEDOM COA FORMAT" reports={freedomReports} /><ReportGroup title="Janoshik Test Reports" label="LABORATORY 02 / JANOSHIK TEST FORMAT" reports={janoshikReports} /><div className="feedback-end-note"><ClipboardCheck size={18} /><span>{copy.get("coa.endNote", "All uploaded reports are shown above, separated by laboratory format.")}</span></div></div></section></main></SiteLayout>;
}
