import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PropsEx, ConditionalProps, DefaultProps, ComplexProps } from "./PropsEx";
import { Card } from "./Card";
import { ModalEx } from "./components/ModalEx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
    {/* 하나의 컴포넌트 안에 여러개의 자식 생성, 그 안에서 주고 받기 */}
    <div style={{ display: "flex", gap: "10px" }}>
      <PropsEx />
      <DefaultProps />
      <ConditionalProps />
      <ComplexProps />
      {/* 하나의 컴포넌트*/}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <Card
          style={{ border: "2px solid orange", padding: "10px", borderRadius: "10px" }}
          title="고양이 카드"
          imgUrl="https://picsum.photos/200"
          tags={["귀여움", "동물", "인기"]}
          highlight={true}
        />
        <Card
          style={{ border: "2px solid orange", padding: "10px", borderRadius: "10px" }}
          title="강아지 카드"
          imgUrl="https://picsum.photos/200"
          tags={["귀여움", "동물", "인기"]}
          highlight={true}
        />
      </div>
    </div>
    <hr />
    <div>
      <ModalEx />
    </div>
  </>
);
