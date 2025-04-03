import styled from 'styled-components';

export const LoginContainer = styled.div`
.login-container {
    min-height: 100vh;
   
    background: linear-gradient(135deg, #78A5D5 0%, #C0C0C0 100%);
    
    gap: 2rem;
}

/* Estilos para los contenedores de imágenes */
.image-container {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 300px;
    height: 450px;
}

.side-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.side-image:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.left-image .side-image {
    transform: rotate(-3deg);
}

.right-image .side-image {
    transform: rotate(3deg);
}

.left-image .side-image:hover {
    transform: rotate(-3deg) translateY(-5px);
}

.right-image .side-image:hover {
    transform: rotate(3deg) translateY(-5px);
}

/* Ajustes responsivos para las imágenes */
@media (max-width: 1200px) {
    .image-container {
        max-width: 250px;
        height: 375px;
    }
    
    .login-container {
        gap: 1.5rem;
    }
}

@media (max-width: 992px) {
    .image-container {
        max-width: 200px;
        height: 300px;
    }
    
    .login-container {
        gap: 1rem;
    }
}

@media (max-width: 768px) {
    .image-container {
        display: none; /* Ocultamos las imágenes en pantallas pequeñas */
    }
    
    .login-box {
        max-width: 90%;
    }
}

.login-box {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 24px;
    padding: 2.5rem;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    transition: transform 0.3s ease;
}

.login-box:hover {
    transform: translateY(-5px);
}

.brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.5rem;
}

.logo {
    width: 2.5rem;
    height: 2.5rem;
    color: #6366f1;
}

.login-header {
    text-align: center;
    margin-bottom: 2rem;
}

.login-header h1 {
    color: #1a1a1a;
    font-size: 1.875rem;
    font-weight: 700;
    margin: 0;
}

.login-header p {
    color: #6b7280;
    font-size: 0.975rem;
    margin-top: 0.5rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    color: #374151;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
}

.input-wrapper {
    position: relative;
}

.input-icon {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.25rem;
    height: 1.25rem;
    color: #9ca3af;
    pointer-events: none;
}

.form-group input {
    width: 100%;
    padding: 0.75rem 1rem;
    padding-right: 2.5rem;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    font-size: 0.95rem;
    color: #1a1a1a;
    background: white;
    transition: all 0.3s ease;
}

.form-group input:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

.form-group input::placeholder {
    color: #9ca3af;
}

.login-button {
    width: 100%;
    padding: 0.875rem;
    border: none;
    border-radius: 12px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    font-size: 0.95rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.login-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px -10px rgba(99, 102, 241, 0.5);
}

.login-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.spinner {
    width: 1.25rem;
    height: 1.25rem;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.divider {
    display: flex;
    align-items: center;
    text-align: center;
    margin: 1.5rem 0;
    color: #6b7280;
    font-size: 0.875rem;
}

.divider::before,
.divider::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e5e7eb;
}

.divider span {
    padding: 0 1rem;
}

.social-login {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
}

/* Estilos para el contenedor del botón de Google */
.social-login > div {
    width: 100%;
    max-width: 280px;
}

/* Ajustes para el botón de Google renderizado */
iframe.google-button {
    width: 100% !important;
}

.social-button {
    width: 100%;
    max-width: 280px;
    padding: 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    background: white;
    color: #374151;
    font-size: 0.875rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.social-button:hover {
    background: #f9fafb;
    border-color: #d1d5db;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.error-message {
    background: #fee2e2;
    border: 1px solid #fecaca;
    border-radius: 8px;
    padding: 0.75rem;
    color: #dc2626;
    font-size: 0.875rem;
    margin-bottom: 1rem;
    text-align: center;
}

.login-footer {
    margin-top: 1.5rem;
    text-align: center;
    font-size: 0.875rem;
}

.forgot-password {
    color: #6366f1;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
}

.forgot-password:hover {
    color: #4f46e5;
    text-decoration: underline;
}

.signup-link {
    margin-top: 1rem;
    color: #6b7280;
}

.signup-link a {
    color: #6366f1;
    text-decoration: none;
    font-weight: 500;
    margin-left: 0.25rem;
}

.signup-link a:hover {
    color: #4f46e5;
    text-decoration: underline;
}

@media (max-width: 480px) {
    .login-container {
        padding: 0.5rem;
        background: linear-gradient(135deg, #78A5D5 0%, #C0C0C0 100%);
        min-height: 100vh;
        overflow-y: auto; /* Permitir scroll vertical */
    }

    .login-box {
        padding: 1.5rem;
    }

    .social-login {
        grid-template-columns: 1fr;
    }
}

/* Nuevos breakpoints responsivos */
@media (max-width: 768px) {
    .login-box {
        max-width: 90%;
        padding: 2rem;
    }

    .login-header h1 {
        font-size: 1.5rem;
    }
}

@media (max-width: 480px) {
    .login-container {
        padding: 1rem;
    }

    .login-box {
        padding: 1.25rem;
    }

    .social-login {
        grid-template-columns: 1fr;
    }

    .login-header h1 {
        font-size: 1.25rem;
    }

    .form-group input {
        padding: 0.625rem 0.875rem;
    }
}

@media (max-width: 320px) {
    .login-box {
        padding: 1rem;
    }

    .brand {
        flex-direction: column;
        gap: 0.5rem;
    }
}

/* Media Queries actualizados */
@media (max-width: 1024px) {
    .login-box {
        max-width: 80%;
    }
}

@media (max-width: 768px) {
    .login-container {
        align-items: flex-start;
        padding: 2rem 1rem;
    }
    
    .login-box {
        max-width: 100%;
        padding: 1.5rem;
        margin-top: 2rem;
    }

    .login-header h1 {
        font-size: 1.5rem;
    }

    .social-login {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 480px) {
    .login-container {
        padding: 1rem 0.5rem;
        min-height: calc(100vh - 2rem);
    }

    .login-box {
        border-radius: 16px;
        margin-top: 1rem;
    }

    .form-group input {
        font-size: 16px; /* Evita el zoom en iOS */
        padding: 0.75rem;
    }

    .brand {
        flex-direction: column;
        text-align: center;
    }

    .social-button {
        padding: 0.625rem;
    }
}

@media (max-height: 700px) {
    .login-container {
        align-items: flex-start;
    }
    
    .login-box {
        margin: 1rem 0;
    }
}

/* Media Queries actualizados con compresión de elementos */
@media (max-width: 1024px) {
    .login-box {
        max-width: 90%;
        padding: 2rem;
    }
}

@media (max-width: 768px) {
    .login-box {
        max-width: 100%;
        padding: 1.5rem;
        margin: 1rem;
        transform: none;
    }

    .login-header h1 {
        font-size: 1.25rem;
    }

    .login-header p {
        font-size: 0.875rem;
    }

    .form-group {
        margin-bottom: 1rem;
    }

    .social-login {
        grid-template-columns: 1fr;
    }

    .social-button {
        padding: 0.5rem;
        font-size: 0.8rem;
    }

    .logo {
        width: 2rem;
        height: 2rem;
    }
}

@media (max-width: 480px) {
    .login-container {
        padding: 0.5rem;
        background: linear-gradient(135deg, #78A5D5 0%, #C0C0C0 100%);
        min-height: 100vh;
        overflow-y: auto; /* Permitir scroll vertical */
    }

    .login-box {
        margin: 1rem 0;
        min-height: auto; /* Cambiar de 100vh a auto */
        box-shadow: none;
        max-height: none; /* Asegurar que no hay límite de altura */
    }

    .brand {
        margin-bottom: 1rem;
    }

    .login-header {
        margin-bottom: 1.5rem;
    }

    .form-group label {
        font-size: 0.8rem;
    }

    .form-group input {
        padding: 0.5rem 0.75rem;
        font-size: 0.9rem;
    }

    .login-button {
        padding: 0.625rem;
        font-size: 0.9rem;
    }

    .divider {
        margin: 1rem 0;
        font-size: 0.8rem;
    }

    .login-footer {
        margin-top: 1rem;
        font-size: 0.8rem;
    }
}

/* Estilos para el botón de mostrar/ocultar contraseña */
.password-toggle {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(99, 102, 241, 0.1);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 0.9rem;
    padding: 0;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease;
}

.password-toggle:hover {
    background-color: rgba(99, 102, 241, 0.2);
}

.password-toggle:focus {
    outline: none;
}

.password-toggle .input-icon {
    width: 1.25rem;
    height: 1.25rem;
    position: static;
    transform: none;
    pointer-events: none;
}

/* Ocultamos completamente el icono del candado */
.lock-icon {
    display: none;
}

/* Ajustamos el padding para dejar espacio al botón */
.form-group input[type="password"],
.form-group input[type="text"] {
    padding-right: 40px; /* Espacio adicional a la derecha para el botón */
}

/* Añadimos un estilo para cuando el cursor esté sobre el botón */
.password-toggle:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

/* Animación sutil al hacer clic */
.password-toggle:active {
    transform: translateY(-50%) scale(0.95);
}

.captcha-container {
  margin: 15px 0;
  display: flex;
  justify-content: center;
}
}`;

