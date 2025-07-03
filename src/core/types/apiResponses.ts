export interface ErrorResponse {
  code: string;
  message: string;
}

export interface Response<T> {
  data: T,
  error?: ErrorResponse
}