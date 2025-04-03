import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { User } from '@/components/interface/user'
import { apiService } from '@/services/apiService'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

interface DialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    userData: User
}

interface Role {
    nombre_rol: string
    descripcion: string
    id: number
}

interface UserRole {
    id_rol: number
    id_usuario: number
    rol: Role
}

export const DialogRoleAdd = ({ open, onOpenChange, userData }: DialogProps) => {
    const [roles, setRoles] = useState<Role[]>([])
    const [userRoles, setUserRoles] = useState<UserRole[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (open) {
            console.log(userData.nombre)
            fetchData()
        }
    }, [open])

    const fetchData = async () => {
        setLoading(true)
        try {
            const rolesResponse = await apiService.get('roles/?skip=0&limit=100')
            setRoles(rolesResponse.data)
            
            const userRolesResponse = await apiService.get(`user_roles/${userData.id}`)
            console.log(userRolesResponse.data)
            setUserRoles(userRolesResponse.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const handleAssignRole = async (roleId: number) => {
        try {
            await apiService.post('user_roles', { id_usuario: userData.id, id_rol: roleId })
            fetchData() 
        } catch (error) {
            console.error(error)
        }
    }

    const handleRemoveRole = async (userRoleId: number) => {
        try {
            await apiService.delete(`user_roles/${userData.id}/${userRoleId}`)
            fetchData() 
        } catch (error) {
            console.error(error)
        }
    }

    const availableRoles = roles.filter(role => 
        !userRoles.some(userRole => userRole.rol.id === role.id)
    )

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Gestor de Roles</DialogTitle>
                    <DialogDescription>
                        Administra los roles del usuario 
                    </DialogDescription>
                </DialogHeader>

                {loading ? (
                    <div className="flex justify-center py-8">
                        <p>Cargando...</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium mb-2">Roles asignados</h3>
                            {userRoles.length === 0 ? (
                                <p className="text-sm text-muted-foreground">El usuario no tiene roles asignados</p>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {userRoles.map(userRole => (
                                        <div key={userRole.id_rol} className="flex items-center gap-2 bg-secondary rounded-full pl-3 pr-2 py-1">
                                            <span>{userRole.rol.nombre_rol}</span>
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                className="h-6 w-6 p-0 rounded-full text-destructive hover:bg-destructive/10"
                                                onClick={() => handleRemoveRole(userRole.id_rol)}
                                            >
                                                ×
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Separator />

                        <div>
                            <h3 className="text-lg font-medium mb-2">Agregar roles</h3>
                            {availableRoles.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No hay roles disponibles para asignar</p>
                            ) : (
                                <ScrollArea className="h-48 rounded-md border p-4">
                                    <div className="space-y-2">
                                        {availableRoles.map(role => (
                                            <div key={role.id} className="flex justify-between items-center p-2 hover:bg-accent rounded">
                                                <div>
                                                    <p className="font-medium">{role.nombre_rol}</p>
                                                    <p className="text-sm text-muted-foreground">{role.descripcion || 'Sin descripción'}</p>
                                                </div>
                                                <Button 
                                                    variant="outline" 
                                                    size="sm"
                                                    onClick={() => handleAssignRole(role.id)}
                                                >
                                                    Asignar
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            )}
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}