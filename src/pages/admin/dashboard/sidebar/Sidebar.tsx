import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  BookOpen,
  Landmark,
  LibraryBig,
  MessagesSquare,
  BarChart3,
  Menu,
  X,
} from 'lucide-react'
import { FaDoorClosed } from "react-icons/fa";
import { remove_data } from '@/storage/auth_storage';
const menuItems = [
  { id: 'dashboard', label: 'Panel Principal', icon: LayoutDashboard },
  { id: 'users', label: 'Usuarios', icon: Users },
  { id: 'events', label: 'Eventos Históricos', icon: CalendarDays },
  { id: 'library', label: 'Biblioteca', icon: LibraryBig },
  { id: 'cultura', label: 'Cultura', icon: BookOpen },
  { id: 'presidentes', label: 'Presidentes', icon: Landmark },
  { id: 'eventos', label: 'Eventos', icon: CalendarDays },
  { id: 'comments', label: 'Comentarios', icon: MessagesSquare },
  { id: 'statistics', label: 'Estadísticas', icon: BarChart3 },
]

export const Sidebar = ({ activeTab, setActiveTab }:
  {
    activeTab: string
    setActiveTab: (tab: any) => void
  }
) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      if (window.innerWidth < 768) {
        setIsCollapsed(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen)
  const toggleCollapse = () => setIsCollapsed(!isCollapsed)

  const handleItemClick = (id:any) => {
    setActiveTab(id)
    if (windowWidth < 768) {
      setIsMobileOpen(false)
    }
  }

  const handleCerrar = () => {
    remove_data()
    window.location.href = '/'
  }

  const sidebarStyles = `
    fixed md:relative z-40
    flex flex-col
    h-full
    border-r border-gray-200 dark:border-gray-800
    bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900
    transition-all duration-300 ease-in-out
    ${windowWidth < 768 ? (isMobileOpen ? 'left-0' : '-left-full') : ''}
    ${windowWidth >= 768 ? (isCollapsed ? 'w-20' : 'w-64') : 'w-64'}
  `

  return (
    <>
     
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMobileMenu}
          className="bg-white dark:bg-gray-800"
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {isMobileOpen && windowWidth < 768 && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={toggleMobileMenu}
        />
      )}

      <div className={sidebarStyles}>
      
        <div className="flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-700 bg-blue-100 dark:bg-gray-700">
          {(!isCollapsed || windowWidth < 768) ? (
            <h1 className="text-xl font-semibold text-blue-800 dark:text-white">Bolivia Cultural</h1>
          ) : (
            <h1 className="text-xl font-semibold text-blue-800 dark:text-white">BC</h1>
          )}
          
          {windowWidth >= 768 && (
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto h-8 w-8"
              onClick={toggleCollapse}
            >
              {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </Button>
          )}
        </div>

        <div className="flex flex-col flex-grow p-4 overflow-y-auto">
          <nav className="flex-1 space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? 'secondary' : 'ghost'}
                className={`
                  w-full justify-start
                  ${isCollapsed && windowWidth >= 768 ? 'px-2' : 'px-4'}
                  ${activeTab === item.id 
                    ? 'bg-blue-100 hover:bg-blue-100 text-blue-800 dark:bg-blue-900 dark:hover:bg-blue-900' 
                    : ''}
                  transition-colors
                `}
                onClick={() => handleItemClick(item.id)}
              >
                <item.icon className={`h-4 w-4 ${!isCollapsed || windowWidth < 768 ? 'mr-2' : ''}`} />
                {(!isCollapsed || windowWidth < 768) && item.label}
              </Button>
            ))}
          </nav>
        </div>

    
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Button 
            variant="ghost" 
            className={`
              w-full justify-start
              ${isCollapsed && windowWidth >= 768 ? 'px-2' : 'px-4'}
              text-blue-800 hover:text-blue-900 dark:text-gray-300 dark:hover:text-white
            `}
            onClick={handleCerrar}
          >
            <FaDoorClosed className={`h-4 w-4 ${!isCollapsed || windowWidth < 768 ? 'mr-2' : ''}`} />
            {(!isCollapsed || windowWidth < 768) && 'Salir'}
          </Button>
        </div>
      </div>
    </>
  )
}