import { useState } from "react";

function App() {
  // useState(초기값)
  const [emoji, setEmoji] = useState("😊");
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  // 1회성 상태 변경
  function changeEmoji() {
    setEmoji("😡");
  }
  // 토글 상태 변경(삼항연산자로 설정하면 간단)
  function toggleEmoji() {
    setEmoji(emoji === "😊" ? "😡" : "😊");
  }

  // 숫자 변경
  function increase() {
    setCount(count + 1);
  }
  function decrease() {
    setCount(count - 1);
  }

  // 이름 입력값 출력
  function handleChange(e) {
    setName(e.target.value);
  }

  // html
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Choi</h1>
      <p>지금 기분 : {emoji}</p>
      <button onClick={changeEmoji}>기분 변경</button>
      <button onClick={toggleEmoji}>기분 변경(토글)</button>
      <hr />
      <p>지금 숫자 : {count}</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <button onClick={increase} style={{ padding: "5px 10px" }}>
          +
        </button>
        <button onClick={decrease} style={{ padding: "5px 10px" }}>
          -
        </button>
      </div>
      <hr />
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Enter your name</h1>
        <input type="text" placeholder="Enter your name..." onChange={handleChange} value={name} />
        <p>
          My name is <strong>{name || "..."}</strong>
        </p>
      </div>
    </div>
  );
}

export default App;
