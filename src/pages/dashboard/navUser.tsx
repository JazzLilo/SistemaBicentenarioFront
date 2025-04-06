import { useState, useRef} from 'react';
import { FaUserCircle, FaTools, FaSignOutAlt, FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { get_data, remove_data } from '@/storage/auth_storage';
import { useNavigate } from 'react-router-dom';
import { useClickOutside } from '@/hooks/useClickOutside'; 
import { DialogPerfil } from './DialogPerfil';
import { NavRole } from './NavRole';
import { PublicRoutes} from '@/routes/routes';

export const NavUser = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const userData = get_data();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsMenuOpen(false));

  const handleLogout = () => {
    remove_data();
    navigate(PublicRoutes.Login);
    window.location.reload();
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex items-center gap-4">
      <NavRole />
      
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-haspopup="true"
          aria-label="Menú de usuario"
        >
          <FaUserCircle size={24} className="text-gray-700 dark:text-gray-300" />
          <span className="font-medium text-gray-800 dark:text-gray-200">
            {userData?.nombre || 'Usuario'}
          </span>
          {isMenuOpen ? (
            <FaCaretUp className="text-gray-500" />
          ) : (
            <FaCaretDown className="text-gray-500" />
          )}
        </button>

        {isMenuOpen && (
          <div 
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700"
            role="menu"
          >
            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-700 dark:text-gray-300 truncate">{userData?.email || ''}</p>
            </div>
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setOpen(true)}
              role="menuitem"
            >
              <FaTools className="mr-2" />
              Perfil
            </button>
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700 transition-colors"
              onClick={handleLogout}
              role="menuitem"
            >
              <FaSignOutAlt className="mr-2" />
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
      
      <DialogPerfil
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
};