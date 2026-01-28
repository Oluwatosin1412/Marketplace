import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/axios";

interface Product {
  _id: string;
  type: "product";
  title: string;
  price: number;
  category: string;
  condition: string;
  location: string;
  images: string[];
  postedBy?: {
    _id: string;
    fullName: string;
  };
  createdAt: string;
}


interface Service {
  _id: string;
  type: "service";
  title: string;
  description: string;
  price: number;
  priceUnit: "hour" | "job";
  category: string;
  location: string;
  images: string[];
  postedBy?: {
    _id: string;
    fullName: string;
  };
  createdAt: string;
}

interface MarketplaceContextType {
  products: Product[];
  services: Service[];
  loading: boolean;
  refreshAll: () => Promise<void>;
  addProduct: (product: Product) => void;
  addService: (service: Service) => void;
}

const MarketplaceContext = createContext<MarketplaceContextType | null>(null);

export const MarketplaceProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshAll = async () => {
    setLoading(true);
    try {
      const [productsRes, servicesRes] = await Promise.all([
        api.get("/products"),
        api.get("/services"),
      ]);

      setProducts(productsRes.data);
      setServices(servicesRes.data);
    } catch (err) {
      console.error("Marketplace fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAll(); // 🔁 revalidate on refresh
  }, []);

  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
  };

  const addService = (service: Service) => {
    setServices((prev) => [service, ...prev]);
  };

  return (
    <MarketplaceContext.Provider
      value={{
        products,
        services,
        loading,
        refreshAll,
        addProduct,
        addService,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const ctx = useContext(MarketplaceContext);
  if (!ctx) throw new Error("useMarketplace must be used inside MarketplaceProvider");
  return ctx;
};


















//src/contexts/MarketplaceContext.tsx
// import { createContext, useContext, useEffect, useState } from "react";
// import api from "@/lib/axios";

// interface MarketplaceContextType {
//   products: any[];
//   services: any[];
//   loading: boolean;
//   fetchProducts: () => Promise<void>;
//   fetchServices: () => Promise<void>;
// }

// const MarketplaceContext = createContext<MarketplaceContextType | null>(null);

// export const MarketplaceProvider = ({ children }: { children: React.ReactNode }) => {
//   const [products, setProducts] = useState<any[]>([]);
//   const [services, setServices] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchProducts = async () => {
//     const res = await api.get("/products");
//     setProducts(res.data);
//   };

//   const fetchServices = async () => {
//     const res = await api.get("/services");
//     setServices(res.data);
//   };

//   useEffect(() => {
//     const init = async () => {
//       try {
//         await Promise.all([fetchProducts(), fetchServices()]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     init();
//   }, []);

//   useEffect(() => {
//   console.group("🟣 MarketplaceContext Debug");
//   console.log("products:", products, Array.isArray(products));
//   console.log("services:", services, Array.isArray(services));
//   // console.log("wishlist:", wishlist, Array.isArray(wishlist));
//   console.groupEnd();
// }, [products, services]);


//   return (
//     <MarketplaceContext.Provider
//       value={{ products, services, loading, fetchProducts, fetchServices }}
//     >
//       {children}
//     </MarketplaceContext.Provider>
//   );
// };

// export const useMarketplace = () => {
//   const ctx = useContext(MarketplaceContext);
//   if (!ctx) throw new Error("useMarketplace must be used inside MarketplaceProvider");
//   return ctx;
// };