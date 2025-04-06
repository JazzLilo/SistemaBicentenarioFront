import { useState } from 'react';
import { useNavigate} from 'react-router-dom';

import { CheckEmailContainer } from './checkEmail/CheckEmailStyle';
import { apiService } from '@/services/apiService';
import { PublicRoutes } from '@/routes/routes';

function VerifyCode() {
  const email = localStorage.getItem('email');
  const navigate = useNavigate();  
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    await apiService.post('users/verify_code', { email, code }).then((response) => {
      if (response.success) {
        console.log(response);
        if (response.success) {          
          navigate(PublicRoutes.Login);
        }
      } 
    }).catch((err: any) => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    });
    
  };


  return (
    <CheckEmailContainer>
      <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-300 to-gray-300'>
        <div className="check-email-box">
          <div className="check-email-header">
            <h1>Verificar código</h1>
            <p>Ingresa el código enviado a {email}</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleVerifyCode} className="check-email-form">
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
              className="primary-button"
              disabled={loading}
            >
              {loading ? 'Verificando...' : 'Verificar código'}
            </button>
            
          </form>

        </div>
      </div>
    </CheckEmailContainer>
  );
}

export default VerifyCode;