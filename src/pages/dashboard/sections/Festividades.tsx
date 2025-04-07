function Festividades() {
    return (
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
    );
  }
  
  export default Festividades;