import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '@/services/apiService';
import { CheckEmailContainer } from './CheckEmailStyle';
import { Link } from 'react-router-dom';
import { PublicRoutes } from '@/routes/routes';

function CheckEmail() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiService.get(`users/verify_email/${email}`);
      
      if (response.success) {
        localStorage.setItem('email', email);
        navigate(PublicRoutes.Register);
      } else {
        setError(response.message || 'Error al enviar el código');
      }
    } catch (err: any) {
      setError(err.data?.detail || 'Error al enviar el código');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CheckEmailContainer>
      <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-300 to-gray-300'>
        <div className="check-email-box">
          <div className="check-email-header">
            <h1>Verificar correo</h1>
            <p>
              Para registrarte, primero necesitamos verificar tu correo electrónico.
            </p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSendCode} className="check-email-form">
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
              className="primary-button"
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar código de verificación'}
            </button>
          </form>

          <div className="check-email-footer">
            <p>¿Ya tienes una cuenta? <Link to="/">Iniciar sesión</Link></p>
          </div>
        </div>
      </div>
    </CheckEmailContainer>
  );
}

export default CheckEmail;