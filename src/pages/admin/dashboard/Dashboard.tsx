import { useState, useEffect } from 'react'
import { Sidebar } from './sidebar/Sidebar'
import { Header } from './header/Header'
import { DashboardHome } from './content/DashboardHome'
import { UserManagement } from './UserManagement'
import { NewsManagement } from './NewsManagement'
import { EventManagement } from '@/components/eventoHist/EventManagement'
import { CulturaManagement } from '@/components/cultura/CulturaManagement'
import  PresidentesManagement  from '@/components/presidentes/PresidentesManagement'
import { LibraryManagement } from './LibraryManagement'
import { StatisticsPanel } from './StatisticsPanel'
import { CommentModeration } from './CommentModeration'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'dashboard' | 'events' | 'history' | 'cultura'| 'presidentes' |'library' | 'comments' | 'statistics' | 'news'>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  useEffect(() => {
    if (!isDesktop) {
      setSidebarOpen(false)
    }
  }, [activeTab, isDesktop])

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardHome />
      case 'users': return <UserManagement />
      case 'news': return <NewsManagement />
      case 'events': return <EventManagement />
      case 'cultura': return <CulturaManagement />
      case 'presidentes': return <PresidentesManagement />
      case 'library': return <LibraryManagement />
      case 'comments': return <CommentModeration />
      case 'statistics': return <StatisticsPanel />
      default: return <DashboardHome />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
   
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
      />
      
      <div className="flex flex-col flex-1 overflow-hidden">
       
        <Header 
          activeTab={activeTab} 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}