import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiService } from '@/services/apiService';
import ReCAPTCHA from 'react-google-recaptcha';
// Importamos las imágenes
import condorLeft from '@/assets/condorL.jpg';
import condorRight from '@/assets/condorR.jpg';

import { LoginContainer } from './LoginStyle'
import { save_data } from '@/storage/auth_storage';
import { PrivateRoutes } from '@/routes/routes';

export const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const recaptchaRef = useRef(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();``
    /*
    if (!captchaValue) {
      setError('Por favor, completa el captcha');
      return;
    }
    */
      setError('');
      setLoading(true);
      await apiService.post("users/authenticate",{
        email,
        password
      }).then((response) => {
        save_data(response.data?.usuario);
        navigate(PrivateRoutes.Dashboard);
      }).catch((error) => {
        console.error(error);
        setError('Error al iniciar sesión: ' + (error.data.detail || 'Verifica tus credenciales'));
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
        setCaptchaValue(null);
      }
      }).finally(() => {
      setLoading(false);
      }
      );
  }

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
    if (error === 'Por favor, completa el captcha') {
      setError('');
    }
  }


  return (
    <LoginContainer>
      <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-300 to-gray-300 ' >
      <div className="image-container left-image">
        <img src={condorLeft} alt="Cóndor izquierdo" className="side-image" />
      </div>
      
      <div className="login-box">
        <div className="login-header responsive-header">
          <div className="brand">
            <svg 
              className="logo"
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <h1>Iniciar Sesión</h1>
          </div>
          <p>Bienvenido de nuevo. Por favor, ingresa tus credenciales.</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form responsive-form">
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <path d="M22 6l-10 7L2 6"/>
              </svg>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button 
                type="button" 
                className="password-toggle" 
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
              <svg className="input-icon lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
          </div>

          <div className="captcha-container">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6Lf7IQErAAAAAKAyip0MdfbHmkC2UIVe5WdGD1cE"
              onChange={handleCaptchaChange}
            />
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
                </svg>
                <span>Iniciando sesión...</span>
              </>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>
        
        <div className="login-footer">
          <Link to="/forgot-password" className="forgot-password">
            ¿Olvidaste tu contraseña?
          </Link>
          <p className="signup-link">
            ¿No tienes una cuenta? <Link to="/check-email">Registrarse</Link>
          </p>
        </div>
      </div>
      
      <div className="image-container right-image">
        <img src={condorRight} alt="Cóndor derecho" className="side-image" />
      </div>
      </div>
    </LoginContainer>
  )
}
