import { Historia, Presidentes, Patrimonio, Festividades, Videos, TimeLine, Mapa, Inicio, CulturaMap } from './sections'

interface MainContentProps {
  activeSection: string;
}

function MainContent({ activeSection }: MainContentProps) {
  return (
    <div className="dashboard-content">
      {activeSection === 'inicio' && <Inicio />}
      {activeSection === 'historia' && <Historia />}
      {activeSection === 'linea-tiempo' && <TimeLine />}
      {activeSection === 'mapa' && <Mapa />}
      {activeSection === 'videos' && <Videos />}
      {activeSection === 'festividades' && <Festividades />}
      {activeSection === 'patrimonio' && <Patrimonio />}
      {activeSection === 'presidentes' && <Presidentes />}
      {activeSection === 'cultura' && <CulturaMap />}
    </div>
  );
}

export default MainContent;