// ThemaLoadService.ts : 공공 데이터 포털 API 함수

import axios from "axios";
import IThemaLoad from './../../types/shop/IThemaLoad';

// 공공 데이터 포털 : 부산 테마거리 음식점 기본 주소
let baseUrl = "https://api.odcloud.kr/api";

// 인증키 변수
let apiKey = "JYF5IjHIFxh5YyspCWG8zcRMgGfWLsqno9aGODy8haDoXpFUe7FqKgp2LwtlRcxjkbMcbZ06ejs5oUj1DO389A%3D%3D";

// 전체 조회
// page : 현재페이지번호,
// perPage : 1페이지당 개수
const getAll = (page: number, perPage:number) => { 
    // url 조합 : 기본주소 + 추가주소 + 변수명(쿼리스트링)
    let url = `${baseUrl}/15096718/v1/uddi:0a31f303-432c-4993-97d2-81537862521b?page=${page}&perPage=${perPage}&serviceKey=${apiKey}`;
    console.log(url);

    return axios.get<Array<IThemaLoad>>(url);

 }

 const ThemaLoadService = {
    getAll,
 };

 export default ThemaLoadService;