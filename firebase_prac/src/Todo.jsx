import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db, googleProvider } from "./firebase";
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, Timestamp, updateDoc, where } from "firebase/firestore";

export function Todo() {
  // default
  const [user, setUser] = useState(null);
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // 페이지 열 때 로그인 되어 있는지 감시하기
  useEffect(() => {
    const unscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unscribeAuth();
  }, []);

  // 로그인한 사람의 할 일 목록 데이터베이스에서 가져오기
  useEffect(() => {
    // 만약에 로그인하지 않았다면
    if (!user) {
      setTaskList([]);
      return;
    }
    const q = query(collection(db, "todos"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().createdAt?.toDate().toLocaleString() || "",
        createdAtTimestamp: doc.data().createdAt,
      }));
      tasks.sort((a, b) => {
        if (!a.createdAtTimestamp || !b.createdAtTimestamp) return 0;
        return b.createdAtTimestamp.toMillis() - a.createdAtTimestamp.toMillis();
      });
      setTaskList(tasks);
    });
    return () => unsubscribe();
  }, [user]);

  // google 클릭 시
  function handleLogin() {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        alert("로그인 실패: " + error.message + "\n\nFirebase 설정 정보를 확인해주세요!");
      });
  }

  // 로그인 화면
  if (!user) {
    return (
      <div
        style={{
          textAlign: "center", // 글자를 가운데 정렬
          marginTop: "50px", // 위에서 50px 떨어뜨리기
          maxWidth: "400px", // 최대 너비 400px
          marginLeft: "auto", // 왼쪽 여백 자동
          marginRight: "auto", // 오른쪽 여백 자동 (가운데 정렬)
        }}>
        <h1>📝To Do List</h1>
        <p style={{ marginTop: "30px", marginBottom: "20px" }}>Please log in.</p>
        <button
          onClick={handleLogin}
          style={{
            padding: "10px 20px", // 안쪽 여백 (위아래 10px, 좌우 20px)
            fontSize: "16px", // 글자 크기
            backgroundColor: "#4285f4", // 배경색 (파란색)
            color: "white", // 글자색 (흰색)
            border: "none", // 테두리 없음
            borderRadius: "5px", // 모서리를 둥글게
            cursor: "pointer", // 마우스를 올리면 손가락 모양으로 바뀜
          }}>
          Google Login
        </button>
      </div>
    );
  }

  // 로그아웃 버튼 클릭
  function handleLogout() {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        // 로그아웃이 실패하면 실행되는 부분
        console.log("로그아웃 실패:", error); // 콘솔에 실패 메시지 출력
      });
  }

  // 할 일 추가 버튼
  async function handleAdd() {
    if (task.trim() === "" || !user) return;
    try {
      await addDoc(collection(db, "todos"), {
        userId: user.uid,
        text: task,
        done: false,
        createdAt: Timestamp.now(),
      });
      setTask("");
    } catch (error) {
      // catch: 문제가 생겼을 때 실행되는 부분
      console.error("할 일 추가 실패:", error); // 콘솔에 에러 출력
      alert("할 일 추가에 실패했습니다: " + error.message); // 사용자에게 에러 메시지 보여주기
    }
  }

  // 할일 완료 토글
  async function toggleDone(id) {
    const task = taskList.find((t) => t.id === id);
    if (!task) return;
    try {
      const taskRef = doc(db, "todos", id);
      await updateDoc(taskRef, {
        done: !task.done,
      });
    } catch (error) {
      // catch: 문제가 생겼을 때 실행되는 부분
      console.error("완료 상태 변경 실패:", error); // 콘솔에 에러 출력
      alert("완료 상태 변경에 실패했습니다: " + error.message); // 사용자에게 에러 메시지 보여주기
    }
  }

  // 할일 수정내용 저장
  async function handleEditSave(id) {
    if (editText.trim() === "") return;
    try {
      const taskRef = doc(db, "todos", id);
      await updateDoc(taskRef, {
        text: editText,
      });
      setEditId(null);
      setEditText("");
    } catch (error) {
      // catch: 문제가 생겼을 때 실행되는 부분
      console.error("수정 실패:", error); // 콘솔에 에러 출력
      alert("수정에 실패했습니다: " + error.message); // 사용자에게 에러 메시지 보여주기
    }
  }

  // 할일 수정 폼
  function handleEditStart(id, currentText) {
    setEditId(id);
    setEditText(currentText);
  }

  // 할일 삭제
  async function handleDelete(id) {
    if (!window.confirm("Would you like to delete it?")) return;
    try {
      const taskRef = doc(db, "todos", id);
      await deleteDoc(taskRef);
    } catch (error) {
      // catch: 문제가 생겼을 때 실행되는 부분
      console.error("삭제 실패:", error); // 콘솔에 에러 출력
      alert("삭제에 실패했습니다: " + error.message); // 사용자에게 에러 메시지 보여주기
    }
  }

  // 구글 로그인 했을 때 html
  return (
    <div
      style={{
        textAlign: "center", // 글자를 가운데 정렬
        marginTop: "50px", // 위에서 50px 떨어뜨리기
        maxWidth: "400px", // 최대 너비 400px
        marginLeft: "auto", // 왼쪽 여백 자동
        marginRight: "auto", // 오른쪽 여백 자동 (가운데 정렬)
      }}>
      {/* 제목, 사용자 이름, 로그아웃 버튼 */}
      <div
        style={{
          display: "flex", // 가로로 나란히 배치
          justifyContent: "space-between", // 양쪽 끝에 배치 (제목은 왼쪽, 버튼은 오른쪽)
          alignItems: "center", // 세로로 가운데 정렬
          marginBottom: "20px", // 아래쪽 여백
        }}>
        <h1>📝To Do List</h1>
        <div>
          {/* 사용자 이름, 로그아웃 버튼 */}
          <span style={{ marginRight: "10px" }}>{user.displayName || user.email}</span>
          <button
            onClick={handleLogout}
            style={{
              padding: "5px 10px", // 안쪽 여백
              fontSize: "14px", // 글자 크기
              backgroundColor: "#dc3545", // 배경색 (빨간색)
              color: "white", // 글자색 (흰색)
              border: "none", // 테두리 없음
              borderRadius: "5px", // 모서리를 둥글게
              cursor: "pointer", // 마우스를 올리면 손가락 모양으로 바뀜
            }}>
            Logout
          </button>
        </div>
      </div>
      {/* 할일 입력창 */}
      <input
        type="text"
        placeholder="Enter what to do"
        value={task}
        style={{
          padding: "5px 10px", // 안쪽 여백
          borderRadius: "5px", // 모서리를 둥글게
          border: "none", // 테두리 없음
          backgroundColor: "#f1f1f1",
          marginRight: "10px",
        }}
        onChange={(e) => {
          setTask(e.target.value);
        }}
      />
      <button
        onClick={handleAdd}
        style={{
          padding: "5px 10px", // 안쪽 여백
          fontSize: "14px", // 글자 크기
          backgroundColor: "#3562dcff", // 배경색 (빨간색)
          color: "white", // 글자색 (흰색)
          border: "none", // 테두리 없음
          borderRadius: "5px", // 모서리를 둥글게
          cursor: "pointer", // 마우스를 올리면 손가락 모양으로 바뀜
        }}>
        Add
      </button>
      {/* 할일 목록 */}
      <ul
        style={{
          listStyle: "none", // 목록 앞의 점(불릿) 제거
          padding: 0, // 안쪽 여백 없음
          marginTop: "20px", // 위쪽 여백
          textAlign: "left", // 글자를 왼쪽 정렬
        }}>
        {taskList.map(({ id, text, done, date }) => (
          <li
            key={id}
            style={{
              // li: 목록의 각 항목
              marginBottom: "12px", // 아래쪽 여백 (각 할 일 사이 간격)
              background: done ? "#d4edda" : "#f8d7da", // 배경색
              // done이 true(완료)면 연한 초록색, false(미완료)면 연한 빨간색
              padding: "10px", // 안쪽 여백
              borderRadius: "5px", // 모서리를 둥글게
              display: "flex", // 가로로 나란히 배치
              alignItems: "center", // 세로로 가운데 정렬
              justifyContent: "space-between", // 양쪽 끝에 배치
            }}>
            <div>
              <input type="checkbox" checked={done} onChange={() => toggleDone(id)} style={{ marginRight: "10px" }} />
              {editId === id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => {
                      setEditText(e.target.value);
                    }}
                    style={{ padding: "5px", fontSize: "14px", width: "70%" }}
                  />
                  <button
                    onClick={() => handleEditSave(id)}
                    style={{
                      marginLeft: "5px", // 왼쪽 여백
                      padding: "5px 8px", // 안쪽 여백
                      backgroundColor: "green", // 배경색 (초록색)
                      color: "white", // 글자색 (흰색)
                      border: "none", // 테두리 없음
                      borderRadius: "4px", // 모서리를 둥글게
                      cursor: "pointer", // 마우스를 올리면 손가락 모양으로 바뀜
                    }}>
                    Save
                  </button>
                </>
              ) : (
                <>
                  <strong>{text}</strong>
                  <br />
                  <small>{date}</small>
                </>
              )}
            </div>
            <div>
              {editId !== id && (
                <button
                  onClick={() => handleEditStart(id, text)} // 버튼을 클릭하면 handleEditStart 함수 실행
                  style={{
                    background: "orange", // 배경색 (주황색)
                    color: "white", // 글자색 (흰색)
                    border: "none", // 테두리 없음
                    borderRadius: "4px", // 모서리를 둥글게
                    padding: "5px 8px", // 안쪽 여백
                    cursor: "pointer", // 마우스를 올리면 손가락 모양으로 바뀜
                    marginRight: "5px", // 오른쪽 여백
                  }}>
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDelete(id)} // 버튼을 클릭하면 handleDelete 함수 실행
                style={{
                  background: "red", // 배경색 (빨간색)
                  color: "white", // 글자색 (흰색)
                  border: "none", // 테두리 없음
                  borderRadius: "4px", // 모서리를 둥글게
                  padding: "5px 8px", // 안쪽 여백
                  cursor: "pointer", // 마우스를 올리면 손가락 모양으로 바뀜
                }}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
