import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { get_data, update_data } from '@/storage/auth_storage'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { FormUser } from '@/components/form/FormUser'
import { FormPass } from '@/components/form/FormPass'


// Esquema de validación para los datos del perfil
const profileFormSchema = z.object({
  nombre: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  correo: z.string().email({
    message: "Por favor ingresa un correo válido.",
  }),
  descripcion: z.string().max(500, {
    message: "La descripción no puede exceder los 500 caracteres.",
  }).optional(),
})

// Esquema de validación para el cambio de contraseña
const passwordFormSchema = z.object({
  currentPassword: z.string().min(6, {
    message: "La contraseña actual debe tener al menos 6 caracteres.",
  }),
  newPassword: z.string().min(6, {
    message: "La nueva contraseña debe tener al menos 6 caracteres.",
  }),
  confirmPassword: z.string().min(6, {
    message: "La confirmación debe tener al menos 6 caracteres.",
  }),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Las contraseñas no coinciden.",
  path: ["confirmPassword"],
})

type ProfileFormValues = z.infer<typeof profileFormSchema>
type PasswordFormValues = z.infer<typeof passwordFormSchema>

interface DialogPerfilProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const DialogPerfil = ({ open, onOpenChange }: DialogPerfilProps) => {
  const currentUser = get_data()
  const [activeTab, setActiveTab] = useState('profile')

  // Formulario de perfil
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      nombre: currentUser?.nombre || '',
      correo: currentUser?.correo || '',
      descripcion: currentUser?.descripcion || '',
    },
  })

  // Formulario de contraseña
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const handleProfileSubmit = async (data: ProfileFormValues) => {
    try {
      // Actualizar datos en el almacenamiento
      update_data({
        ...currentUser,
        ...data
      })
      
      toast({
        title: "Perfil actualizado",
        description: "Tus datos se han actualizado correctamente.",
      })
      
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al actualizar tu perfil.",
        variant: "destructive",
      })
    }
  }

  const handlePasswordSubmit = async (data: PasswordFormValues) => {
    try {
      // Aquí iría la lógica para cambiar la contraseña en el backend
      // Por ahora solo simulamos la actualización
      
      toast({
        title: "Contraseña actualizada",
        description: "Tu contraseña se ha cambiado correctamente.",
      })
      
      passwordForm.reset()
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "La contraseña actual es incorrecta.",
        variant: "destructive",
      })
    }
  }

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