import { createContext, useContext } from 'react';


export type User = {
 
  id: string;
  email: string;
} | null;

export type AuthContextType = {
  currentUser: User;
  login: (email: string, password: string, captcha: string) => Promise<User>;
  register: (userData: any) => Promise<any>;
  logout: () => void;
  sendVerificationCode: (email: string) => Promise<any>;
  verifyCode: (email: string, code: string) => Promise<any>;
  forgotPassword: (email: string) => Promise<any>;
  verifyResetCode: (email: string, code: string) => Promise<any>;
  resetPassword: (email: string, code: string, newPassword: string) => Promise<any>;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}

