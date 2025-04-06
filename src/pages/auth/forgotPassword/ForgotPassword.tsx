import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {ForgotPasswordContainer} from './ForgotPasswordStyle';

import { apiService } from '@/services/apiService';
import { PublicRoutes } from '@/routes/routes';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // 1: email, 2: code, 3: new password
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSendCode = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    setError('');

      apiService.post(`users/verify_email_for_recovery?email=${email}`,{}).then((response)=>{
        console.log(response)
        setStep(2);
      }).catch((err:any)=>{
        setError('Error al enviar el código: ' + (err.message || 'Inténtalo de nuevo'));       
      }).finally(()=>{
        setLoading(false);
      })
      
    
  };

  const handleVerifyCode = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    await apiService.post(`users/verify_code`,{
      email: email,
      code: code,
          }).then((response)=>{
            console.log(response)
            setStep(3);
          }).catch((error)=>{ 
            console.log(error)
            setError('Código inválido: ' + (error.data.detail || 'Inténtalo de nuevo'));
          }).finally(()=>{
            setLoading(false);
          });
    

    try {
      
    } catch (err:any) {
      setError('Código inválido: ' + (err.message || 'Inténtalo de nuevo'));
      setLoading(false);
    }
  };

  const handleResetPassword = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }
    console.log(email, newPassword)
    await apiService.put(`users/reset_password/${email}`, {      
      "new_password":newPassword
    }).then((response) => {
      console.log(response)
      alert('Contraseña actualizada correctamente');
      navigate(PublicRoutes.Login);
    }
    ).catch((error) => {
      console.log(error)
      setError('Error al actualizar la contraseña: ' + (error.data.detail || 'Inténtalo de nuevo'));
      setLoading(false);
    });

  };

  const togglePasswordVisibility = (field:any) => {
    if (field === 'new') {
      setShowNewPassword(!showNewPassword);
    } else if (field === 'confirm') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <ForgotPasswordContainer>
        <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-300 to-gray-300 '>
        <div className="forgot-password-box">
        <div className="forgot-password-header">
          <h1>
            {step === 1 ? 'Recuperar contraseña' : 
             step === 2 ? 'Verificar código' : 
             'Nueva contraseña'}
          </h1>
          <p>
            {step === 1 ? 'Ingresa tu correo electrónico para recuperar tu contraseña' : 
             step === 2 ? 'Ingresa el código de verificación enviado a tu correo' : 
             'Crea una nueva contraseña para tu cuenta'}
          </p>
        </div>

        {error && <div className="error-message">{error}</div>}

        {step === 1 && (
          <form onSubmit={handleSendCode} className="forgot-password-form">
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo electrónico"
                required
              />
            </div>
            <button 
              type="submit" 
              className="send-code-button"
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar código de verificación'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyCode} className="forgot-password-form">
            <div className="form-group">
              <label htmlFor="code">Código de verificación</label>
              <input
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Ingresa el código de 6 dígitos"
                required
                maxLength={6}
              />
            </div>
            <button 
              type="submit" 
              className="verify-code-button"
              disabled={loading}
            >
              {loading ? 'Verificando...' : 'Verificar código'}
            </button>
            <button 
              type="button" 
              className="resend-code-button"
              onClick={handleSendCode}
              disabled={loading}
            >
              Reenviar código
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="forgot-password-form">
            <div className="form-group">
              <label htmlFor="newPassword">Nueva contraseña</label>
              <div className="password-input-container">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Ingresa tu nueva contraseña"
                  required
                  minLength={8}
                />
                <button 
                  type="button" 
                  className="toggle-password-btn"
                  onClick={() => togglePasswordVisibility('new')}
                >
                  {showNewPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar contraseña</label>
              <div className="password-input-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirma tu nueva contraseña"
                  required
                  minLength={8}
                />
                <button 
                  type="button" 
                  className="toggle-password-btn"
                  onClick={() => togglePasswordVisibility('confirm')}
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            <button 
              type="submit" 
              className="reset-password-button"
              disabled={loading}
            >
              {loading ? 'Actualizando...' : 'Actualizar contraseña'}
            </button>
          </form>
        )}

        <div className="forgot-password-footer">
          <p>¿Recordaste tu contraseña? <Link to="/">Iniciar sesión</Link></p>
        </div>
      </div>
        </div>
    </ForgotPasswordContainer>
  );
}

export default ForgotPassword;
