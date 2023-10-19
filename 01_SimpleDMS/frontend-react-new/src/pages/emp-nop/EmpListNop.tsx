// EmpListNop.tsx
// react 단축키 : rfce
import React, { useEffect, useState } from "react";
import TitleCom from "../../components/common/TitleCom";
import { Link } from "react-router-dom";
import IEmp from "../../types/IEmp";
import EmpService from "../../services/EmpService";

function EmpListNop() {
  // 변수 정의
  // todo: 부서배열 변수
  const [emp, setEmp] = useState<Array<IEmp>>([]);
  // todo: 검색어 변수
  const [searchEname, setSearchEname] = useState<string>("");

  // 함수 정의
  // todo: 화면이 뜨자마자 실행되는 이벤트함수(1번)
  //  사용법 : useEffect(()=>{실행문},[])
  useEffect(() => {
    // 전체 조회 실행
    retrieveEmp();
  }, []);

  // todo: 검색어 수동 바인딩 함수
  const onChangeSearchEname = (e: any) => {
    // todo: event.target : input 태그에 현재 걸린 이벤트
    //  => e.target.value : 현재 조작하는 태그의 value 값
    setSearchEname(e.target.value);
  };

  // todo: 전체 조회 함수
  const retrieveEmp = () => {
    EmpService.getAll() // backend 요청
      .then((response: any) => {
        // todo: 성공 처리
        setEmp(response.data);
        // 로그
        console.log("response", response.data);
      })
      .catch((e: Error) => {
        // todo: 실패 처리
        console.log(e);
      });
  };

  // todo: 검색어 조회 함수
  const findByEname = () => {
    EmpService.findByEname(searchEname) // backend 요청
      .then((response: any) => {
        // todo: 성공 처리
        setEmp(response.data);
        // 로그
        console.log("response", response.data);
      })
      .catch((e: Error) => {
        // todo: 실패 처리
        console.log(e);
      });
  };

  return (
    // 여기
    <>
    {/* 제목 start */}
    <TitleCom title="Emp List" />
    {/* 제목 end */}

    {/* ename start */}
    <div className="row mb-5 justify-content-center">
      {/* w-50 : 크기 조정, mx-auto : 중앙정렬(margin: 0 auto), justify-content-center */}
      <div className="col-12 w-50 input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by ename"
          value={searchEname}
          onChange={onChangeSearchEname}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={findByEname}
          >
            Search
          </button>
        </div>
      </div>
    </div>
    {/* ename end */}

    {/* table start */}
    <div className="col-md-12">
      {/* table start */}
      <table className="table">
        <thead className="table-light">
          <tr>
            <th scope="col">Ename</th>
            <th scope="col">Job</th>
            <th scope="col">Manager</th>
            <th scope="col">Hiredate</th>
            <th scope="col">Salary</th>
            <th scope="col">Commission</th>
            <th scope="col">Dno</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {emp &&
            emp.map((data) => (
              <tr key={data.eno}>
                <td>{data.ename}</td>
                <td>{data.job}</td>
                <td>{data.manager}</td>
                <td>{data.hiredate}</td>
                <td>{data.salary}</td>
                <td>{data.commission}</td>
                <td>{data.dno}</td>
                <td>
                  <Link to={"/emp-nop/" + data.eno}>
                    <span className="badge bg-success">Edit</span>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* table end */}
    </div>
    {/* table end */}
  </>
  );
}

export default EmpListNop;