import f1 from '@/assets/f1.jpg';
import f2 from '@/assets/f2.jpg';
import f3 from '@/assets/f3.jpg';

export function Inicio() {
  return (
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
  );
}

export default Inicio;