
export interface ApiResponse<T = any> {
    status: number; 
    success: boolean; 
    message: string; 
    data?: T; 
  }
  
  export type ApiError = ApiResponse & {
    error?: string;
    details?: any;
  };