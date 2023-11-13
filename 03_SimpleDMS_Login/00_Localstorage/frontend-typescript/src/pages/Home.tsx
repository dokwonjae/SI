// Home.tsx : rfce
import React, {useState} from "react";

function Home() {

    // todo 변수 정의
    // 화면에 출력할 변수 : 로컬스토리지의 객체값
    const [printLocalStorage, setPrintLocalStorage] 
        = useState<string>("");
    // input 태그와 바인딩될 변수
    const [newTodoItem, setNewTodoItem] = useState<string>("");

    // todo 함수 정의
    // 로컬스토리지 : (키, 값) 으로 이루어져 있음(웹브라우저 있음)
    // input(newTodoItem) : 키이름으로 로컬스토리지에 객체 저장하는 함수
    const addTodoItem = () => { 
        // input 태그에 값이(키이름) 입력되면
        if(newTodoItem !== "") {
            // 샘플 데이터 : 로컬스토리지에 저장될 객체
            const data = {
                userId: "forbob",
                password: "123456",
                email: "forbob@naver.com",
                roles: "ROLE_ADMIN",
                loggedIn: true,
              };

            // todo: 로컬스토리지에 저장
            // 사용법 : localStorage.setItem(키이름, 값(문자열))
            // JSON.stringify(객체) : 객체 -> 문자열로 변환
            localStorage.setItem(newTodoItem, JSON.stringify(data));
        }
     }
     
    //  로컬스토리지 값 가져오기 함수
    const getTodoItem = () => {
        setPrintLocalStorage(localStorage.getItem(newTodoItem)||"");
    }
    // 로컬스토리지 키이름으로 삭제하기
    const delTodoItem = () => {
        localStorage.removeItem(newTodoItem);
    }
    const clearTodoItem = () => {
        // 화면 지우기
        setPrintLocalStorage("")
    }
    // 수동 바인딩 함수
    const newHandleChange = (event: any) => { 
        setNewTodoItem(event.target.value);
     }

  return (
    // 여기
    <div className="add">
      <input
        type="text"
        className="form-control m-1"
        placeholder="Enter user"
        value={newTodoItem}
        onChange={newHandleChange}
      />
      <button className="btn btn-primary m-1" onClick={addTodoItem}>
        Add
      </button>
      <button className="btn btn-success m-1" onClick={getTodoItem}>
        Get
      </button>
      <button className="btn btn-danger m-1" onClick={delTodoItem}>
        Remove
      </button>
      <button className="btn btn-info m-1" onClick={clearTodoItem}>
        Clear
      </button>
      {/* // <!-- localStorage의 키의 값 출력 --> */}
      localStorage 값 : {printLocalStorage}
    </div>
  );
}

export default Home;