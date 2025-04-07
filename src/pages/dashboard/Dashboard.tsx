import { useState } from 'react';
import { DashboardContainer } from './DashboardStyle';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import MainContent from './MainContent';
import {ChatIA} from '@/components/chat/ChatIa';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('inicio');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navigateToSection = (section: string) => {
    setActiveSection(section);
  };

  return (
    <DashboardContainer>
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar} 
        activeSection={activeSection} 
        navigateToSection={navigateToSection} 
      />
      
      <div className="main-content">
        <DashboardHeader toggleSidebar={toggleSidebar} />
        <MainContent activeSection={activeSection} />
      </div>
      
      <ChatIA />
    </DashboardContainer>
  );
}

export default Dashboard;