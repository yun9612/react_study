import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PropsEx, ConditionalProps, DefaultProps, ComplexProps } from "./PropsEx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
    <div style={{ display: "flex", gap: "10px" }}>
      <PropsEx />
      <DefaultProps />
      <ConditionalProps />
    </div>
    <div style={{ display: "flex", gap: "10px" }}>
      <ComplexProps />
    </div>
  </>
);
