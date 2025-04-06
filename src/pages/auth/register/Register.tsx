import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RegisterContainer } from './RegisterStyle';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { apiService } from '@/services/apiService';
import { PublicRoutes } from '@/routes/routes';
interface Country {
    code: string;
    name: string;
}

interface FormData {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    gender: string;
    country: string;
    countryName: string;
    city: string;
    cityName: string;
    code: string;
}

const Register = () => {
    const navigate = useNavigate();
    const email = localStorage.getItem('email');

    const [formData, setFormData] = useState<FormData>({
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        email: email || '',
        password: '',
        confirmPassword: '',
        phone: '',
        gender: '',
        country: '',
        countryName: '',
        city: '',
        cityName: '',
        code: ''
    });

    const [countries, setCountries] = useState<Country[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [loading, setLoading] = useState({
        countries: false,
        cities: false,
        form: false
    });
    const [error, setError] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState({
        password: false,
        confirmPassword: false
    });
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        requirements: {
            length: false,
            uppercase: false,
            lowercase: false,
            number: false,
            special: false
        }
    });
    const [countrySearchTerm, setCountrySearchTerm] = useState('');
    const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

    useEffect(() => {
        if (countrySearchTerm) {
            setFilteredCountries(
                countries.filter(country =>
                    country.name.toLowerCase().includes(countrySearchTerm.toLowerCase())
                )
            );
        } else {
            setFilteredCountries(countries);
        }
    }, [countrySearchTerm, countries]);

    const [citySearchTerm, setCitySearchTerm] = useState('');
    const [filteredCities, setFilteredCities] = useState<string[]>([]);

    useEffect(() => {
        if (citySearchTerm) {
            setFilteredCities(
                cities.filter(city =>
                    city.toLowerCase().includes(citySearchTerm.toLowerCase())
                )
            );
        } else {
            setFilteredCities(cities);
        }
    }, [citySearchTerm, cities]);


    const fetchCountries = useCallback(async () => {
        setLoading(prev => ({ ...prev, countries: true }));
        try {
            const response = await axios.get('https://countriesnow.space/api/v0.1/countries');
            if (response.data?.data) {
                const formattedCountries = response.data.data.map((country: any) => ({
                    code: country.iso2 || country.country,
                    name: country.country
                }));
                setCountries(formattedCountries);
            }
        } catch (error) {
            console.error("Error loading countries:", error);
            setError("No se pudieron cargar los países. Intente más tarde.");
        } finally {
            setLoading(prev => ({ ...prev, countries: false }));
        }
    }, []);

    const fetchCities = useCallback(async (countryName: string) => {
        if (!countryName) return;

        setLoading(prev => ({ ...prev, cities: true }));
        try {
            const response = await axios.post(
                'https://countriesnow.space/api/v0.1/countries/cities',
                { country: countryName }
            );
            setCities(response.data?.data || []);
        } catch (error) {
            console.error("Error loading cities:", error);
            setCities([]);
        } finally {
            setLoading(prev => ({ ...prev, cities: false }));
        }
    }, []);

    useEffect(() => {
        fetchCountries();
    }, [fetchCountries]);

    useEffect(() => {
        if (formData.countryName) {
            fetchCities(formData.countryName);
        }
    }, [formData.countryName, fetchCities]);

    useEffect(() => {
        const { password } = formData;
        if (!password) {
            setPasswordStrength({
                score: 0,
                requirements: {
                    length: false,
                    uppercase: false,
                    lowercase: false,
                    number: false,
                    special: false
                }
            });
            return;
        }

        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[^A-Za-z0-9]/.test(password)
        };

        const score = Object.values(requirements).filter(Boolean).length;

        setPasswordStrength({
            score,
            requirements
        });
    }, [formData.password]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleCountrySelect = (country: Country) => {
        setFormData(prev => ({
            ...prev,
            country: country.code,
            countryName: country.name,
            city: '',
            cityName: ''
        }));
        setCountrySearchTerm(''); 
    };

    const handleCitySelect = (city: string) => {
        setFormData(prev => ({
            ...prev,
            city,
            cityName: city
        }));
        setCitySearchTerm(''); 
    };

    const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
        setPasswordVisibility(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(prev => ({ ...prev, form: true }));
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            setLoading(prev => ({ ...prev, form: false }));
            return;
        }

        if (!formData.country || !formData.city) {
            setError('Por favor selecciona un país y una ciudad');
            setLoading(prev => ({ ...prev, form: false }));
            return;
        }

        try {
            const registerData = {
                nombre: formData.nombre,
                apellidoPaterno: formData.apellidoPaterno,
                apellidoMaterno: formData.apellidoMaterno,
                correo: formData.email,
                contrasena: formData.password,
                telefono: formData.phone,
                genero: formData.gender,
                pais: formData.countryName,
                ciudad: formData.cityName,
                imagen: "strgin"
            };

            apiService.post('users/', registerData)
                .then((response) => {
                    if (response.success) {
                        navigate(PublicRoutes.VerifyCode);
                    }
                }
            );

            
        } catch (err: any) {
            console.error("Registration error:", err);
            setError(err.response?.data?.detail || err.message || 'Error al registrar. Verifica tus datos.');
        } finally {
            setLoading(prev => ({ ...prev, form: false }));
        }
    };

    // Renderizado optimizado
    const renderPasswordStrength = () => {
        const strengthColors = ['#ff4d4d', '#ff4d4d', '#ffa64d', '#4dff4d', '#4dff4d'];
        const strengthMessages = ['Muy débil', 'Débil', 'Regular', 'Fuerte', 'Muy fuerte'];

        return (
            <div className="password-strength">
                <div className="strength-meter">
                    <div
                        className="meter-bar"
                        style={{
                            width: `${(passwordStrength.score / 5) * 100}%`,
                            backgroundColor: strengthColors[passwordStrength.score]
                        }}
                    />
                </div>
                <div className="strength-message" style={{ color: strengthColors[passwordStrength.score] }}>
                    {strengthMessages[passwordStrength.score]}
                </div>
                <div className="password-requirements">
                    <ul>
                        {Object.entries(passwordStrength.requirements).map(([key, met]) => (
                            <li key={key} className={met ? 'met' : 'not-met'}>
                                {key === 'length' && 'Mínimo 8 caracteres'}
                                {key === 'uppercase' && 'Al menos una mayúscula'}
                                {key === 'lowercase' && 'Al menos una minúscula'}
                                {key === 'number' && 'Al menos un número'}
                                {key === 'special' && 'Al menos un símbolo especial'}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    };

    return (
        <RegisterContainer>
            <div className="register-wrapper">
                <div className="register-box">
                    <div className="register-header">
                        <h1>Crear Cuenta</h1>
                        <p>Completa tus datos para registrarte</p>
                    </div>

                    <form onSubmit={handleSubmit} className="register-form">
                        <div className="form-grid">
                            {/* Nombre y Apellidos */}
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="apellidoPaterno">Apellido Paterno</label>
                                <input
                                    type="text"
                                    id="apellidoPaterno"
                                    name="apellidoPaterno"
                                    value={formData.apellidoPaterno}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="apellidoMaterno">Apellido Materno</label>
                                <input
                                    type="text"
                                    id="apellidoMaterno"
                                    name="apellidoMaterno"
                                    value={formData.apellidoMaterno}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Email y Contraseñas */}
                            <div className="form-group">
                                <label htmlFor="email">Correo electrónico</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    readOnly={!!email}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <div className="password-input">
                                    <input
                                        type={passwordVisibility.password ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => togglePasswordVisibility('password')}
                                    >
                                        {passwordVisibility.password ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                </div>
                                {formData.password && renderPasswordStrength()}
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                                <div className="password-input">
                                    <input
                                        type={passwordVisibility.confirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => togglePasswordVisibility('confirmPassword')}
                                    >
                                        {passwordVisibility.confirmPassword ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                </div>
                            </div>

                            {/* Información adicional */}
                            <div className="form-group">
                                <label htmlFor="phone">Teléfono</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
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
                                    <option value="">Selecciona...</option>
                                    <option value="male">Masculino</option>
                                    <option value="female">Femenino</option>
                                    <option value="other">Otro</option>
                                </select>
                            </div>

                            {/* País y Ciudad */}
                            <div className="form-group">
                                <label htmlFor="country">País</label>
                                <Select                                                                    
                                    value={formData.country}
                                    onValueChange={(value) => {
                                        const selectedCountry = countries.find(c => c.code === value);
                                        if (selectedCountry) {
                                            handleCountrySelect(selectedCountry);
                                        }
                                    }}
                                >
                                    <SelectTrigger className='w-full p-[0.75rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
                                        <SelectValue placeholder="Selecciona un país" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {/* Campo de búsqueda */}
                                        <div className="px-2 pb-2">
                                            <Input
                                                placeholder="Buscar país..."
                                                value={countrySearchTerm}
                                                onChange={(e) => setCountrySearchTerm(e.target.value)}
                                                className="w-full"
                                            />
                                        </div>

                                        {/* Lista de países filtrados */}
                                        {filteredCountries.length > 0 ? (
                                            filteredCountries.map((country) => (
                                                <SelectItem key={country.code} value={country.code}>
                                                    {country.name}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <div className="px-2 py-2 text-sm text-center text-gray-500">
                                                No se encontraron países
                                            </div>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="city">Ciudad</label>
                                <Select
                                    value={formData.city}
                                    onValueChange={(value) => handleCitySelect(value)}
                                    disabled={!formData.country || loading.cities}
                                >
                                    <SelectTrigger className='w-full  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
                                        <SelectValue placeholder={
                                            formData.country ?
                                                (loading.cities ? "Cargando ciudades..." : "Selecciona una ciudad")
                                                : "Primero selecciona un país"
                                        } />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {/* Campo de búsqueda */}
                                        <div className="px-2 pb-2">
                                            <Input
                                                placeholder="Buscar ciudad..."
                                                value={citySearchTerm}
                                                onChange={(e) => setCitySearchTerm(e.target.value)}
                                                className="w-full"
                                            />
                                        </div>

                                        {/* Lista de ciudades filtradas */}
                                        {loading.cities ? (
                                            <div className="px-2 py-2 text-sm text-center text-gray-500">
                                                Cargando ciudades...
                                            </div>
                                        ) : filteredCities.length > 0 ? (
                                            filteredCities.map((city) => (
                                                <SelectItem key={city} value={city}>
                                                    {city}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <div className="px-2 py-2 text-sm text-center text-gray-500">
                                                {cities.length === 0
                                                    ? "No hay ciudades disponibles para este país"
                                                    : "No se encontraron resultados"}
                                            </div>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>

                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <button
                            type="submit"
                            className="submit-button"
                            disabled={loading.form}
                        >
                            {loading.form ? 'Registrando...' : 'Crear Cuenta'}
                        </button>
                    </form>

                    <div className="register-footer">
                        <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
                    </div>
                </div>
            </div>
        </RegisterContainer>
    );
};

export default Register;