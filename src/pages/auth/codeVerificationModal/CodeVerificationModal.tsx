import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {ModalContainer} from '@/assets/css/ModalStyle';
import { apiService } from '@/services/apiService';
import { PublicRoutes } from '@/routes/routes';
const CodeVerificationModal = ({ email, onClose }:{
    email: string;
    onClose: () => void;
}) => {
    const [verificationCode, setVerificationCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [countdown, setCountdown] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const navigate = useNavigate();

    // Contador para permitir reenvío de código
    useEffect(() => {
        let timer:any  = null ;
        if (countdown > 0 && !canResend) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else {
            setCanResend(true);
        }
        return () => clearTimeout(timer);
    }, [countdown, canResend]);

    const handleChange = (e:any) => {
        setVerificationCode(e.target.value);
        setError('');
    };

    const handleResendCode = () => {
        // Reiniciar contador
        setCountdown(60);
        setCanResend(false);
        
        // En producción, aquí iría la llamada al API para reenviar código
        console.log(`Reenviando código a ${email}`);
        
        // Mostrar mensaje de confirmación
        alert(`Se ha reenviado un nuevo código a ${email}`);
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        alert(`Código de verificación: ${verificationCode}`);
        await apiService.post('users/verify_code', {
            code: verificationCode,
            email: email
        }).then((response) => {
            console.log(response);
            navigate(`${PublicRoutes.Register}`);
        }
        ).catch((error) => {
            setLoading(false);
            setError(error.data?.detail || 'Código de verificación incorrecto');
        }
        ).finally(() => {
            setLoading(false);
        });
        // Modo de desarrollo: navegar directamente al registro
    
        // Comentamos la llamada a la API para desarrollo
        /*
        try {
            // Llamada al API para verificar el código
            const response = await fetch('http://localhost:8000/api/verify-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email, 
                    verificationCode 
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Código de verificación incorrecto');
            }

            // Redirigir a la página de registro con el email verificado
            navigate(`/register?email=${encodeURIComponent(email)}`);
        } catch (error) {
            setError('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
        */
    };

    return (
        <ModalContainer>
            <div className="modal-content verification-modal">
                <div className="modal-header">
                    <h2>Verificación de Correo</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                
                <div className="modal-body">
                    <div className="verification-icon">
                        <i className="icon-email">📧</i>
                    </div>
                    
                    <p className="verification-message">
                        Hemos enviado un código de verificación a:
                        <br />
                        <strong>{email}</strong>
                    </p>
                    
                    <p className="verification-instruction">
                        Ingresa el código de 6 dígitos para continuar con tu registro.
                    </p>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="form-group code-input-group">
                            <input
                                type="text"
                                id="verificationCode"
                                name="verificationCode"
                                placeholder="Ingresa el código de verificación"
                                value={verificationCode}
                                onChange={handleChange}
                                required
                                maxLength={6}
                                className="verification-code-input"
                            />
                        </div>

                        {error && <div className="error-message">{error}</div>}
                        
                        <div className="resend-code">
                            {canResend ? (
                                <button 
                                    type="button" 
                                    className="resend-button"
                                    onClick={handleResendCode}
                                >
                                    Reenviar código
                                </button>
                            ) : (
                                <p>Reenviar código en {countdown} segundos</p>
                            )}
                        </div>
                        
                        <div className="modal-buttons">
                            <button 
                                type="button" 
                                className="cancel-button"
                                onClick={onClose}
                            >
                                Cancelar
                            </button>
                            <button 
                                type="submit" 
                                className="submit-button"
                                disabled={loading}
                            >
                                {loading ? 'Verificando...' : 'Verificar Código'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </ModalContainer>
    );
};

export default CodeVerificationModal;
