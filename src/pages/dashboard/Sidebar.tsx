import { FaHome, FaBook, FaVideo, FaMusic, FaCalendarAlt, FaLandmark } from 'react-icons/fa';
import bandera from '@/assets/bandera.jpg';

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  activeSection: string;
  navigateToSection: (section: string) => void;
}

function Sidebar({ sidebarOpen, toggleSidebar, activeSection, navigateToSection }: SidebarProps) {
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
          className={`nav-item ${activeSection === 'videos' ? 'active' : ''}`}
          onClick={() => navigateToSection('videos')}
        >
          <FaVideo /> Cultura
        </button>
        <button
          className={`nav-item ${activeSection === 'musica' ? 'active' : ''}`}
          onClick={() => navigateToSection('musica')}
        >
          <FaBook /> Eventos Historicos
        </button>
        <button
          className={`nav-item ${activeSection === 'festividades' ? 'active' : ''}`}
          onClick={() => navigateToSection('festividades')}
        >
          <FaCalendarAlt /> Agenda
        </button>
        <button
          className={`nav-item ${activeSection === 'patrimonio' ? 'active' : ''}`}
          onClick={() => navigateToSection('presidentes')}
        >
          <FaLandmark /> Presidentes
        </button>
      </div>
    </div>
  );
}

export default Sidebar;