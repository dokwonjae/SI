// CinemaFaq.tsx : rfce
import React, { useEffect, useState } from "react";
import TitleCom from "../../../components/common/TitleCom";
import { useNavigate, useParams } from "react-router-dom";
import ICinemaFaq from "../../../types/normal/ICinemaFaq";
import CinemaFaqService from "../../../services/normal/CinemaFaqService";

function CinemaFaq() {
  // todo: 변수 정의
  // 전체조회 페이지에서 전송한 기본키(cfno)
  const { cfno } = useParams();
  // 강제페이지 이동 함수
  let navigate = useNavigate();

  // 객체 초기화(상세조회 : 기본키 있음)
  const initialCinemaFaq = {
    cfno: null,
    question: "",             
    answer: "",            
    sortOrder: ""    
  };

  // 수정될객체
  const [cinemaFaq, setCinemaFaq] = useState<ICinemaFaq>(initialCinemaFaq);
  // 화면에 수정 성공에 메세지 찍기 변수
  const [message, setMessage] = useState<string>("");
  
  // todo: 함수 정의
  // 상세조회 함수
  const getCinemaFaq = (cfno: string) => {
    CinemaFaqService.get(cfno)           // 벡엔드로 상세조회 요청
      .then((response: any) => {
        setCinemaFaq(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // 화면이 뜰때 실행되는 이벤트 + cfno 값이 바뀌면 실행
  useEffect(() => {
    if (cfno) getCinemaFaq(cfno);
  }, [cfno]);

  // input 태그 수동 바인딩
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCinemaFaq({ ...cinemaFaq, [name]: value });
  };

  // 수정 함수
  const updateCinemaFaq = () => {
    CinemaFaqService.update(cinemaFaq.cfno, cinemaFaq) // 벡엔드로 수정요청
      .then((response: any) => {
        console.log(response.data);
        setMessage("cinemaFaq 수정되었습니다.!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // 삭제함수
  const deleteCinemaFaq = () => {
    CinemaFaqService.remove(cinemaFaq.cfno) // 벡엔드로 삭제요청
      .then((response: any) => {
        console.log(response.data);
        // 페이지 이동
        navigate("/cinema-faq");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    // 여기
    <>
      {/* 제목 start */}
      <TitleCom title="CinemaFaq Detail" />
      {/* 제목 end */}

      <>
        {cinemaFaq ? (
          <div className="col-6 mx-auto">
            <form>
              {/* question 입력 시작 */}
              <div className="row g-3 align-items-center mb-3">
                <div className="col-3">
                  <label htmlFor="question" className="col-form-label">
                    Question
                  </label>
                </div>

                <div className="col-9">
                  <input
                    type="text"
                    id="question"
                    required
                    className="form-control"
                    value={cinemaFaq.question}
                    onChange={handleInputChange}
                    placeholder="question"
                    name="question"
                  />
                </div>
              </div>
              {/* question 입력 끝 */}

              {/* answer 입력 시작 */}
              <div className="row g-3 align-items-center mb-3">
                <div className="col-3">
                  <label htmlFor="answer" className="col-form-label">
                    Answer
                  </label>
                </div>

                <div className="col-9">
                  <input
                    type="text"
                    id="answer"
                    required
                    className="form-control"
                    value={cinemaFaq.answer}
                    onChange={handleInputChange}
                    placeholder="answer"
                    name="answer"
                  />
                </div>
              </div>
              {/* answer 입력 끝 */}

              {/* sortOrder 입력 시작 */}
              <div className="row g-3 align-items-center mb-3">
                <div className="col-3">
                  <label htmlFor="sortOrder" className="col-form-label">
                    Sort Order
                  </label>
                </div>

                <div className="col-9">
                  <input
                    type="text"
                    id="sortOrder"
                    required
                    className="form-control"
                    value={cinemaFaq.sortOrder}
                    onChange={handleInputChange}
                    placeholder="sortOrder"
                    name="sortOrder"
                  />
                </div>
              </div>
              {/* sortOrder 입력 끝 */}
            </form>

            <div className="row g-3 mt-3 mb-3">
              <button
                onClick={deleteCinemaFaq}
                className="btn btn-outline-danger ms-3 col"
              >
                Delete
              </button>

              <button
                type="submit"
                onClick={updateCinemaFaq}
                className="btn btn-outline-success ms-2 col"
              >
                Update
              </button>
            </div>

            {message && (
              <p className="alert alert-success mt-3 text-center">{message}</p>
            )}
          </div>
        ) : (
          <div className="col-6 mx-auto">
            <br />
            <p>Please click on a CinemaFaq...</p>
          </div>
        )}
      </>
    </>
  );
}

export default CinemaFaq;