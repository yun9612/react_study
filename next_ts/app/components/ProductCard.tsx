import Image from "next/image";
import { Product } from "../types/products";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    // 제품상세페이지로 연결
    <Link href={`/product/${product.id}`}>
      <div>
        <h3>상품 이름 : {product.name}</h3>
        <p>가격 : {product.price.toLocaleString()}원</p>
        <Image width={300} height={300} src={product.image} alt={product.name} />
        <p>{product.description}</p>
      </div>
    </Link>
  );
}
