import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MarketplaceProvider } from "@/context/MarketplaceContext";

createRoot(document.getElementById("root")!).render(
  <MarketplaceProvider>
    <App />
  </MarketplaceProvider>
);
