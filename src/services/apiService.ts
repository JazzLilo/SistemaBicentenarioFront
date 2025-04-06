import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

interface ApiResponse<T = any> {
  status: number;
  success: boolean;
  message: string;
  [key: string]: any; // Permite propiedades adicionales directamente en la respuesta
}

class ApiService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' }
    });

    this.initializeResponseInterceptor();
  }

  private initializeResponseInterceptor() {
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const { status, data } = response;
        
        // Si el backend ya envía la estructura correcta, la devolvemos directamente
        if (data && typeof data === 'object' && 'status' in data && 'success' in data) {
          return { ...data, status: data.status || status };
        }

        // Si no, creamos la estructura base
        return {
          status,
          success: status >= 200 && status < 300,
          message: this.getStatusMessage(status),
          ...data // Spread de las propiedades directas
        };
      },
      (error: AxiosError) => {
        const errorResponse = error.response || {};
        const { status = 500, data = {} } = errorResponse as any;

        return Promise.reject({
          status,
          success: false,
          message: data.message || error.message,
          ...data // Spread de los errores del backend
        });
      }
    );
  }

  private getStatusMessage(status: number): string {
    const statusMessages: Record<number, string> = {
      200: 'OK',
      201: 'Created',
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      500: 'Internal Server Error'
    };
    return statusMessages[status] || 'Unknown Status';
  }

  // Métodos HTTP simplificados
  public async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.instance.get(endpoint);
  }

  public async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.instance.post(endpoint, data);
  }

  public async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.instance.put(endpoint, data);
  }

  public async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.instance.delete(endpoint);
  }

  // Métodos para el token de autenticación
  public setAuthToken(token: string): void {
    this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  public removeAuthToken(): void {
    delete this.instance.defaults.headers.common['Authorization'];
  }
}

export const apiService = new ApiService();