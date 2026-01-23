import { useMarketplace } from "@/context/MarketplaceContext";
import ProductCard from "@/components/dashboard/ProductCard";

const Products = () => {
  const {
    products,
    loading,
    wishlist,
    toggleWishlist,
  } = useMarketplace();

  if (loading) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

  if (!products.length) {
    return <p className="text-center mt-10">No products yet</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            isInWishlist={wishlist.includes(product._id)}
            onToggleWishlist={toggleWishlist}
            onSendMessage={(sellerName) =>
              console.log("Message seller:", sellerName)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
