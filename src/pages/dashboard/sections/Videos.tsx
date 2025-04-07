function Videos() {
    return (
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
    );
  }
  
  export default Videos;