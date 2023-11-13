// IProduct.ts : 인터페이스
export default interface IProduct {
    pno?: any | null,
    kindCode: number,
    pname: string,
    image: string,
    unitPrice: number,
    statusCode: number,
    useYn: string
    }