import React, { useEffect, useState } from "react";
import TitleCom from "../../../components/common/TitleCom";
import { useNavigate, useParams } from "react-router-dom";
import ISimpleProduct from "../../../types/shop/ISimpleProduct";
import SimpleProductService from "../../../services/shop/SimpleProductService";
import SimpleCartService from "../../../services/shop/SimpleCartService";

function SimpleCart() {
  // todo: 변수 정의
  // 전체조회 페이지에서 전송한 기본키(spno)
  const { spno } = useParams();
  // 강제페이지 이동 함수
  let navigate = useNavigate();

  // simpleProduct 초기화(상세조회 : 기본키 있음)
  // todo: 객체 초기화
  const initialSimpleProduct = {
    spno: null,
    codeId: 0,
    title: "",
    imgPath: "",
    unitPrice: 0,
    useYn: "Y",
  };

  // simpleProduct 객체
  const [simpleProduct, setSimpleProduct] =
    useState<ISimpleProduct>(initialSimpleProduct);
  // 화면에 수정 성공에 메세지 찍기 변수
  const [message, setMessage] = useState<string>("");
  // todo: 장바구니 물품 개수를 저장할 변수
  let [cartCount, setCartCount] = useState<number>(0);

  // todo: 함수 정의
  // SimpleProduct 상세조회 함수
  const getSimpleProduct = (spno: string) => {
    SimpleProductService.get(spno) // 벡엔드로 상세조회 요청
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

  // todo: 장바구니 저장 함수
  // 저장 함수
  const saveSimpleCart = () => {
    // 임시 부서 객체
    var data = {
      spno: simpleProduct.spno,
      codeId: simpleProduct.codeId,
      title: simpleProduct.title,
      imgPath: simpleProduct.imgPath,
      unitPrice: simpleProduct.unitPrice,
      cartCount: cartCount, // 장바구니 개수
    };

    SimpleCartService.create(data) // 저장 요청
      .then((response: any) => {
        console.log(response.data);
        setMessage("장바구니에 저장되었습니다.");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  //   todo: /simple-cart(장바구니) 전체 조회 페이지로 이동하는 함수
  const goSimpleCart = () => {
    navigate("/simple-cart");
  };

  //   todo: 장바구니 개수 증가 함수
  const increaseCount = () => {
    cartCount += 1;
    setCartCount(cartCount); // 현재 증가값 저장
  };

  //   todo: 장바구니 개수 감소 함수
  const decreaseCount = () => {
    if (cartCount > 0) {
      cartCount -= 1;
      cartCount -= 1;
      setCartCount(cartCount); // 현재 감소값 저장
    }
  };

  // todo: 주문 결과 표시 함수
  const goOrder = () => {
    if(cartCount == 0){
        setMessage("장바구니 개수를 증가시켜주세요")
        return; // 함수에서 강제 중단 (==break)
    }
    alert(`주문했습니다. ${simpleProduct.title}, ${cartCount}`)
  }

  return (
    // 여기
    <div>
      {/* 제목 start */}
      <TitleCom title="SimpleProduct Detail" />
      {/* 제목 end */}

      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={simpleProduct.imgPath}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{simpleProduct.title}</h5>
              <h5 className="card-title">₩ {simpleProduct.unitPrice}</h5>
              <p className="card-text">
                영원한 아이콘인 {simpleProduct.title} 으로 스타일링 해보세요.
                <br />
                또한, 4계절을 함께 할 {simpleProduct.title} 으로 여러분의 OOTD
                를 표현해 보세요.
              </p>

              <div
                className="btn-group col"
                role="group"
                aria-label="Basic outlined example"
              >
                <button
                  type="button"
                  className="btn btn-outline-secondary opacity-50"
                  onClick={decreaseCount}
                >
                  -
                </button>

                <button type="button" className="btn btn-outline-dark" disabled>
                  {cartCount}
                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary opacity-50"
                  onClick={increaseCount}
                >
                  +
                </button>
              </div>

              <div className="mt-3">
                <button
                  type="submit"
                  onClick={saveSimpleCart}
                  className="btn btn-primary w-25"
                >
                  Add to Simple Cart
                </button>

                <button
                  type="submit"
                  onClick={goSimpleCart}
                  className="btn btn-success w-25 ms-2"
                >
                  Go to Simple Cart
                </button>
              </div>

              <div className="mt-3">
                <button
                  type="button"
                  onClick={goOrder}
                  className="btn btn-warning w-25"
                >
                  Simple Order
                </button>
              </div>

              {message && (
                <p className="alert alert-success mt-3 text-center">
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimpleCart;
