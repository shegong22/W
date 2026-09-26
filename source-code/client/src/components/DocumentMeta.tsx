import { useEffect } from "react";
import { useLocation } from "wouter";
import pageMeta from "@shared/pageMeta.json";

type PageMeta = { path: string; title: string; description: string };

const pages = pageMeta.pages as PageMeta[];
const siteUrl = pageMeta.siteUrl as string;

const notFound: PageMeta = {
  path: "/404",
  title: "Page not found | TIDE Peptide Laboratory",
  description: "The page you requested could not be found. Browse Tide's peptide products, COA reports, manufacturing capability or contact the team.",
};

function resolvePage(pathname: string): PageMeta {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return pages.find((page) => page.path === clean) ?? notFound;
}

// Keeps the browser tab title, description and canonical URL in sync with the
// current route so client-side navigation matches the static HTML per page.
export default function DocumentMeta() {
  const [location] = useLocation();

  useEffect(() => {
    if (location.startsWith("/admin")) return;

    const page = resolvePage(location);
    document.title = page.title;

    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", page.description);

    const canonicalUrl = page.path === "/" ? `${siteUrl}/` : `${siteUrl}${page.path}/`;
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", canonicalUrl);
    } else {
      const link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      link.setAttribute("href", canonicalUrl);
      document.head.appendChild(link);
    }
  }, [location]);

  return null;
}
