import { products } from "@/app/data/product";
import { Product } from "@/app/types/products";
import Image from "next/image";

export default async function ProdustDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((item: Product) => item.id === Number(id));
  if (!product) return <div>상품이 없습니다.</div>;

  // html
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-4xl font-bold">{product.name}</h1>
      <p className="text-2xl">가격 : {product.price.toLocaleString()}원</p>
      <Image width={300} height={300} src={product.image} alt={product.name} />
      <p className="text-2xl">{product.description}</p>
    </div>
  );
}
