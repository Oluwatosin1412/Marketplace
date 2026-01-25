import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import AuthLogin from "./pages/AuthLogin";
import AuthRegister from "./pages/AuthRegister";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import CreateProduct from "./pages/products/CreateProduct";
import CreateService from "./pages/services/CreateService";
//import ProductDetail from "./pages/products/ProductDetail";
import ServiceDetail from "./pages/services/ServiceDetail";
import Settings from "./pages/Settings";
import SellerProfile from "./pages/SellerProfile";
import Categories from "./pages/Categories";
import Chat from "./pages/Chat";
import CommunityChat from "./pages/CommunityChat";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
import EditService from "./pages/services/EditServices";
import Services from "./pages/services/Services";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="futo-marketplace-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth/login" element={<AuthLogin />} />
            <Route path="/auth/register" element={<AuthRegister />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create/product" element={<CreateProduct />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/edit/:id" element={<EditService />} />
            <Route path="/create/service" element={<CreateService />} />
            {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
            <Route path="/service/:id" element={<ServiceDetail />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/seller/:sellerId" element={<SellerProfile />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/:conversationId" element={<Chat />} />
            <Route path="/community-chat" element={<CommunityChat />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/auth/reset-password/:token" element={<ResetPassword />}/>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;