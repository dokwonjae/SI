// FaqList.tsx : rfce
import React, { useEffect, useState } from "react";
import TitleCom from "../../../components/common/TitleCom";
import { Pagination } from "@mui/material";
import IFaq from "../../../types/normal/IFaq";
import FaqService from "../../../services/normal/FaqService";

function FaqList() {
  // 변수 정의
  // faq 배열 변수
  const [faq, setFaq] = useState<Array<IFaq>>([]);
  const [searchTitle, setSearchTitle] = useState<string>("");


  // todo: 공통 변수 : page(현재페이지번호), count(총페이지건수), pageSize(3,6,9 배열)
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(3); // 1페이지당개수
  const pageSizes = [3, 6, 9]; // 공통 pageSizes : 배열 (셀렉트 박스 사용)

  // 함수 정의
  //   화면이 뜰때 실행되는 이벤트 + 감시변수
  useEffect(() => {
    retrieveFaq(); // 전체조회 실행
  }, [page, pageSize]);

  // 전체조회
  const retrieveFaq = () => {
    // 벡엔드 매개변수 전송 : + 현재페이지(page), 1페이지당개수(pageSize)
    FaqService.getAll(searchTitle, page - 1, pageSize) // 벡엔드 전체조회요청
      .then((response: any) => {
        const { faq, totalPages } = response.data;
        setFaq(faq);
        setCount(totalPages);
        // 로그 출력
        console.log("response", response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  //   select 태그 수동바인딩
  const onChangeSearchSelect = (e: any) => {
    setSearchTitle(e.target.value); // 화면값 -> 변수저장
  };

  //   input 태그 수동바인딩
  const onChangeSearchTitle  = (e: any) => {
    setSearchTitle(e.target.value); // 화면값 -> 변수저장
  };

  //   todo: 공통 페이징 함수 2개
  // todo: handlePageSizeChange(공통) : pageSize 값 변경시 실행되는 함수
  //  select 태그 수동 바인딩 : 화면값 -> 변수에 저장
  const handlePageSizeChange = (event: any) => {
    setPageSize(event.target.value); // 1페이지당 개수저장(3,6,9)
    setPage(1); // 현재페이지번호 : 1로 강제설정
  };

  //  todo: Pagination 수동 바인딩(공통)
  //  페이지 번호를 누르면 => page 변수에 값 저장
  const handlePageChange = (event: any, value: number) => {
    // value == 화면의 페이지번호
    setPage(value);
  };
  return (
    // 여기
    <div>
      {/* 제목 start */}
      <TitleCom title="Faq List" />
      {/* 제목 end */}

      {/* search start */}
      <div className="row mb-5 justify-content-center">
        <div className="col-12 w-50 input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={retrieveFaq}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      {/* search end */}

      {/* page start */}
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
      {/* page end */}

      {/* accodian start(반복문) */}
      <div className="col-md-12">
        <div className="accordion" id="accordionExample">
          {/* 반복문 사용법 : faq.map((data, index) => (아코디언 태그)) */}
          {faq &&
            faq.map((data, index) => (
              // 여기
              <div className="accordion-item">
                {/* 제목 시작 */}
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Accordion Item #1
                  </button>
                </h2>
                {/* 제목 끝 */}
                {/* 본문 시작 */}
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <strong>This is the first item's accordion body.</strong> It
                    is shown by default, until the collapse plugin adds the
                    appropriate classes that we use to style each element. These
                    classes control the overall appearance, as well as the
                    showing and hiding via CSS transitions. You can modify any
                    of this with custom CSS or overriding our default variables.
                    It's also worth noting that just about any HTML can go
                    within the <code>.accordion-body</code>, though the
                    transition does limit overflow.
                  </div>
                </div>
                {/* 본문 끝 */}
              </div>
            ))}
        </div>
      </div>
      {/* accodian end */}
    </div>
  );
}

export default FaqList;
