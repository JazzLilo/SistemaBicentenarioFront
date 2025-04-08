import { useState, useEffect } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import { apiService } from '@/services/apiService';
import axios from 'axios';
import './style.css'
import { PrivateRoutes } from '@/routes/routes';
const Register = () => {
    const navigate = useNavigate();
    const emailFromQuery = localStorage.getItem('email');
    // Estado para países y ciudades
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState<any>([]);
    const [countrySearchTerm, setCountrySearchTerm] = useState('');
    const [citySearchTerm, setCitySearchTerm] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const [showCityDropdown, setShowCityDropdown] = useState(false);
    const [loadingCities, setLoadingCities] = useState(false);
    
    const [formData, setFormData] = useState({
        fullName: '',
        email: emailFromQuery || '',
        password: '',
        confirmPassword: '',
        phone: '',
        gender: '',
        country: '',
        countryName: '', // Nombre mostrado del país seleccionado
        city: '',
        cityName: '', // Nombre mostrado de la ciudad seleccionada
        code: '' // Este es el código de verificación que requiere tu backend
    });
    
    const [loading, setLoading] = useState(false);
    const [, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        hasCaps: false,
        hasLower: false,
        hasNumber: false,
        hasSpecial: false,
        hasMinLength: false,
        message: '',
        color: ''
    });
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    // Cargar la lista de países al iniciar
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://countriesnow.space/api/v0.1/countries');
                if (response.data && response.data.data && Array.isArray(response.data.data)) {
                    // Transformar los datos para que tengan el formato esperado
                    const formattedCountries = response.data.data.map((country:any, index:any) => ({
                        code: country.iso2 || `country-${index}`, // Usar ISO si está disponible o generar un código
                        name: country.country
                    }));
                    setCountries(formattedCountries);
                    setFilteredCountries(formattedCountries);
                }
            } catch (error) {
                console.error("Error al cargar países:", error);
                setError("No se pudieron cargar los países. Por favor, intente más tarde.");
            }
        };

        fetchCountries();
    }, []);

    useEffect(() => {
        // Si no hay email o código en la URL, redirigir a la página de verificación
       
    }, []);

    // Filtrar países cuando cambie el término de búsqueda
    useEffect(() => {
        if (countrySearchTerm) {
            const filtered : any = countries.filter((country:any) => 
                country.name.toLowerCase().includes(countrySearchTerm.toLowerCase())
            );
            setFilteredCountries(filtered);
        } else {
            setFilteredCountries(countries);
        }
    }, [countrySearchTerm, countries]);

    // Filtrar ciudades cuando cambie el término de búsqueda
    useEffect(() => {
        if (citySearchTerm && cities.length > 0) {
            const filtered = cities.filter((city:any) => 
                city.toLowerCase().includes(citySearchTerm.toLowerCase())
            );
            setFilteredCities(filtered);
        } else {
            setFilteredCities(cities);
        }
    }, [citySearchTerm, cities]);

    // Cargar ciudades cuando cambie el país seleccionado
    useEffect(() => {
        const fetchCities = async () => {
            if (formData.countryName) {
                setLoadingCities(true);
                try {
                    const response = await axios.post(
                        'https://countriesnow.space/api/v0.1/countries/cities',
                        { country: formData.countryName }
                    );
                    
                    if (response.data && response.data.data && Array.isArray(response.data.data)) {
                        setCities(response.data.data);
                        setFilteredCities(response.data.data);
                    } else {
                        setCities([]);
                        setFilteredCities([]);
                    }
                } catch (error) {
                    console.error("Error al cargar ciudades:", error);
                    setCities([]);
                    setFilteredCities([]);
                } finally {
                    setLoadingCities(false);
                }
                
                // Si el país seleccionado cambia, limpiar la ciudad seleccionada
                if (formData.city) {
                    setFormData(prev => ({
                        ...prev,
                        city: '',
                        cityName: ''
                    }));
                }
            }
        };

        if (formData.countryName) {
            fetchCities();
        } else {
            setCities([]);
            setFilteredCities([]);
        }
    }, [formData.countryName]);

    // Evaluar la fortaleza de la contraseña
    useEffect(() => {
        if (!formData.password) {
            setPasswordStrength({
                score: 0,
                hasCaps: false,
                hasLower: false,
                hasNumber: false,
                hasSpecial: false,
                hasMinLength: false,
                message: '',
                color: ''
            });
            return;
        }

        const hasCaps = /[A-Z]/.test(formData.password);
        const hasLower = /[a-z]/.test(formData.password);
        const hasNumber = /[0-9]/.test(formData.password);
        const hasSpecial = /[^A-Za-z0-9]/.test(formData.password);
        const hasMinLength = formData.password.length >= 8;

        let score = 0;
        if (hasCaps) score += 1;
        if (hasLower) score += 1;
        if (hasNumber) score += 1;
        if (hasSpecial) score += 1;
        if (hasMinLength) score += 1;

        let message = '';
        let color = '';

        if (score === 0) {
            message = 'Muy débil';
            color = '#ff4d4d';
        } else if (score === 1) {
            message = 'Débil';
            color = '#ff4d4d';
        } else if (score === 2) {
            message = 'Regular';
            color = '#ffa64d';
        } else if (score === 3) {
            message = 'Buena';
            color = '#ffff4d';
        } else if (score === 4) {
            message = 'Fuerte';
            color = '#4dff4d';
        } else {
            message = 'Muy fuerte';
            color = '#4dff4d';
        }

        setPasswordStrength({
            score,
            hasCaps,
            hasLower,
            hasNumber,
            hasSpecial,
            hasMinLength,
            message,
            color
        });
    }, [formData.password]);

    // Verificar si las contraseñas coinciden en tiempo real
    useEffect(() => {
        if (formData.confirmPassword) {
            setPasswordsMatch(formData.password === formData.confirmPassword);
        } else {
            setPasswordsMatch(true);
        }
    }, [formData.password, formData.confirmPassword]);

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setError('');
    };

    const handleCountrySearch = (e:any) => {
        setCountrySearchTerm(e.target.value);
        // Mostrar el dropdown cuando se comienza a escribir
        setShowCountryDropdown(true);
    };

    const handleCitySearch = (e:any) => {
        setCitySearchTerm(e.target.value);
        // Mostrar el dropdown cuando se comienza a escribir
        setShowCityDropdown(true);
    };

    const selectCountry = (code:any, name:any) => {
        setFormData({
            ...formData,
            country: code,
            countryName: name,
            city: '',
            cityName: ''
        });
        setCountrySearchTerm('');
        setShowCountryDropdown(false);
    };

    const selectCity = (cityName:any) => {
        setFormData({
            ...formData,
            city: cityName, // La ciudad ahora se guarda directamente por nombre
            cityName: cityName
        });
        setCitySearchTerm('');
        setShowCityDropdown(false);
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            setLoading(false);
            return;
        }

        if (!formData.country || !formData.city) {
            setError('Por favor selecciona un país y una ciudad');
            setLoading(false);
            return;
        }

        // Validar formato de teléfono
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        if (!phoneRegex.test(formData.phone)) {
            setError('El formato del teléfono es incorrecto. Debe contener de 6-14 dígitos');
            setLoading(false);
            return;
        }

       
            // Mapear los valores del género al formato esperado por el backend
            const genderMapping = {
                'male': 'M',
                'female': 'F',
                'prefer_not_to_say': 'Other'
            } as any;

            // Usar el servicio correcto para completar el registro
            const registerData = {
                email: formData.email,
                code: formData.code,
                fullName: formData.fullName,
                password: formData.password,
                phone: formData.phone,
                gender: genderMapping[formData.gender] || 'Other' , // Convertir al formato esperado
                country: formData.countryName, // Enviar el nombre del país en lugar del código
                city: formData.cityName // Enviar el nombre de la ciudad
            };
          
            console.log("Datos de registro:", registerData); // Para depuración
            
            await apiService.post('users',{
                nombre :formData.fullName.split(' ')[0],
                apellidoPaterno : formData.fullName.split(' ')[1] || '' ,
                apellidoMaterno : formData.fullName.split(' ')[2] || '',
                correo : formData.email,
                telefono : formData.phone,
                pais : formData.countryName,
                ciudad : formData.cityName,
                genero: formData.gender,
                imagen : '',
                contrasena : formData.password,
            }).then((response) => {
                console.log(response);
                // Redirigir al usuario a la página de inicio de sesión o donde sea necesario
                localStorage.setItem('user', JSON.stringify({
                    correo: formData.email,
                    nombre: formData.fullName.split(' ')[0],
                }));
                navigate(`${PrivateRoutes.Dashboard}`);
            }
            ).catch((error) => {
                console.error("Error al registrar usuario:", error);
                setError(error.data?.detail || 'Error al registrar usuario. Por favor, inténtelo más tarde.');
            });
            
        
            
            setLoading(false);
        
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <>
           <div className='register-container'>
           <div className="register-box">
                <div className="register-header responsive-header">
                    <h1>Crear Cuenta</h1>
                    <p>Completa los datos para registrarte</p>
                </div>
                
                <div className="form-container-with-scroll">
                    <form onSubmit={handleSubmit} className="register-form responsive-form">
                        <div className="form-group">
                            <label htmlFor="fullName">Nombre completo</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                placeholder="Ingresa tu nombre completo"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                autoComplete="name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Correo electrónico</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="ejemplo@correo.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                autoComplete="email"
                                readOnly={!!emailFromQuery} // Email será de solo lectura si viene verificado
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <div className="password-input-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    placeholder="Crea una contraseña segura"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    autoComplete="new-password"
                                    minLength={8}
                                    className={formData.password ? (passwordStrength.score >= 3 ? "valid-input" : "invalid-input") : ""}
                                />
                                <button 
                                    type="button" 
                                    className="toggle-password"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? 
                                        <span className="eye-icon">👁️</span> : 
                                        <span className="eye-icon">👁️‍🗨️</span>
                                    }
                                </button>
                            </div>
                            {formData.password && (
                                <div className="password-strength-container">
                                    <div className="password-strength-meter">
                                        <div 
                                            className="password-strength-meter-bar" 
                                            style={{ 
                                                width: `${(passwordStrength.score / 5) * 100}%`,
                                                backgroundColor: passwordStrength.color
                                            }}
                                        ></div>
                                    </div>
                                    <div className="password-strength-text" style={{ color: passwordStrength.color }}>
                                        {passwordStrength.message}
                                    </div>
                                    <div className="password-requirements">
                                        <p>La contraseña debe tener:</p>
                                        <ul>
                                            <li className={passwordStrength.hasMinLength ? "requirement-met" : "requirement-not-met"}>
                                                Mínimo 8 caracteres
                                            </li>
                                            <li className={passwordStrength.hasCaps ? "requirement-met" : "requirement-not-met"}>
                                                Al menos una mayúscula
                                            </li>
                                            <li className={passwordStrength.hasLower ? "requirement-met" : "requirement-not-met"}>
                                                Al menos una minúscula
                                            </li>
                                            <li className={passwordStrength.hasNumber ? "requirement-met" : "requirement-not-met"}>
                                                Al menos un número
                                            </li>
                                            <li className={passwordStrength.hasSpecial ? "requirement-met" : "requirement-not-met"}>
                                                Al menos un símbolo especial
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirmar contraseña</label>
                            <div className="password-input-container">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Repite tu contraseña"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    autoComplete="new-password"
                                    className={formData.confirmPassword ? (passwordsMatch ? "valid-input" : "invalid-input") : ""}
                                />
                                <button 
                                    type="button" 
                                    className="toggle-password"
                                    onClick={toggleConfirmPasswordVisibility}
                                >
                                    {showConfirmPassword ? 
                                        <span className="eye-icon">👁️</span> : 
                                        <span className="eye-icon">👁️‍🗨️</span>
                                    }
                                </button>
                            </div>
                            {formData.confirmPassword && !passwordsMatch && (
                                <div className="password-match-error">
                                    Las contraseñas no coinciden
                                </div>
                            )}
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="phone">Teléfono/Celular</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="Ingrese su número"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                autoComplete="tel"
                            />
                            <small className="form-hint">Ingrese su número</small>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="gender">Género</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="male">Masculino</option>
                                <option value="female">Femenino</option>
                                <option value="prefer_not_to_say">Prefiero no decirlo</option>
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="country">País</label>
                            <div className="dropdown-container">
                                <input
                                    type="text"
                                    id="country"
                                    placeholder="Buscar país"
                                    value={formData.countryName || countrySearchTerm}
                                    onChange={handleCountrySearch}
                                    onFocus={() => setShowCountryDropdown(true)}
                                    autoComplete="off"
                                    className={formData.countryName ? "selected-value" : ""}
                                />
                                {showCountryDropdown && (
                                    <div className="dropdown-list">
                                        {filteredCountries.length > 0 ? (
                                            filteredCountries.map((country: any) => (
                                                <div 
                                                    key={country.code} 
                                                    className="dropdown-item"
                                                    onClick={() => selectCountry(country.code, country.name)}
                                                >
                                                    {country.name}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="dropdown-item no-results">No se encontraron países</div>
                                        )}
                                    </div>
                                )}
                                {formData.countryName && (
                                    <button 
                                        type="button" 
                                        className="clear-selection"
                                        onClick={() => {
                                            setFormData({
                                                ...formData,
                                                country: '',
                                                countryName: '',
                                                city: '',
                                                cityName: ''
                                            });
                                            setCountrySearchTerm('');
                                        }}
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="city">Ciudad</label>
                            <div className="dropdown-container">
                                <input
                                    type="text"
                                    id="city"
                                    placeholder={formData.country ? (loadingCities ? "Cargando ciudades..." : "Buscar ciudad") : "Primero selecciona un país"}
                                    value={formData.cityName || citySearchTerm}
                                    onChange={handleCitySearch}
                                    onFocus={() => setShowCityDropdown(true)}
                                    disabled={!formData.country || loadingCities}
                                    autoComplete="off"
                                    className={formData.cityName ? "selected-value" : ""}
                                />
                                {showCityDropdown && formData.country && (
                                    <div className="dropdown-list">
                                        {loadingCities ? (
                                            <div className="dropdown-item loading">Cargando ciudades...</div>
                                        ) : filteredCities.length > 0 ? (
                                            filteredCities.map((city, index) => (
                                                <div 
                                                    key={`city-${index}`}
                                                    className="dropdown-item"
                                                    onClick={() => selectCity(city)}
                                                >
                                                    {city}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="dropdown-item no-results">
                                                {cities.length === 0 
                                                    ? "No hay ciudades disponibles para este país" 
                                                    : "No se encontraron ciudades"}
                                            </div>
                                        )}
                                    </div>
                                )}
                                {formData.cityName && (
                                    <button 
                                        type="button" 
                                        className="clear-selection"
                                        onClick={() => {
                                            setFormData({
                                                ...formData,
                                                city: '',
                                                cityName: ''
                                            });
                                            setCitySearchTerm('');
                                        }}
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                        </div>

                    
                        <button 
                            type="submit" 
                            className="register-button"
                            disabled={loading}
                        >
                            {loading ? 'Registrando...' : 'Crear cuenta'}
                        </button>

                        <div className="divider">
                            <span>o</span>
                        </div>
                    </form>
                </div>
                
                <div className="register-footer">
                    <p>¿Ya tienes una cuenta? <Link to="/">Iniciar sesión</Link></p>
                </div>
            </div>
           </div>
        </>
    );
};

export default Register;