// axios 공통함수 : 벡엔드 연동
import ICode from "../../../types/admin/code/ICode";
import http from "../../../utils/http-common";

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (codeName:string, page:number, size:number) => {
  return http.get<Array<ICode>>(`/admin/code?codeName=${codeName}&page=${page}&size=${size}`);
};

// 전체 조회 : 페이징 처리 안됨
const getAllNoPage = () => {
    return http.get<Array<ICode>>("/admin/code/all")
};

// 상세 조회
const get = (codeId:any) => {
  return http.get<ICode>(`/admin/code/${codeId}`);
};

// 저장함수
const create = (data:ICode) => {
  return http.post<ICode>("/admin/code", data);
};
// 수정함수
const update = (codeId:any, data:ICode) => {
  return http.put<any>(`/admin/code/${codeId}`, data);
};
// 삭제함수
const remove = (codeId:any) => {
  return http.delete<any>(`/admin/code/deletion/${codeId}`);
};

const CodeService = {
  getAll,
  getAllNoPage,
  get,
  create,
  update,
  remove,
};

export default CodeService;