import { useEffect, useState } from "react";
import api from "@/lib/axios";
import ProductCard from "@/components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Products error:", err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product: any) => (
        <ProductCard
          key={product._id}
          product={product}
          isInWishlist={false}
          onToggleWishlist={() => {}}
          onSendMessage={() => {}}
        />
      ))}
    </div>
  );
};

export default Products;
