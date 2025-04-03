import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { get_data } from '@/storage/auth_storage';

// Definición de tipos
type Role = {
  id: number;
  name: string;
};

const availableRoles: Role[] = [
  { id: 1, name: 'admin' },
  { id: 2, name: 'cultural' },
  { id: 3, name: 'academico' },
  { id: 4, name: 'gerente/organizador' },
  { id: 5, name: 'controlador de asistencia' },
];

export const NavRole = () => {
  const userData = get_data();
  const [selectedRole, setSelectedRole] = useState<string>(userData?.currentRole || '');

  const userRoles = availableRoles
    /*
    .filter(role => 
    userData?.roles?.includes(role.name)
    );
  */
  if (!userRoles.length) return null;

  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
   if (value == 'admin') {
      window.location.href = '/admin/dashboard';
    }
  };

  return (
    <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
      <Select value={selectedRole} onValueChange={handleRoleChange}>
        <SelectTrigger className="w-[220px] bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <SelectValue placeholder="Seleccionar rol" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          {userRoles.map((role) => (
            <SelectItem 
              key={role.id} 
              value={role.name}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="flex items-center capitalize">
                <span className="inline-block w-2 h-2 mr-2 rounded-full bg-blue-500"></span>
                <p className='ml-2' >{role.name}</p>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};