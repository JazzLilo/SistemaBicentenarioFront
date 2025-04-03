import styled from "styled-components";

export const ForgotPasswordContainer = styled.div`
.forgot-password-container {
  background: linear-gradient(135deg, #78A5D5 0%, #C0C0C0 100%);
  padding: 20px;
}

.forgot-password-box {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 30px;
  width: 100%;
  max-width: 480px;
  transition: transform 0.3s ease;
}

.forgot-password-box:hover {
  transform: translateY(-5px);
}

.forgot-password-header {
  text-align: center;
  margin-bottom: 30px;
}

.forgot-password-header h1 {
  font-size: 1.8rem;
  color: #1a1a1a;
  margin-bottom: 10px;
}

.forgot-password-header p {
  color: #6b7280;
  font-size: 0.95rem;
}

.forgot-password-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-weight: 500;
  font-size: 0.9rem;
  color: #444;
}

.form-group input {
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  color: #1a1a1a;
  transition: all 0.3s ease;
}

.form-group input:focus {
  border-color: #6366f1;
  outline: none;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

.send-code-button,
.verify-code-button,
.resend-code-button,
.reset-password-button {
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #78A5D5, #5d8bb3);
  color: white;
}

.send-code-button:hover:not(:disabled),
.verify-code-button:hover:not(:disabled),
.reset-password-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px -10px rgba(99, 102, 241, 0.5);
}

.send-code-button:disabled,
.verify-code-button:disabled,
.reset-password-button:disabled,
.resend-code-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.resend-code-button {
  background-color: transparent;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: -10px;
}

.resend-code-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.error-message {
  background-color: #fee2e2;
  border: 1px solid #fecaca;
  padding: 10px;
  border-radius: 8px;
  color: #dc2626;
  font-size: 0.9rem;
  margin-bottom: 20px;
}

.forgot-password-footer {
  margin-top: 30px;
  text-align: center;
}

.forgot-password-footer a {
  color: #6366f1;
  text-decoration: none;
  font-weight: 500;
}

.forgot-password-footer a:hover {
  color: #4f46e5;
  text-decoration: underline;
}

@media (max-width: 600px) {
  .forgot-password-box {
    padding: 20px;
  }
  
  .forgot-password-header h1 {
    font-size: 1.5rem;
  }
}

.password-input-container {
  position: relative;
  display: flex;
  width: 100%;
}

.password-input-container input {
  width: 100%;
  padding-right: 40px; /* Espacio adicional a la derecha para el botón */
}

.toggle-password-btn {
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

.toggle-password-btn:hover {
  background-color: rgba(99, 102, 241, 0.2);
}

.toggle-password-btn:focus {
  outline: none;
}
`;