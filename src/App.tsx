
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import BusinessForm from "./pages/BusinessForm";
import AdSelection from "./pages/AdSelection";
import CampaignKit from "./pages/CampaignKit";
import NotFound from "./pages/NotFound";
import { CampaignProvider } from "./context/CampaignContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CampaignProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/create" element={<BusinessForm />} />
            <Route path="/select" element={<AdSelection />} />
            <Route path="/kit" element={<CampaignKit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CampaignProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
