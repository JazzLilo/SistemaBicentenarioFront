import styled from 'styled-components';

export const RegisterContainer = styled.div`
  .register-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 1.5rem;
}
  .register-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #3b82f6, #9ca3af);
    padding: 2rem;
  }

  .register-box {
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 800px;
    padding: 2rem;
  }

  .register-header {
    text-align: center;
    margin-bottom: 2rem;
    
    h1 {
      font-size: 1.5rem;
      font-weight: bold;
      color: #1f2937;
    }
    
    p {
      color: #6b7280;
    }
  }

  .register-form {
    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }

    .form-group {
      margin-bottom: 1rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: #374151;
      }

      input, select {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #d1d5db;
        border-radius: 0.375rem;
        font-size: 1rem;
        transition: border-color 0.2s;

        &:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px #bfdbfe;
        }

        &:disabled {
          background-color: #f3f4f6;
          cursor: not-allowed;
        }
      }

      .password-input {
        position: relative;

        input {
          padding-right: 2.5rem;
        }

        button {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
        }
      }
    }

    .password-strength {
      margin-top: 0.5rem;

      .strength-meter {
        height: 0.25rem;
        background-color: #e5e7eb;
        border-radius: 0.125rem;
        overflow: hidden;
        margin-bottom: 0.25rem;

        .meter-bar {
          height: 100%;
          transition: width 0.3s, background-color 0.3s;
        }
      }

      .strength-message {
        font-size: 0.75rem;
        text-align: right;
      }

      .password-requirements {
        margin-top: 0.5rem;

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          font-size: 0.75rem;

          li {
            margin-bottom: 0.25rem;
            display: flex;
            align-items: center;

            &::before {
              content: '•';
              margin-right: 0.5rem;
            }

            &.met {
              color: #10b981;

              &::before {
                content: '✓';
              }
            }

            &.not-met {
              color: #6b7280;
            }
          }
        }
      }
    }
  }

  .error-message {
    color: #ef4444;
    background-color: #fee2e2;
    padding: 0.75rem;
    border-radius: 0.375rem;
    margin: 1rem 0;
    font-size: 0.875rem;
  }

  .submit-button {
    width: 100%;
    background-color: #3b82f6;
    color: white;
    padding: 0.75rem;
    border: none;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    margin-top: 1rem;
    transition: background-color 0.2s;

    &:hover {
      background-color: #2563eb;
    }

    &:disabled {
      background-color: #bfdbfe;
      cursor: not-allowed;
    }
  }

  .register-footer {
    text-align: center;
    margin-top: 1.5rem;
    color: #6b7280;
    font-size: 0.875rem;

    a {
      color: #3b82f6;
      text-decoration: none;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  /* En tu archivo RegisterStyle.ts */
.dropdown-select {
  position: relative;
}

.select-search-input {
  margin-bottom: 8px;
  padding: 8px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.select-no-results {
  padding: 8px;
  text-align: center;
  color: #666;
}
 
.select-trigger {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.select-content {
  width: var(--radix-select-trigger-width);
  max-height: var(--radix-select-content-available-height);
}
`;