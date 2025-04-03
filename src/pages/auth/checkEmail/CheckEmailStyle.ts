import styled from "styled-components";

export const CheckEmailContainer = styled.div`
.check-email-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #78A5D5 0%, #C0C0C0 100%);
  padding: 20px;
}

.check-email-box {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 30px;
  width: 100%;
  max-width: 480px;
  transition: transform 0.3s ease;
}

.check-email-box:hover {
  transform: translateY(-5px);
}

.check-email-header {
  text-align: center;
  margin-bottom: 30px;
}

.check-email-header h1 {
  font-size: 1.8rem;
  color: #1a1a1a;
  margin-bottom: 10px;
}

.check-email-header p {
  color: #6b7280;
  font-size: 0.95rem;
}

.check-email-form {
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
  transition: all 0.3s ease;
  color: #1a1a1a;
}

.form-group input:focus {
  border-color: #6366f1;
  outline: none;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

.primary-button, 
.secondary-button {
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.primary-button {
  background: linear-gradient(135deg, #78A5D5, #5d8bb3);
  color: white;
}

.primary-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px -10px rgba(99, 102, 241, 0.5);
}

.secondary-button {
  background-color: transparent;
  color: #6366f1;
  margin-top: -10px;
}

.secondary-button:hover {
  background-color: rgba(99, 102, 241, 0.1);
}

.primary-button:disabled,
.secondary-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
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

.check-email-footer {
  margin-top: 30px;
  text-align: center;
}

.check-email-footer a {
  color: #6366f1;
  text-decoration: none;
  font-weight: 500;
}

.check-email-footer a:hover {
  color: #4f46e5;
  text-decoration: underline;
}

@media (max-width: 600px) {
  .check-email-box {
    padding: 20px;
  }
  
  .check-email-header h1 {
    font-size: 1.5rem;
  }
}
`;