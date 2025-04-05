import { useState } from 'react';
import { DashboardContainer } from './DashboardStyle';
import { FaHome, FaBook, FaVideo, FaMusic, FaCalendarAlt, FaLandmark } from 'react-icons/fa';

import { NavUser } from './navUser';

import { ChatIA } from '@/components/chat/ChatIa';

// Importar imágenes locales
import bandera from '@/assets/bandera.jpg';
import f1 from '@/assets/f1.jpg';
import f2 from '@/assets/f2.jpg';
import f3 from '@/assets/f3.jpg';

function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('inicio');



  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navigateToSection = (section) => {
    setActiveSection(section);
  };

  return (
    <DashboardContainer>
      {/* Sidebar */}
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
            className={`nav-item ${activeSection === 'historia' ? 'active' : ''}`}
            onClick={() => navigateToSection('historia')}
          >
            <FaBook /> Historia Bicentenaria
          </button>
          <button
            className={`nav-item ${activeSection === 'videos' ? 'active' : ''}`}
            onClick={() => navigateToSection('videos')}
          >
            <FaVideo /> Videos Culturales
          </button>
          <button
            className={`nav-item ${activeSection === 'musica' ? 'active' : ''}`}
            onClick={() => navigateToSection('musica')}
          >
            <FaMusic /> Música y Danzas
          </button>
          <button
            className={`nav-item ${activeSection === 'festividades' ? 'active' : ''}`}
            onClick={() => navigateToSection('festividades')}
          >
            <FaCalendarAlt /> Festividades
          </button>
          <button
            className={`nav-item ${activeSection === 'patrimonio' ? 'active' : ''}`}
            onClick={() => navigateToSection('patrimonio')}
          >
            <FaLandmark /> Patrimonio UNESCO
          </button>
        </div>


      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="dashboard-header">
          <div className="header-left">
            <button className="menu-button" onClick={toggleSidebar}>
              ☰
            </button>
          </div>
          <div className="header-right">
            <NavUser />
          </div>
        </div>

        <div className="dashboard-content">
          {activeSection === 'inicio' && (
            <>
              <header className="cultural-header">
                <h1>Bolivia: 200 Años de Historia y Cultura</h1>
                <p>Explora el rico patrimonio cultural boliviano en su bicentenario</p>
              </header>

              <div className="culture-grid">
                <div className="culture-card">
                  <h2>Diversidad Cultural</h2>
                  <img src={f1} alt="Diversidad cultural boliviana" />
                  <div className="culture-categories">
                    <span className="culture-tag">Multiétnico</span>
                    <span className="culture-tag">Pluricultural</span>
                    <span className="culture-tag">36 Pueblos</span>
                  </div>
                  <p className="culture-text">
                    Bolivia es uno de los países con mayor diversidad étnica y cultural de América Latina,
                    con 36 pueblos indígenas reconocidos oficialmente, cada uno con su idioma, tradiciones y costumbres.
                  </p>
                </div>

                <div className="culture-card">
                  <h2>Historia Bicentenaria</h2>
                  <img src={f2} alt="Historia de Bolivia" />
                  <div className="culture-categories">
                    <span className="culture-tag">Independencia</span>
                    <span className="culture-tag">República</span>
                    <span className="culture-tag">Bicentenario</span>
                  </div>
                  <p className="culture-text">
                    Desde su independencia el 6 de agosto de 1825, Bolivia ha construido una identidad
                    rica y diversa, forjada a través de sus luchas por la libertad y autodeterminación.
                  </p>
                </div>

                <div className="culture-card">
                  <h2>Patrimonio Natural</h2>
                  <img src={f3} alt="Salar de Uyuni" />
                  <div className="culture-categories">
                    <span className="culture-tag">Amazonía</span>
                    <span className="culture-tag">Andes</span>
                    <span className="culture-tag">Altiplano</span>
                  </div>
                  <p className="culture-text">
                    Bolivia alberga una increíble diversidad de ecosistemas, desde las tierras altas del Altiplano
                    y la Cordillera de los Andes hasta las tierras bajas de la Amazonía y el Chaco.
                  </p>
                </div>
              </div>

              <h2 style={{ margin: '2rem 0 1rem' }}>Regiones Culturales</h2>
              <div className="region-indicators">
                <div className="region-indicator">
                  <div className="region-dot altiplano"></div>
                  <span className="region-name">Altiplano</span>
                </div>
                <div className="region-indicator">
                  <div className="region-dot valle"></div>
                  <span className="region-name">Valles</span>
                </div>
                <div className="region-indicator">
                  <div className="region-dot llanos"></div>
                  <span className="region-name">Llanos</span>
                </div>
                <div className="region-indicator">
                  <div className="region-dot amazonia"></div>
                  <span className="region-name">Amazonía</span>
                </div>
              </div>

              <h2 style={{ margin: '2rem 0 1rem' }}>Videos Destacados</h2>
              <div className="video-container">
                <div className="video-box">
                  <h3>La Diablada: Danza Ancestral</h3>
                  <iframe
                    className="video-frame"
                    src="https://www.youtube.com/embed/xsgnY8oCkcU"
                    title="La Diablada"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="video-box">
                  <h3>El Salar de Uyuni: Maravilla Natural</h3>
                  <iframe
                    className="video-frame"
                    src="https://www.youtube.com/embed/82pXbyHTiQk"
                    title="Salar de Uyuni"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </>
          )}

          {activeSection === 'historia' && (
            <>
              <header className="cultural-header">
                <h1>200 Años de Historia</h1>
                <p>Hitos históricos de Bolivia desde su independencia</p>
              </header>

              <div className="culture-grid">
                <div className="culture-card">
                  <h2>La Independencia (1825)</h2>
                  <img src="https://images.unsplash.com/photo-1589483232097-53512846e26f" alt="Independencia de Bolivia" />
                  <p className="culture-text">
                    El 6 de agosto de 1825, la Asamblea Deliberante firmó la Declaración de Independencia
                    del Alto Perú, creando la República de Bolívar, posteriormente llamada Bolivia en honor
                    al Libertador Simón Bolívar.
                  </p>
                </div>

                <div className="culture-card">
                  <h2>Guerra del Pacífico (1879-1883)</h2>
                  <img src="https://images.unsplash.com/photo-1566908829550-e6551b00979b" alt="Guerra del Pacífico" />
                  <p className="culture-text">
                    Conflicto bélico que enfrentó a Chile contra Bolivia y Perú, y que resultó en la pérdida
                    del acceso al mar para Bolivia, un tema que sigue definiendo su política exterior hasta hoy.
                  </p>
                </div>

                <div className="culture-card">
                  <h2>Revolución Nacional (1952)</h2>
                  <img src="https://images.unsplash.com/photo-1572125773745-0f5a1c2393f0" alt="Revolución de 1952" />
                  <p className="culture-text">
                    Transformó profundamente la sociedad boliviana con reformas como el voto universal,
                    la nacionalización de las minas y la reforma agraria, dando voz y derechos a las
                    comunidades indígenas y campesinas.
                  </p>
                </div>
              </div>
            </>
          )}

          {activeSection === 'videos' && (
            <>
              <header className="cultural-header">
                <h1>Galería Audiovisual</h1>
                <p>Videos sobre la rica cultura boliviana</p>
              </header>

              <div className="video-container">
                <div className="video-box">
                  <h3>Danzas Folclóricas</h3>
                  <iframe
                    className="video-frame"
                    src=""
                    title="Danzas Folclóricas de Bolivia"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="video-box">
                  <h3>Arte y Artesanía</h3>
                  <iframe
                    className="video-frame"
                    src=""
                    title="Arte y Artesanía Boliviana"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              <div className="video-container">
                <div className="video-box">
                  <h3>Tradiciones Indígenas</h3>
                  <iframe
                    className="video-frame"
                    src=""
                    title="Tradiciones Indígenas"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="video-box">
                  <h3>Gastronomía Boliviana</h3>
                  <iframe
                    className="video-frame"
                    src=""
                    title="Gastronomía Boliviana"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </>
          )}

          {activeSection === 'festividades' && (
            <>
              <header className="cultural-header">
                <h1>Festividades y Tradiciones</h1>
                <p>El calendario boliviano está marcado por coloridas celebraciones ancestrales</p>
              </header>

              <div className="festival-timeline">
                <div className="festival-item">
                  <div className="festival-date">Febrero</div>
                  <div className="festival-name">Carnaval de Oruro</div>
                  <div className="festival-description">
                    Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO. Una de las mayores expresiones
                    folclóricas y culturales de Bolivia con más de 200 años de tradición.
                  </div>
                </div>
                <div className="festival-item">
                  <div className="festival-date">Junio</div>
                  <div className="festival-name">Año Nuevo Aymara</div>
                  <div className="festival-description">
                    Celebración del solsticio de invierno (21 de junio) que marca el inicio del año nuevo para
                    la cultura aymara. Se realiza en Tiwanaku al amanecer.
                  </div>
                </div>
                <div className="festival-item">
                  <div className="festival-date">Agosto</div>
                  <div className="festival-name">Fiesta de la Independencia</div>
                  <div className="festival-description">
                    Conmemoración de la independencia de Bolivia, firmada el 6 de agosto de 1825.
                    Desfiles cívicos y militares se realizan en todo el país.
                  </div>
                </div>
                <div className="festival-item">
                  <div className="festival-date">Noviembre</div>
                  <div className="festival-name">Todos Santos</div>
                  <div className="festival-description">
                    Celebración que fusiona creencias católicas e indígenas. Las familias elaboran mesas con ofrendas
                    para recibir a las almas de sus difuntos que regresan temporalmente al mundo de los vivos.
                  </div>
                </div>
              </div>
            </>
          )}

          {activeSection === 'musica' && (
            <>
              <header className="cultural-header">
                <h1>Música y Danzas</h1>
                <p>Expresiones artísticas que definen la identidad boliviana</p>
              </header>

              <div className="culture-grid">
                <div className="culture-card">
                  <h2>La Morenada</h2>
                  <img src="https://images.unsplash.com/photo-1572124293661-44a9d5b54d5b" alt="Morenada" />
                  <div className="culture-categories">
                    <span className="culture-tag">Altiplano</span>
                    <span className="culture-tag">Carnaval</span>
                  </div>
                  <p className="culture-text">
                    Danza que representa a los esclavos africanos durante la época colonial.
                    Los danzantes usan máscaras con rasgos exagerados y trajes pesados decorados con bordados.
                  </p>
                </div>

                <div className="culture-card">
                  <h2>Caporales</h2>
                  <img src="https://images.unsplash.com/photo-1562783334-9e82b15beab9" alt="Caporales" />
                  <div className="culture-categories">
                    <span className="culture-tag">Yungas</span>
                    <span className="culture-tag">Contemporánea</span>
                  </div>
                  <p className="culture-text">
                    Danza que simboliza a los capataces de las haciendas coloniales. Se caracteriza por su ritmo enérgico
                    y los saltos acrobáticos de los bailarines al son de las cascabeles que llevan en las botas.
                  </p>
                </div>

                <div className="culture-card">
                  <h2>Saya Afroboliviana</h2>
                  <img src="https://images.unsplash.com/photo-1573676048035-9c2a72b92995" alt="Saya Afroboliviana" />
                  <div className="culture-categories">
                    <span className="culture-tag">Yungas</span>
                    <span className="culture-tag">Afrodescendiente</span>
                  </div>
                  <p className="culture-text">
                    Expresión cultural de los afrobolivianos que combina canto, poesía y danza acompañada de tambores.
                    Es una de las manifestaciones más importantes de la resistencia cultural africana en Bolivia.
                  </p>
                </div>
              </div>

              <h2 style={{ margin: '2rem 0 1rem' }}>Instrumentos Tradicionales</h2>
              <div className="culture-gallery">
                <div className="gallery-item">
                  <img className="gallery-image" src="https://images.unsplash.com/photo-1575223970966-0a3d42768b44" alt="Zampoña" />
                  <div className="gallery-caption">Zampoña</div>
                </div>
                <div className="gallery-item">
                  <img className="gallery-image" src="https://images.unsplash.com/photo-1543443258-92b04ad5ec6b" alt="Charango" />
                  <div className="gallery-caption">Charango</div>
                </div>
                <div className="gallery-item">
                  <img className="gallery-image" src="https://images.unsplash.com/photo-1548164806-9709e698990d" alt="Quena" />
                  <div className="gallery-caption">Quena</div>
                </div>
                <div className="gallery-item">
                  <img className="gallery-image" src="https://images.unsplash.com/photo-1555069797-da1e7e4a4dcf" alt="Bombo" />
                  <div className="gallery-caption">Bombo</div>
                </div>
              </div>
            </>
          )}

          {activeSection === 'patrimonio' && (
            <>
              <header className="cultural-header">
                <h1>Patrimonio de la Humanidad</h1>
                <p>Sitios reconocidos por la UNESCO en Bolivia</p>
              </header>

              <div className="culture-grid">
                <div className="culture-card">
                  <span className="unesco-badge">Patrimonio Cultural</span>
                  <h2>Ciudad de Potosí</h2>
                  <img src="https://images.unsplash.com/photo-1590093235138-ae55526192a9" alt="Potosí" />
                  <p className="culture-text">
                    Fundada en 1546 tras el descubrimiento de ricos yacimientos de plata en el Cerro Rico,
                    Potosí se convirtió en la mayor ciudad industrial del mundo en el siglo XVI.
                  </p>
                </div>

                <div className="culture-card">
                  <span className="unesco-badge">Patrimonio Cultural</span>
                  <h2>Misiones Jesuíticas</h2>
                  <img src="https://images.unsplash.com/photo-1601304372486-e3bf778e967e" alt="Misiones Jesuíticas" />
                  <p className="culture-text">
                    Las misiones jesuíticas de Chiquitos son un conjunto de reducciones establecidas
                    por la Compañía de Jesús durante los siglos XVII y XVIII.
                  </p>
                </div>

                <div className="culture-card">
                  <span className="unesco-badge">Patrimonio Cultural</span>
                  <h2>Tiwanaku</h2>
                  <img src="https://images.unsplash.com/photo-1583265627959-fb7042f5133b" alt="Tiwanaku" />
                  <p className="culture-text">
                    Centro espiritual y político de la cultura Tiwanaku, que floreció en el altiplano boliviano
                    entre los años 400 y 900 d.C., antes del Imperio Inca.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <ChatIA/>
    </DashboardContainer >
  );
}

export default Dashboard;