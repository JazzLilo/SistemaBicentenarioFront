import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

interface ApiResponse<T = any> {
  status: number;
  success: boolean;
  message: string;
  data?: T;
}

interface ApiError extends ApiResponse {
  error?: string;
  details?: any;
}

class ApiService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
      transformResponse: [
        (data) => {
          try {
            const parsed = JSON.parse(data);
            if (parsed && typeof parsed === 'object' && 'status' in parsed && 'success' in parsed) {
              return parsed;
            }
            return {
              status: 200, 
              success: true,
              message: 'OK',
              data: parsed
            };
          } catch (e) {
            return {
              status: 200,
              success: true,
              message: 'OK',
              data: data
            };
          }
        }
      ]
    });

    this.initializeResponseInterceptor();
  }

  private initializeResponseInterceptor() {
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        const { status, data } = response;
        
        if (data && typeof data === 'object' && 'status' in data && 'success' in data) {
          return {
            ...data,
            status: data.status || status
          };
        }
        
        return {
          status,
          success: status >= 200 && status < 300,
          message: this.getStatusMessage(status),
          data
        };
      },
      (error: AxiosError) => {
        if (error.response) {
          const { status, data } = error.response;
          const errorData = data as any;
          
          return Promise.reject({
            status,
            success: false,
            message: errorData?.message || error.message,
            error: errorData?.error,
            details: errorData?.details,
            data: errorData?.data || errorData
          } as ApiError);
        }
        
        return Promise.reject({
          status: 0,
          success: false,
          message: error.request ? 'No se recibió respuesta del servidor' : 'Error al configurar la petición',
          error: error.request ? 'Network Error' : error.message
        } as ApiError);
      }
    );
  }

  private getStatusMessage(status: number): string {
    const messages: Record<number, string> = {
      200: 'OK',
      201: 'Created',
      204: 'No Content',
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      500: 'Internal Server Error',
    };
    return messages[status] || 'Unknown Status';
  }

  public async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await this.instance.get<never, ApiResponse<T>>(endpoint);
    return response;
  }

  public async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    const response = await this.instance.post<never, ApiResponse<T>>(endpoint, data);
    return response;
  }

  public async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    const response = await this.instance.put<never, ApiResponse<T>>(endpoint, data);
    return response;
  }

  public async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await this.instance.delete<never, ApiResponse<T>>(endpoint);
    return response;
  }

  public setAuthToken(token: string): void {
    this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  public removeAuthToken(): void {
    delete this.instance.defaults.headers.common['Authorization'];
  }
}

export const apiService = new ApiService();