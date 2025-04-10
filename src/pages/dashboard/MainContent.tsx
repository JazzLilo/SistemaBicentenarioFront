import { Historia, Presidentes, Patrimonio,  Videos, TimeLine, Eventos ,Mapa, Inicio, CulturaMap, BibliotecaShow } from './sections'

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
      {activeSection === 'festividades' && <Eventos />}
      {activeSection === 'patrimonio' && <Patrimonio />}
      {activeSection === 'presidentes' && <Presidentes />}
      {activeSection === 'cultura' && <CulturaMap />}
      {activeSection === 'biblioteca' && <BibliotecaShow />}
    </div>
  );
}

export default MainContent;