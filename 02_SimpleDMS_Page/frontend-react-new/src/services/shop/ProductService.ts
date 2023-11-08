// ProductService.ts : axios 공통 crud 함수

import IProduct from "../../types/shop/IProduct";
import http from "../../utils/http-common";

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (pname:string, page:number, size:number) => {
    return http.get<Array<IProduct>>(`/shop/product?pname=${pname}&page=${page}&size=${size}`);
  };
  
  // 상세 조회
  const get = (pno:any) => {
    return http.get<IProduct>(`/shop/product/${pno}`);
  };
  
  // 저장함수
  const create = (data:IProduct) => {
    return http.post<IProduct>("/shop/product", data);
  };
  // 수정함수
  const update = (pno:any, data:IProduct) => {
    return http.put<any>(`/shop/product/${pno}`, data);
  };
  // 삭제함수
  const remove = (pno:any) => {
    return http.delete<any>(`/shop/product/deletion/${pno}`);
  };
  
  const ProductService = {
    getAll,
    get,
    create,
    update,
    remove,
  };

export default ProductService;