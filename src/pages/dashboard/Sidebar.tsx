import { useState } from 'react';
import { FaHome, FaBook, FaVideo, FaCalendarAlt, FaLandmark, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import bandera from '@/assets/bandera.jpg';



interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  activeSection: string;
  navigateToSection: (section: string, subSection?: string) => void;
}

function Sidebar({ sidebarOpen, toggleSidebar, activeSection, navigateToSection }: SidebarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isEventosActive = activeSection === 'linea-tiempo' || 
                         activeSection === 'mapa' || 
                         activeSection === 'historia';

  return (
    <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <img src={bandera} alt="Bandera de Bolivia" width="32" height="32" />
          <h2>Bolivia Cultural</h2>
        </div>
        <button className="close-sidebar-btn" onClick={toggleSidebar}>×</button>
      </div>

      <div className="nav-links">
        <button
          className={`nav-item ${activeSection === 'inicio' ? 'active' : ''}`}
          onClick={() => navigateToSection('inicio')}
        >
          <FaHome /> Inicio
        </button>
        
        <button
          className={`nav-item ${activeSection === 'cultura' ? 'active' : ''}`}
          onClick={() => navigateToSection('cultura')}
        >
          <FaVideo /> Cultura
        </button>
        
        {/* Dropdown para Eventos Históricos */}
        <div className="dropdown-container">
          <button
            className={`nav-item dropdown-toggle ${isEventosActive ? 'active' : ''}`}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <FaBook /> 
            <span>Eventos Históricos</span>
            {dropdownOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
          </button>
          
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button
                className={`dropdown-item ${activeSection === 'linea-tiempo' ? 'active' : ''}`}
                onClick={() => {
                  navigateToSection('linea-tiempo');
                  setDropdownOpen(false);
                }}
              >
                Línea de Tiempo
              </button>
              <button
                className={`dropdown-item ${activeSection === 'mapa' ? 'active' : ''}`}
                onClick={() => {
                  navigateToSection('mapa');
                  setDropdownOpen(false);
                }}
              >
                Mapa Histórico
              </button>
              <button
                className={`dropdown-item ${activeSection === 'historia' ? 'active' : ''}`}
                onClick={() => {
                  navigateToSection('historia');
                  setDropdownOpen(false);
                }}
              >
                Historia
              </button>
            </div>
          )}
        </div>
        
        <button
          className={`nav-item ${activeSection === 'festividades' ? 'active' : ''}`}
          onClick={() => navigateToSection('festividades')}
        >
          <FaCalendarAlt /> Agenda
        </button>
        
        <button
          className={`nav-item ${activeSection === 'presidentes' ? 'active' : ''}`}
          onClick={() => navigateToSection('presidentes')}
        >
          <FaLandmark /> Presidentes
        </button>
      </div>
    </div>
  );
}

export default Sidebar;