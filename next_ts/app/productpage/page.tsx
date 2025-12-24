import ProductCard from "../components/ProductCard";
import { products } from "../data/product";

export default function ProductPage() {
  return (
    <div className="py-10">
      <h1>상품페이지</h1>
      <div className="flex gap-3">
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}
