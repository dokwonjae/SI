// 인터페이스 : == 자바 모델 유사
// => 목적 : 각 속성에 자료형(type) 을 강제하는 것
export default interface IEmp {
    // 아예 모르겠다 하면 any | null
    eno?: any | null,
    ename: string,
    job: string,
    manager: number,
    hiredate: string,
    salary: number,
    commission: number,
    dno: number
}