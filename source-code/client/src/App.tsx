// Design philosophy: Contemporary Scientific Editorial — every primary navigation item resolves to its own page chapter.
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Router, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import About from "./pages/About";
import { Manufacturing, Technology, Portfolio, Quality, Partners, ContactSpec } from "./pages/SpecPage";
import Laboratory from "./pages/Laboratory";
import Services from "./pages/Services";
import Order from "./pages/Order";
import Products from "./pages/Products";
import COA from "./pages/COA";
import Feedback from "./pages/Feedback";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import InquiryAdmin from "./pages/InquiryAdmin";
import MediaAdmin from "./pages/MediaAdmin";
import CopyAdmin from "./pages/CopyAdmin";

function PartnersFeedback() { return <Feedback />; }
function FeedbackRoute() { return <Feedback />; }

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Router base="/"><Switch><Route path="/" component={About} /><Route path="/laboratory" component={Manufacturing} /><Route path="/technology" component={Technology} /><Route path="/services" component={Quality} /><Route path="/partners" component={PartnersFeedback} />
      <Route path="/order" component={Order} /><Route path="/products" component={Products} /><Route path="/portfolio" component={Portfolio} /><Route path="/coa" component={COA} /><Route path="/feedback" component={FeedbackRoute} /><Route path="/contact" component={Contact} /><Route path="/admin/inquiries" component={InquiryAdmin} /><Route path="/admin/media" component={MediaAdmin} /><Route path="/admin/copy" component={CopyAdmin} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch></Router></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
