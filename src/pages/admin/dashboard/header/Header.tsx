import { Menu,User } from 'lucide-react'
import { Button } from '@/components/ui/button'

const titles = {
  dashboard: 'Panel Principal',
  users: 'Gestión de Usuarios',
  news: 'Gestión de Noticias',
  events: 'Gestión de Eventos',
  history: 'Gestión de Historia',
  library: 'Gestión de Biblioteca',
  comments: 'Moderación de Comentarios',
  statistics: 'Estadísticas y Análisis'
}

export const Header = ({ activeTab, onMenuClick }:
  {
    activeTab: keyof typeof titles
    onMenuClick: () => void
  }
) => {
    

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm">
      <div className="flex items-center">
     
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 md:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {titles[activeTab]}
        </h2>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
    
        <div className="flex items-center space-x-2">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Administrador</p>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}