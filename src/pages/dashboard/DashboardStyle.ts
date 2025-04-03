import styled from "styled-components";

export const DashboardContainer = styled.div`
.dashboard {
    display: flex;
    min-height: 100vh;
    background-color: #f8fafc;
}

.dashboard-container {
    padding: 2rem;
    background: linear-gradient(135deg, #78A5D5 0%, #C0C0C0 100%);
    min-height: 100vh;
}

/* Sidebar */
.sidebar {
    width: 280px;
    background: white;
    border-right: 1px solid #e2e8f0;
    position: fixed;
    height: 100vh;
    overflow-y: auto;
    transition: transform 0.3s ease-in-out;
    z-index: 50;
    -webkit-overflow-scrolling: touch; /* Para mejor scroll en iOS */
}

.sidebar-header {
    padding: 1.5rem;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #1e293b;
}

.logo h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
}

.close-sidebar-btn {
    display: none; /* Ocultamos el botón por defecto */
    background: transparent;
    border: none;
    color: #64748b;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
}

.close-sidebar-btn:hover {
    background: #f1f5f9;
    color: #1e293b;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1.5rem;
    color: #64748b;
    width: 100%;
    border: none;
    background: none;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
    font-size: 0.875rem;
}

.nav-item:hover {
    background: #f8fafc;
    color: #1e293b;
}

.nav-item.active {
    background: #f1f5f9;
    color: #2563eb;
    font-weight: 500;
}

/* Main Content */
.main-content {
    flex: 1;
    margin-left: 280px;
    min-width: 0;
    height: 100vh;
    overflow-y: auto; /* Permitir scroll */
    position: relative;
}

.dashboard-header {
    position: sticky;
    top: 0;
    background: white;
    z-index: 40;
    border-bottom: 1px solid #e2e8f0;
    padding: 1rem 1.5rem;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

.dashboard-header {
    text-align: center;
    margin-bottom: 2rem;
    padding: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 16px;
    color: white;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.dashboard-header h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
}

.dashboard-header p {
    font-size: 1.2rem;
    opacity: 0.9;
}

.dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
}

.dashboard-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.dashboard-card:hover {
    transform: translateY(-5px);
}

.dashboard-card h2 {
    color: #1a1a1a;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 2px solid #e5e7eb;
    padding-bottom: 0.5rem;
}

.stats-container {
    display: flex;
    justify-content: space-around;
    text-align: center;
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.stat-value {
    font-size: 2.5rem;
    font-weight: bold;
    color: #4f46e5;
    margin-bottom: 0.5rem;
}

.stat-label {
    color: #6b7280;
    font-size: 0.9rem;
}

.course-details p {
    margin: 0.5rem 0;
    color: #374151;
}

.course-details strong {
    color: #4f46e5;
}

.highlight-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.country-name {
    font-size: 2rem;
    font-weight: bold;
    color: #4f46e5;
    margin-bottom: 0.5rem;
}

.city-count {
    color: #6b7280;
    font-size: 1.2rem;
}

.tech-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}

.tech-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    background: #f9fafb;
    border-radius: 8px;
}

.tech-icon {
    font-size: 1.5rem;
}

.tech-name {
    color: #374151;
    font-weight: 500;
}

.dashboard-header {
    background: white;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 40;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.menu-button {
    display: none;
    background: none;
    border: none;
    color: #64748b;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 8px;
}

.menu-button:hover {
    background: #f1f5f9;
    color: #1e293b;
}

.search-container {
    position: relative;
    display: flex;
    align-items: center;
}

.search-icon {
    position: absolute;
    left: 0.75rem;
    color: #64748b;
}

.search-input {
    padding: 0.5rem 0.75rem 0.5rem 2.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    width: 300px;
    font-size: 0.875rem;
    transition: all 0.2s ease;
}

.search-input:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.header-right {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.notification-btn {
    position: relative;
    background: none;
    border: none;
    color: #64748b;
    padding: 0.5rem;
    border-radius: 8px;
    cursor: pointer;
}

.notification-btn:hover {
    background: #f1f5f9;
    color: #1e293b;
}

.notification-badge {
    position: absolute;
    top: 0;
    right: 0;
    background: #ef4444;
    color: white;
    font-size: 0.75rem;
    padding: 0.125rem 0.375rem;
    border-radius: 9999px;
    font-weight: 500;
}

.user-menu-container {
    position: relative;
}

.user-menu-button {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: none;
    border: none;
    padding: 0.5rem;
    border-radius: 8px;
    cursor: pointer;
    color: #1e293b;
}

.user-menu-button:hover {
    background: #f1f5f9;
}

.avatar {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    object-fit: cover;
}

.avatar-large {
    width: 48px;
    height: 48px;
    border-radius: 8px;
    object-fit: cover;
}

.user-name {
    font-size: 0.875rem;
    font-weight: 500;
}

.user-menu-dropdown {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    width: 280px;
    padding: 0.75rem;
    z-index: 50;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem;
}

.user-email {
    font-size: 0.875rem;
    font-weight: 500;
    color: #1e293b;
    margin: 0;
}

.user-role {
    font-size: 0.75rem;
    color: #64748b;
}

.dropdown-divider {
    height: 1px;
    background: #e2e8f0;
    margin: 0.5rem 0;
}

.dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    width: 100%;
    border: none;
    background: none;
    color: #ef4444;
    cursor: pointer;
    border-radius: 8px;
    font-size: 0.875rem;
}

.dropdown-item:hover {
    background: #fef2f2;
}

/* Dashboard Content */
.dashboard-content {
    padding: 2rem;
    min-height: calc(100vh - 70px); /* Altura total menos el header */
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.stat-card {
    background: white;
    padding: 1.5rem;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    transition: all 0.2s ease;
}

.stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.stat-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}

.stat-icon.purple { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); }
.stat-icon.blue { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); }
.stat-icon.green { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }

.stat-data h3 {
    color: #64748b;
    font-size: 0.875rem;
    margin: 0;
    font-weight: 500;
}

.stat-number {
    color: #1e293b;
    font-size: 1.875rem;
    font-weight: 600;
    margin: 0.25rem 0;
}

.stat-change {
    font-size: 0.75rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.stat-change.positive { color: #10b981; }
.stat-change.negative { color: #ef4444; }

.recent-activity {
    background: white;
    padding: 1.5rem;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
}

.recent-activity h2 {
    color: #1e293b;
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 1.5rem 0;
}

/* Nuevo header cultural boliviano */
.cultural-header {
    text-align: center;
    margin-bottom: 2rem;
    padding: 2rem;
    background: linear-gradient(135deg, #78A5D5 0%, #C0C0C0 100%);
    border-radius: 16px;
    color: white;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.cultural-header h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

.cultural-header p {
    font-size: 1.2rem;
    opacity: 0.9;
}

/* Tarjetas culturales */
.culture-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
}

.culture-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-top: 4px solid #D52B1E; /* Borde superior con color de la bandera */
}

.culture-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
}

.culture-card h2 {
    color: #1a1a1a;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 2px solid #e5e7eb;
    padding-bottom: 0.5rem;
}

.culture-card img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 1rem;
}

.culture-text {
    color: #4b5563;
    line-height: 1.6;
    margin-bottom: 1rem;
}

/* Contenedores para videos de YouTube */
.video-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
}

.video-box {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.video-box:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
}

.video-box h3 {
    padding: 1rem;
    background: #007934; /* Color verde de la bandera boliviana */
    color: white;
    font-size: 1.2rem;
    margin: 0;
}

.video-frame {
    width: 100%;
    aspect-ratio: 16/9;
    border: none;
}

/* Categorías culturales */
.culture-categories {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.culture-tag {
    display: inline-block;
    background: #F4E400; /* Color amarillo de la bandera boliviana */
    color: #1a1a1a;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
}

/* Indicadores de regiones */
.region-indicators {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.region-indicator {
    display: flex;
    align-items: center;
}

.region-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 0.5rem;
}

.region-dot.altiplano { background-color: #D52B1E; }
.region-dot.valle { background-color: #F4E400; }
.region-dot.llanos { background-color: #007934; }
.region-dot.amazonia { background-color: #1d4ed8; }

.region-name {
    font-size: 0.875rem;
    color: #4b5563;
}

/* Calendario de festividades */
.festival-timeline {
    position: relative;
    padding-left: 2rem;
    margin-top: 1.5rem;
}

.festival-timeline::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, #D52B1E, #F4E400, #007934);
}

.festival-item {
    position: relative;
    padding-bottom: 1.5rem;
}

.festival-item::before {
    content: '';
    position: absolute;
    left: -2.1rem;
    top: 0;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: white;
    border: 2px solid #D52B1E;
}

.festival-date {
    font-weight: 500;
    color: #D52B1E;
    margin-bottom: 0.25rem;
}

.festival-name {
    font-size: 1.1rem;
    font-weight: 500;
    color: #1a1a1a;
    margin-bottom: 0.25rem;
}

.festival-description {
    color: #4b5563;
    font-size: 0.9rem;
}

/* Galería de imágenes */
.culture-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
}

.gallery-item {
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    aspect-ratio: 1/1;
}

.gallery-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.gallery-item:hover .gallery-image {
    transform: scale(1.05);
}

.gallery-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.5rem;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    font-size: 0.8rem;
}

/* Patrimonio UNESCO */
.unesco-badge {
    display: inline-flex;
    align-items: center;
    background: #0077be;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    margin-bottom: 1rem;
}


.unesco-badge::before {
    content: '★';
    margin-right: 0.25rem;
}

/* Responsive */
@media (max-width: 1024px) {
    .sidebar {
        transform: translateX(-100%);
    }

    .sidebar.open {
        transform: translateX(0);
    }

    .close-sidebar-btn {
        display: flex; /* Mostramos el botón solo en modo responsive */
    }

    .main-content {
        margin-left: 0;
        width: 100%;
    }

    .menu-button {
        display: block;
    }

    .search-input {
        width: 200px;
    }

    .dashboard-content {
        min-height: calc(100vh - 60px);
    }
}

@media (max-width: 768px) {
    .dashboard-container {
        padding: 1rem;
    }

    .dashboard-header {
        padding: 1.5rem;
    }

    .dashboard-header h1 {
        font-size: 2rem;
    }

    .dashboard-grid {
        grid-template-columns: 1fr;
    }

    .stat-value {
        font-size: 2rem;
    }

    .country-name {
        font-size: 1.5rem;
    }

    .video-container {
        grid-template-columns: 1fr;
    }
    
    .cultural-header h1 {
        font-size: 2rem;
    }
    
    .cultural-header p {
        font-size: 1rem;
    }
}

@media (max-width: 640px) {
    .dashboard-content {
        padding: 1rem;
    }

    .stats-grid {
        grid-template-columns: 1fr;
    }

    .search-input {
        width: 160px;
    }

    .user-name {
        display: none;
    }

    .culture-gallery {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 480px) {
    .dashboard-header h1 {
        font-size: 1.5rem;
    }

    .dashboard-header p {
        font-size: 1rem;
    }

    .tech-grid {
        grid-template-columns: 1fr;
    }
    
    .login-container {
        padding: 0.5rem;
        background: linear-gradient(135deg, #78A5D5 0%, #C0C0C0 100%);
        min-height: 100vh;
        overflow-y: auto; /* Permitir scroll vertical */
    }
}
`;