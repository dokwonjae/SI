// ThemaLoadList.tsx : rfce
// 공공 데이터 포털 : 부산 테마거리 전체 조회
import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import TitleCom from "../../../components/common/TitleCom";
import IThemaLoad from './../../../types/shop/IThemaLoad';
import ThemaLoadService from "../../../services/shop/ThemaLoadService";

function ThemaLoadList() {
  // todo: 변수 정의
  // themaLoad 배열 변수
  const [themaLoad, setThemaLoad] = useState<Array<IThemaLoad>>([]);

  // todo: 공통 변수 : page(현재페이지번호), count(총페이지건수), pageSize(3,6,9 배열)
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(3); // 1페이지당개수
  // todo: 공통 pageSizes : 배열 (셀렉트 박스 사용)
  const pageSizes = [3, 6, 9];

  // todo: 함수 정의
  useEffect(() => {
    retrieveThemaLoad(); // 전체 조회
  }, [page, pageSize]);

  //   전체조회 함수
  const retrieveThemaLoad = () => {
    ThemaLoadService.getAll(page -1, pageSize) // 벡엔드 전체조회요청
    .then((response: any)=>{
      // todo : 공공 API 결과 값 저장
      // todo : totalCount(총건수), data(결과값배열)
      // todo :  perPage(1페이지당개수)
      // todo : 총페이지수 = Math.ceil(totalCount / perPage)
      const { data, perPage, totalCount } = response.data;
      // 총페이지 수
      const totalPages = Math.ceil(totalCount / perPage);
      setThemaLoad(data);
      setCount(totalPages);
      console.log("response", response.data);

    })
    .catch((e: Error)=>{
      // 벡엔드 실패시 실행됨
      console.log(e);
    })
  };

  // todo: handlePageSizeChange(공통) : pageSize 값 변경시 실행되는 함수
  //  select 태그 수동 바인딩 : 화면값 -> 변수에 저장
  const handlePageSizeChange = (event: any) => { 
      setPageSize(event.target.value); // 1페이지당 개수저장(3,6,9)
      setPage(1); // 현재페이지번호 : 1로 강제설정
   }

  //  todo: Pagination 수동 바인딩(공통)
  //  페이지 번호를 누르면 => page 변수에 값 저장
  const handlePageChange = (event:any, value:number) => { 
      // value == 화면의 페이지번호
      setPage(value);
   }  

  return (
    // 여기
    <>
      {/* 제목 start */}
      <TitleCom title="ThemaLoad List" />
      {/* 제목 end */}

      {/* paging 시작 */}
      <div className="mt-3">
        {"Items per Page: "}
        <select onChange={handlePageSizeChange} value={pageSize}>
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <Pagination
          className="my-3"
          count={count}
          page={page}
          siblingCount={1}
          boundaryCount={1}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
        />
      </div>
      {/* paging 끝 */}

      {/* table start */}
      <div className="col-md-12">
        {/* table start */}
        <table className="table">
          <thead className="table-light">
            <tr className="text-center">
              <th scope="col">식당(ID)</th>
              <th scope="col">식당명</th>
              <th scope="col">지역명</th>
              <th scope="col">식당이미지(ID)</th>
              <th scope="col">식당이미지(URL)</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {themaLoad &&
              themaLoad.map((data, index) => (
                <tr key={index} className="text-center">
                  <td>{data["식당(ID)"]}</td>
                  <td>{data["식당명"]}</td>
                  <td>{data["지역명"]}</td>
                  <td>{data["식당이미지(ID)"]}</td>
                  <td>
                    <img
                      src={data["식당이미지(URL)"]}
                      width="50vw"
                      height="30vh"
                    />{" "}
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

export default ThemaLoadList;