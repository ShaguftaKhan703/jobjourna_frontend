import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { LayoutWrapper } from "@/components/LayoutWrapper";
import { Dashboard } from "./pages/Dashboard";
import { AIAssistant } from "./pages/AIAssistant";
import { MyDocuments } from "./pages/MyDocuments";
import { AICoverLetter } from "./pages/AICoverLetter";
import { ContactUs } from "./pages/ContactUs";
import { Extensions } from "./pages/Extensions";
import { Profile } from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <LayoutWrapper>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/ai-assistant" element={<AIAssistant />} />
                <Route path="/my-documents" element={<MyDocuments />} />
                <Route path="/ai-cover-letter" element={<AICoverLetter />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/extensions" element={<Extensions />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </LayoutWrapper>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
