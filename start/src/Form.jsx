import { useState } from "react";

function Form() {
  // default
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");

  // submit
  function handleSubmit(e) {
    e.preventDefault();
    setResult(`Name : ${name}, Email : ${email}`);
    // 입력창 초기화
    setName("");
    setEmail("");
  }

  // html
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="enter name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <p>{result}</p>
    </div>
  );
}

export default Form;
