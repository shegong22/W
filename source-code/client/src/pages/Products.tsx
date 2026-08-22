import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import SiteLayout from "@/components/SiteLayout";

type ProductPhoto = {
  image: string;
  name: string;
  sku: string;
  label: string;
};

const productPhotos: ProductPhoto[] = [
  { image: "ss31-2s10.png", name: "SS-31", sku: "2S10", label: "SS-31 / 2S10" },
  { image: "tirzepatide-tr30.png", name: "Tirzepatide", sku: "TR30", label: "Tirzepatide / TR30" },
  { image: "ll37-375.png", name: "LL37", sku: "375", label: "LL37 / 375" },
  { image: "semax-xa10.png", name: "Semax", sku: "XA10", label: "Semax / XA10" },
  { image: "tirzepatide-tr10-yellow.png", name: "Tirzepatide", sku: "TR10", label: "Tirzepatide / TR10" },
  { image: "retatrutide-rt20.png", name: "Retatrutide", sku: "RT20", label: "Retatrutide / RT20" },
  { image: "retatrutide-rt60.png", name: "Retatrutide", sku: "RT60", label: "Retatrutide / RT60" },
  { image: "ahk-cu-au100.png", name: "AHK-CU", sku: "AU100", label: "AHK-CU / AU100" },
  { image: "pt-141-pt10.png", name: "PT-141", sku: "PT10", label: "PT-141 / PT10" },
  { image: "ghk-cu-cu100-a.png", name: "GHK-CU", sku: "CU100", label: "GHK-CU / CU100" },
  { image: "retatrutide-rt40.png", name: "Retatrutide", sku: "RT40", label: "Retatrutide / RT40" },
  { image: "tirzepatide-tr10-green.png", name: "Tirzepatide", sku: "TR10", label: "Tirzepatide / TR10" },

  { image: "mots-c-ms40.png", name: "MOTS-C", sku: "MS40", label: "MOTS-C / MS40" },
  { image: "nad-plus-nad500.png", name: "NAD+", sku: "NJ500", label: "NAD+ / NAD500" },
  { image: "retatrutide-rt10-blue.png", name: "Retatrutide", sku: "RT10", label: "Retatrutide / RT10" },
  { image: "semaglutide-sm10.png", name: "Semaglutide", sku: "SM10", label: "Semaglutide / SM10" },
  { image: "nad-plus-nad1000.png", name: "NAD+", sku: "NJ1000", label: "NAD+ / NAD1000" },
  { image: "thymosin-alpha-1-ta10-a.png", name: "Thymosin Alpha-1", sku: "TA10", label: "Thymosin Alpha-1 / TA10" },
  { image: "semax-xa10-white.png", name: "Semax", sku: "XA10", label: "Semax / XA10" },
  { image: "thymosin-alpha-1-ta10-b.png", name: "Thymosin Alpha-1", sku: "TA10", label: "Thymosin Alpha-1 / TA10" },
  { image: "retatrutide-rt10-blue-2.png", name: "Retatrutide", sku: "RT10", label: "Retatrutide / RT10" },
  { image: "retatrutide-rt40-white.png", name: "Retatrutide", sku: "RT40", label: "Retatrutide / RT40" },
  { image: "retatrutide-rt10-orange.png", name: "Retatrutide", sku: "RT10", label: "Retatrutide / RT10" },
  { image: "tb500-tb5.png", name: "TB500 (Thymosin B4 Acetate)", sku: "TB5", label: "TB500 / TB5" },
  { image: "5amino-mq-50am.png", name: "5Amino/MQ", sku: "50AM", label: "5Amino/MQ / 50AM" },
  { image: "tesamorelin-tsm10.png", name: "Tesamorelin", sku: "TSM10", label: "Tesamorelin / TSM10" },
  { image: "tirzepatide-tr30-blue.png", name: "Tirzepatide", sku: "TR30", label: "Tirzepatide / TR30" },
  { image: "retatrutide-rt30.png", name: "Retatrutide", sku: "RT30", label: "Retatrutide / RT30" },
];

export default function Products() {
  return (
    <SiteLayout>
      <main>
        <section className="page-hero products-hero">
          <div className="container page-hero-inner">
            <div className="page-hero-copy">
              <span className="archive-label">PRODUCT ARCHIVE / PRODUCT ARCHIVE</span>
              <h1>Product photos,<br /><em>matched to the catalog.</em></h1>
              <p>Browse the photographed batches and identify each product by the formal name and SKU code used in the price list. Prices are intentionally not displayed.</p>
            </div>
            <div className="products-hero-note"><span>30</span><strong>catalogued<br />photos</strong><small>NAME + SKU MATCHING</small></div>
          </div>
        </section>
        <section className="section products-gallery-section">
          <div className="container">
            <div className="products-gallery-head"><div><span className="archive-label">VISUAL CATALOG / 01</span><h2>Every image,<br /><em>one clear identification.</em></h2></div><p>Product names follow the supplied price table. The visual label below each image identifies the corresponding catalog entry without publishing quotation information.</p></div>
            <div className="products-gallery-grid">
              {productPhotos.map((product, index) => (
                <figure className="product-photo-card" key={`${product.image}-${index}`}>
                  <div className="product-photo-frame"><img src={`/W/W/assets/products/${product.image}`} alt={`${product.name} ${product.sku} product batch`} loading={index > 5 ? "lazy" : "eager"} /></div>
                  <figcaption><span>{String(index + 1).padStart(2, "0")} / {product.sku}</span><strong>{product.name}</strong><small>{product.label}</small></figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
        <section className="section products-cta-section"><div className="container products-cta"><div><span className="archive-label">PRODUCT CONFIRMATION</span><h2>Have a model in mind?<br /><em>Send the exact SKU.</em></h2></div><div><p>For a quotation or documentation request, send the product name, SKU, specification, and quantity through WhatsApp. Our team will confirm the matching catalog entry.</p><Link className="button button-dark" href="/contact#partnership-form">Confirm a Product <ArrowUpRight size={16} /></Link><Link className="button button-primary" href="/coa">Review COA Reports <ArrowUpRight size={16} /></Link></div></div></section>
      </main>
    </SiteLayout>
  );
}
