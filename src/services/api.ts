const API_URL = 'http://localhost:8000';

// Función para realizar peticiones a la API
async function apiRequest(endpoint, method = 'GET', data = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  // Añadir el token de autenticación si existe
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (user && user.id) {
    // Puedes usar el ID del usuario para validación adicional si es necesario
    // O añadir un token de autenticación si tu backend lo implementa en el futuro
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    const responseData = await response.json();

    if (!response.ok) {
      // Manejo más específico de errores
      if (response.status === 401) {
        // Limpiar datos de usuario si no está autorizado
        localStorage.removeItem('user');
        window.location.href = '/';
      }
      throw new Error(responseData.detail || 'Ha ocurrido un error');
    }

    return responseData;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

// Funciones específicas para autenticación
export const authService = {
  login: async (email, password, captcha) => {
    return apiRequest('/api/login', 'POST', { email, password });
  },
  
  // Funciones de registro actualizadas según las rutas del backend
  sendVerificationCode: async (email) => {
    return apiRequest('/api/register/send-code', 'POST', { email });
  },
  
  verifyCode: async (email, code) => {
    return apiRequest('/api/register/verify-code', 'POST', { email, code });
  },
  
  completeRegister: async (userData) => {
    return apiRequest('/api/register/complete', 'POST', userData);
  },
  
  // Funciones para recuperación de contraseña
  forgotPassword: async (email) => {
    return apiRequest('/api/forgot-password', 'POST', { email });
  },
  
  verifyResetCode: async (email, code) => {
    return apiRequest('/api/verify-reset-code', 'POST', { email, code });
  },
  
  resetPassword: async (email, code, new_password) => {
    return apiRequest('/api/reset-password', 'POST', { 
      email, 
      code, 
      new_password 
    });
  }
};

export default apiRequest;
