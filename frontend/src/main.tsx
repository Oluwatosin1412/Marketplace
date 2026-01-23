import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MarketplaceProvider } from "@/contexts/MarketplaceContext";

createRoot(document.getElementById("root")!).render(
  <MarketplaceProvider>
    <App />
  </MarketplaceProvider>
);
