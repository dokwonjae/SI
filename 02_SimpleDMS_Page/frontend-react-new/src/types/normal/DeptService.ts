import IDept from "../../types/basic/IDept";
import http from "../../utils/http-common";


const getAll = (dname:string, page:number, size:number) => {
  return http.get<Array<IDept>>(`/basic/dept?dname=${dname}&page=${page}&size=${size}`);
};

const get = (dno:any) => {
  return http.get<IDept>(`/basic/dept/${dno}`);
};

const create = (data:IDept) => {
  return http.post<IDept>("/basic/dept", data);
};

const update = (dno:any, data:IDept) => {
  return http.put<any>(`/basic/dept/${dno}`, data);
};

const remove = (dno:any) => {
  return http.delete<any>(`/basic/dept/deletion/${dno}`);
};

const DeptService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default DeptService;
