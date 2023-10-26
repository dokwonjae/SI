// IThreadBoard.ts : 인터페이스 타입
export default interface IThreadBoard {      
    tid?: any | null,
    subject: string,
    main_Text: string,
    writer: string,
    views: number,
    tGroup: any|null,
    tParent: any|null                 
}