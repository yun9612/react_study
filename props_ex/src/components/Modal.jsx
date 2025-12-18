import { useEffect } from "react";
import "./Modal.css";

export function Modal({ isOpen, title, onClose, children }) {
  // 실행하는 함수
  useEffect(() => {
    if (isOpen) {
      // 현재 스크롤 위치 저장
      const scrollY = window.scrollY;
      // body에 스크롤 방지 스타일 적용
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      // 컴포넌트가 언마운트될 때 스타일 복원
      return () => {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        // 스크롤 위치 복원
        window.scrollTo(0, scrollY);
      };
    }
    // 의존(기능이 작동하지 않았을 경우)
  }, [isOpen]);

  // 모달이 열리지 않을 경우
  if (!isOpen) return null;

  const handleBgClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 화면 출력
  return (
    <div className="modalBackdrop" onClick={handleBgClose}>
      <div className="modalContent">
        <div className="modalHeader">
          <h2 className="modalTitle">{title}</h2>
          <button className="modalCloseBtn" onClick={onClose}>
            X
          </button>
        </div>
        <div className="modalBody">{children}</div>
      </div>
    </div>
  );
}
