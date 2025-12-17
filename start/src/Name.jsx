import { useState } from "react";

function Name() {
  // 기본값
  const [inputName, setInputName] = useState("");
  const [saveName, setSaveName] = useState("");

  // 이름 저장하기
  function handleChange(e) {
    setInputName(e.target.value); // 입력값 저장
  }
  function handleSave() {
    setSaveName(inputName);
  }

  // html
  return (
    <div className="content">
      <h1>이름 저장하기</h1>
      <input type="text" placeholder="enter your name" onChange={handleChange} value={inputName} />
      <button onClick={handleSave}>Save</button>
      <p>{saveName && `Hello, ${saveName}`}</p>
    </div>
  );
}

export default Name;
