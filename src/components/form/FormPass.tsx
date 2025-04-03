import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
    DialogFooter
  } from "@/components/ui/dialog"

import { apiService } from '@/services/apiService'
import { get_data } from '@/storage/auth_storage'

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
type PasswordFormValues = z.infer<typeof passwordFormSchema>

export const FormPass = () => {

      const passwordForm = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordFormSchema),
        defaultValues: {
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        },
      })
    
      const handlePasswordSubmit = async (data: PasswordFormValues) => {
        try {
          await apiService.put(`users/update_password/${get_data().correo}`, {
            "old_password": data.currentPassword,
            "new_password": data.newPassword
          }).then((response) => {
            console.log(response)
          }
          ).catch((error) => {
            console.log(error.response)
            toast.error("Error al cambiar la contraseña")
          });
          toast.success("Cambiar contraseña exitosa")
          
          passwordForm.reset()
        } catch (error) {
          toast.error("Error al cambiar la contraseña")
        }
      }

  return (
    <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-4">
                <FormField
                  control={passwordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña actual</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Tu contraseña actual" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nueva contraseña</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Nueva contraseña" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar contraseña</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Confirma tu nueva contraseña" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="submit">Cambiar contraseña</Button>
                </DialogFooter>
              </form>
            </Form>
  )
}
