import { useState } from "react";
import "./ModalEx.css";
import { Modal } from "./Modal";

export function ModalEx() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  // 기본 모달
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 확인 모달
  const openConfirmModal = () => setIsConfirmModalOpen(true);
  const closeConfirmModal = () => setIsConfirmModalOpen(false);
  // 확인 버튼
  const handleConfirm = () => {
    alert("확인되었습니다.");
    closeConfirmModal();
  };

  // 폼 모달
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const openFormModal = () => setIsFormModalOpen(true);
  const closeFormModal = () => setIsFormModalOpen(false);
  // 폼 제출
  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`폼 제출 완료! \n이름 : ${formData.name} \n이메일 : ${formData.email} \n메세지 : ${formData.message}`);
    setFormData({ name: "", email: "", message: "" });
    closeFormModal();
  };
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    // e.target.name은 이벤트 발생한 요소의 name속성을 의미
    // e.target.value는 이벤트 발생한 요소의 값(value속성)을 의미
    setFormData((prev) => ({
      ...prev, // 이전 상태를 유지하면서 새로운 상태를 추가
      [name]: value, // 새로운 상태가 추가됨
    }));
  };

  return (
    <div className="modalEx">
      <h1>모달 컴포넌트 사용</h1>
      <div className="btnGroup">
        <button className="btn btnPrimary" onClick={openModal}>
          기본 모달 열기
        </button>
        <button className="btn btnWarning" onClick={openConfirmModal}>
          확인 모달 열기
        </button>
        <button className="btn btnSuccess" onClick={openFormModal}>
          폼 모달 열기
        </button>
      </div>
      {/* 기본 모달 */}
      <Modal
        isOpen={isModalOpen}
        title="기본 모달"
        onClose={closeModal}
        children={
          <>
            <div className="modalContentEx">
              <p>이것은 기본 모달입니다.</p>
              <p>모달 외부를 클릭하거나 X 버튼을 클릭하여 닫을 수 있습니다.</p>
              <div className="modalActions">
                <button className="btn btnSecondary" onClick={closeModal}>
                  닫기
                </button>
              </div>
            </div>
          </>
        }
      />
      {/* 확인 모달 */}
      <Modal
        isOpen={isConfirmModalOpen}
        title="확인 모달"
        onClose={closeConfirmModal}
        children={
          <>
            <div className="modalContentEx">
              <p>정말로 이 작업을 진행하시겠습니까?</p>
              <p>이 작업은 되돌릴 수 없습니다.</p>
              <div className="modalActions">
                <button className="btn btnDanger" onClick={handleConfirm}>
                  확인
                </button>
                <button className="btn btnSecondary" onClick={closeConfirmModal}>
                  취소
                </button>
              </div>
            </div>
          </>
        }
      />
      {/* 폼 모달 */}
      <Modal
        isOpen={isFormModalOpen}
        title="폼 모달"
        onClose={closeFormModal}
        children={
          <>
            <form onSubmit={handleFormSubmit} className="modalForm">
              <div className="formGroup">
                <label htmlFor="name">이름:</label>
                <input type="text" id="name" name="name" required value={formData.name} onChange={handleFormChange} />
              </div>
              <div className="formGroup">
                <label htmlFor="email">이메일:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleFormChange}
                />
              </div>
              <div className="formGroup">
                <label htmlFor="message">메시지:</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleFormChange}
                />
              </div>
              <div className="modalActions">
                <button type="submit" className="btn btnSuccess">
                  제출
                </button>
                <button type="button" className="btn btnSecondary" onClick={closeFormModal}>
                  취소
                </button>
              </div>
            </form>
          </>
        }
      />
    </div>
  );
}
