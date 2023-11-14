// authHeader.ts : 웹토큰이 있는 http 헤더(공통)
export default function authHeader() {
    // 웹토큰 가져오기 : 로컬스토리지
    // 1) 웹토큰이 로컬스토리지에 있는가?
    if(localStorage.getItem("user")) {
        // 2) 로컬스토리지에서 웹토큰 가져오기(객체 변환)
        const user = JSON.parse(localStorage.getItem("user") || "");

        // 3) user 객체가 있고 동시에 user.accessToken(웹토큰) 있으면
        if( user && user.accessToken) {
            // springboot 웹토큰 받을 때 아래 처럼 보내야 받아짐
            return { Authorization: "Bearer " + user.accessToken };
        } else {
            return {}
        }
    }
}