import { useState, useEffect } from 'react';
import { authService } from '@/services/api';
import { ReactNode } from 'react';
import { AuthContext, AuthContextType, User } from './AuthContext';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User>(null);
    const [loading, setLoading] = useState(true);
  
    // Verificar si hay un usuario en el localStorage al cargar
    useEffect(() => {
      const user = localStorage.getItem('user');
      if (user) {
        try {
          setCurrentUser(JSON.parse(user));
        } catch (error) {
          console.error('Error parsing user data', error);
        }
      }
      setLoading(false);
    }, []);
  
    // Función para iniciar sesión
    async function login(email: string, password: string, captcha: string): Promise<User> {
      try {
        const response = await authService.login( email, password, captcha );
        const user = response.user;
        setCurrentUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      } catch (error) {
        throw error;
      }
    }
  
    // Función para registrar un usuario
    async function register(userData: any): Promise<any> {
      return authService.completeRegister(userData);
    }
  
    // Funciones para el flujo de verificación de email
    async function sendVerificationCode(email: string): Promise<any> {
      return authService.sendVerificationCode(email);
    }
  
    async function verifyCode(email: string, code: string): Promise<any> {
      return authService.verifyCode(email, code);
    }
  
    // Funciones para recuperación de contraseña
    async function forgotPassword(email: string): Promise<any> {
      return authService.forgotPassword(email);
    }
  
    async function verifyResetCode(email: string, code: string): Promise<any> {
      return authService.verifyResetCode(email, code);
    }
  
    async function resetPassword(email: string, code: string, newPassword: string): Promise<any> {
      return authService.resetPassword(email, code, newPassword);
    }
  
    // Función para cerrar sesión
    function logout(): void {
      setCurrentUser(null);
      localStorage.removeItem('user');
    }
  
    const value: AuthContextType = {
      currentUser,
      login,
      register,
      logout,
      sendVerificationCode,
      verifyCode,
      forgotPassword,
      verifyResetCode,
      resetPassword,
      loading
    };
  
    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    );
  }