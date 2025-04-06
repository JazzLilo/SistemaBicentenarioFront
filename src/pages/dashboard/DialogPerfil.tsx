import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

import { FormUser } from '@/components/form/FormUser'
import { FormPass } from '@/components/form/FormPass'



interface DialogPerfilProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const DialogPerfil = ({ open, onOpenChange }: DialogPerfilProps) => {

  const [activeTab, setActiveTab] = useState('profile')

  

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
          <DialogDescription>
            Actualiza tu información personal o cambia tu contraseña.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="password">Contraseña</TabsTrigger>
          </TabsList>

          {/* Pestaña de Perfil */}
          <TabsContent value="profile">
            <FormUser/>
          </TabsContent>

          {/* Pestaña de Contraseña */}
          <TabsContent value="password">
            <FormPass/>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}