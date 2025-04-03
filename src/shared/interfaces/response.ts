// export interface BaseResponse {
//   message: string;
//   status: ResponseStatus;
// }
export interface BaseResponse {
  errorMessage: string;
  message:string;
  data: any;
  success:boolean;
  status: string;
  token:string;
  id:string

}
export interface ApiResponse<T> extends BaseResponse {
  data: T;
}

export interface ApiResponseArray<T> extends BaseResponse {
  data: T[]
}
enum ResponseStatus {
  
  Success = 200,
  BadRequest = 400,
  NotFound = 404,
}
export interface ListeningParameter {
  textToSearch?: string;
  sortColumn?: string;
  skip: number;
  take: number;
  pageSize:number;
  pageNo:number;
  sortOrder: string;
  selectedIds?: number[] | null;
}