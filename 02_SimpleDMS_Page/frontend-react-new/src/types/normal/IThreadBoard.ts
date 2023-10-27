// IThreadBoard.ts : 타입 인터페이스
export default interface IThreadBoard {                     
    tid?: any | null,
    subject: string,
    mainText: string,
    writer: string,
    views: number,
    tgroup: any | null,
    tparent: any | null,
}