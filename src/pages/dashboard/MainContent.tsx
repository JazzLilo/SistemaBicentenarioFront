import Inicio from './sections/Inicio';
import Historia from './sections/Historia';
import Videos from './sections/Videos';
import Eventos from './sections/Eventos';
import Festividades from './sections/Festividades';
import Patrimonio from './sections/Patrimonio';

interface MainContentProps {
  activeSection: string;
}

function MainContent({ activeSection }: MainContentProps) {
  return (
    <div className="dashboard-content">
      {activeSection === 'inicio' && <Inicio />}
      {activeSection === 'historia' && <Historia />}
      {activeSection === 'videos' && <Videos />}
      {activeSection === 'musica' && <Eventos />}
      {activeSection === 'festividades' && <Festividades />}
      {activeSection === 'patrimonio' && <Patrimonio />}
    </div>
  );
}

export default MainContent;