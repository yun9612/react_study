import { useState } from "react";

function Check() {
  // defalut
  const [agree, setAgree] = useState(false);

  // 체크하면 상태 변경
  function handleCheckbox(e) {
    setAgree(e.target.checked);
  }

  // html
  return (
    <div className="content">
      <h1>회원가입</h1>
      <label>
        <input type="checkbox" checked={agree} onChange={handleCheckbox} />
        약관에 동의합니다.
      </label>
      <p>{agree ? "동의 완료" : "아직 동의하지 않았습니다."}</p>
    </div>
  );
}

export default Check;
