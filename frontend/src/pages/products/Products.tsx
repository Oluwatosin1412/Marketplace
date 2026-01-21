import { useEffect, useState } from "react";
import api from "@/lib/axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {products.map(product => (
        <div key={product._id}>
          <h3>{product.title}</h3>
          <p>₦{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
