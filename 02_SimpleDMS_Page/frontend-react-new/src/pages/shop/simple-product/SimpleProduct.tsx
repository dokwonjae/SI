// SimpleProduct.tsx : rfce
import React, { useEffect, useState } from "react";
import TitleCom from "../../../components/common/TitleCom";
import { useParams } from "react-router-dom";
import ISimpleProduct from './../../../types/shop/ISimpleProduct';
import ICode from "../../../types/admin/code/ICode";
import SimpleProductService from "../../../services/shop/SimpleProductService";
import CodeService from "../../../services/admin/code/CodeService";

function SimpleProduct() {
  // todo: 변수 정의
  // 전체조회 페이지에서 전송한 기본키(spno)
  const { spno } = useParams();
  // 강제페이지 이동 함수
//   let navigate = useNavigate();

  // todo: 객체 초기화
  const initialSimpleProduct = {
    spno: null,
    codeId: 0,
    title: "",
    imgPath: "",
    unitPrice: 0,
    useYn: "Y",
  };

//   todo: code 배열 변수 : select 태그용
  const [code, setCode] = useState<Array<ICode>>([]);
  // 수정될객체 : simpleProduct
  const [simpleProduct, setSimpleProduct] = useState<ISimpleProduct>(initialSimpleProduct);
  // 화면에 수정 성공에 메세지 찍기 변수
  const [message, setMessage] = useState<string>("");

  // todo: 함수 정의
  // 상세조회 함수
  const getSimpleProduct = (spno: string) => {
    SimpleProductService.get(spno)         // 벡엔드로 상세조회 요청
      .then((response: any) => {
        setSimpleProduct(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // 화면이 뜰때 실행되는 이벤트 + spno 값이 바뀌면 실행
  useEffect(() => {
    if (spno) getSimpleProduct(spno);
  }, [spno]);

  // input 태그 수동 바인딩
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSimpleProduct({ ...simpleProduct, [name]: value });
  };

  // todo: select 태그 수동 바인딩
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSimpleProduct({ ...simpleProduct, [name]: value });
  };

  // 수정 함수
  const updateSimpleProduct = () => {
    SimpleProductService.update(simpleProduct.spno, simpleProduct) // 벡엔드로 수정요청
      .then((response: any) => {
        console.log(response.data);
        setMessage("수정되었습니다.");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  //   todo: select 태그 에 반복문으로 code 데이터를 출력하는 함수
  //   todo: code 전체 조회 함수(페이징 없음)
  const retrieveCodeAll = () => {
    CodeService.getAllNoPage()
      .then((response) => {
        setCode(response.data);
        console.log("code", response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveCodeAll(); // code 전체조회(페이징 없음)
  }, []);

  return (
    // 여기
    <>
      {/* 제목 start */}
      <TitleCom title="SimpleProduct Detail" />
      {/* 제목 end */}

      <>
        {simpleProduct ? (
          <div className="col-6 mx-auto">
            <div className="row g-3 align-items-center mb-3">
              <div className="col-3">
                <label htmlFor="unitPrice" className="col-form-label">
                  Code Id
                </label>
              </div>
              <div className="col-9">
                <select
                  className="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                  id="codeId"
                  value={simpleProduct.codeId}
                  onChange={handleSelectChange}
                  name="codeId"
                >
                  <option>selected item</option>
                  {code &&
                    code
                      .filter((data) => data.categoryId == 100)
                      .map((data) => (
                        <option key={data.codeId} value={data.codeId}>
                          {data.codeName}
                        </option>
                      ))}
                </select>
              </div>
            </div>
            <div className="row g-3 align-items-center mb-3">
              <div className="col-3">
                <label htmlFor="title" className="col-form-label">
                  Title
                </label>
              </div>

              <div className="col-9">
                <input
                  type="text"
                  id="title"
                  required
                  className="form-control"
                  value={simpleProduct.title}
                  onChange={handleInputChange}
                  placeholder="title"
                  name="title"
                />
              </div>
            </div>

            <div className="row g-3 align-items-center mb-3">
              <div className="col-3">
                <label htmlFor="imgPath" className="col-form-label">
                  Image Path
                </label>
              </div>
              <div className="col-9">
                <input
                  type="text"
                  id="imgPath"
                  required
                  className="form-control"
                  value={simpleProduct.imgPath}
                  onChange={handleInputChange}
                  placeholder="imgPath"
                  name="imgPath"
                />
              </div>
            </div>

            <div className="row g-3 align-items-center mb-3">
              <div className="col-3">
                <label htmlFor="unitPrice" className="col-form-label">
                  Unit Price
                </label>
              </div>
              <div className="col-9">
                <input
                  type="number"
                  id="unitPrice"
                  required
                  className="form-control"
                  value={simpleProduct.unitPrice}
                  onChange={handleInputChange}
                  placeholder="unitPrice"
                  name="unitPrice"
                />
              </div>
            </div>

            <div className="row g-3 align-items-center mb-3">
              <div className="col-3">
                <label htmlFor="unitPrice" className="col-form-label">
                  Use Y/N
                </label>
              </div>
              <div className="col-9">
                <select
                  className="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                  id="useYn"
                  value={simpleProduct.useYn}
                  onChange={handleSelectChange}
                  name="useYn"
                >
                  <option value="Y">사용함</option>
                  <option value="N">사용 안함</option>
                </select>
              </div>
            </div>

            <div className="row g-3 mt-3 mb-3">
              <button
                onClick={updateSimpleProduct}
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
            <p>Please click on a SimpleProductNop...</p>
          </div>
        )}
      </>
    </>
  );
}

export default SimpleProduct;