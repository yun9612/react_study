import { Product } from "../types/products";

// :타입스크립트 정의한 것을 가져다 씀
export const products: Product[] = [
  {
    id: 1,
    name: "후드",
    price: 10000,
    image: "/image1.jpg",
    description: "베이지색 후드티",
  },
  {
    id: 2,
    name: "운동화",
    price: 10000,
    image: "/image2.jpg",
    description: "꼼데캔버스",
  },
];
