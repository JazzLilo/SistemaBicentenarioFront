function Musica() {
    return (
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
    );
  }
  
  export default Musica;