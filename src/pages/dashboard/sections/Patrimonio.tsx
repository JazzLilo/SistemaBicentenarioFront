export function Patrimonio() {
    return (
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
    );
  }
  
 