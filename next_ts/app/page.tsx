"use client";
// 인터렉션적인 기능을 쓸 때는 위에 꼭 넣어줘야함(상태가 변경되는 경우)

import Button from "./components/Button";

// 화면에 보여지는 파일
export default function Home() {
  return (
    <div className="flex flex-col py-20 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>홈페이지</h1>
      <div className="flex gap-3">
        <Button text="확인" onClick={() => alert("확인되었습니다.")} />
        <Button text="취소" variant="danger" onClick={() => alert("취소되었습니다.")} />
        <Button text="비활성" disabled />
      </div>
    </div>
  );
}
