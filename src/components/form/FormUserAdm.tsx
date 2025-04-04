import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogFooter } from "@/components/ui/dialog"
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
import { get_data, save_data } from '@/storage/auth_storage'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { apiService } from '@/services/apiService'
import { User } from "@/components/interface/user"

const userFormSchema = z.object({
  nombre: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  apellidoPaterno: z.string().min(2, {
    message: "El apellido paterno debe tener al menos 2 caracteres.",
  }),
  apellidoMaterno: z.string().min(2, {
    message: "El apellido materno debe tener al menos 2 caracteres.",
  }).optional(),
  genero: z.string().min(1, {
    message: "Por favor selecciona un género.",
  }),
  telefono: z.string().min(6, {
    message: "El teléfono debe tener al menos 6 caracteres.",
  }).optional(),
  correo: z.string().email({
    message: "Por favor ingresa un correo válido.",
  }),
  pais: z.string().min(2, {
    message: "Por favor ingresa un país válido.",
  }),
  ciudad: z.string().min(2, {
    message: "Por favor ingresa una ciudad válida.",
  }),
  contrasena: z.string().min(0, {
    message: "La contraseña debe tener al menos 8 caracteres.",
  }).optional(),
  confirmarContrasena: z.string().optional()
}).refine(data => {
  if (!data.contrasena) return true
  return data.contrasena === data.confirmarContrasena
}, {
  message: "Las contraseñas no coinciden",
  path: ["confirmarContrasena"]
})

type UserFormValues = z.infer<typeof userFormSchema>

const GENDER_OPTIONS = [
  { value: 'masculino', label: 'Masculino' },
  { value: 'femenino', label: 'Femenino' },
  { value: 'otro', label: 'Otro' },
]

interface FormUserProps {
  userData?: User;
  onSuccess?: () => void;
  mode?: 'create' | 'edit';
}

export const FormUserAdm = ({ userData, onSuccess, mode = 'edit' }: FormUserProps) => {
  const isCreateMode = mode === 'create'
  const currentUser = get_data()

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: isCreateMode ? {
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      genero: '',
      telefono: '',
      correo: '',
      pais: '',
      ciudad: '',
      contrasena: '',
      confirmarContrasena: ''
    } : {
      nombre: userData?.nombre || '',
      apellidoPaterno: userData?.apellidoPaterno || '',
      apellidoMaterno: userData?.apellidoMaterno || '',
      genero: userData?.genero || '',
      telefono: userData?.telefono || '',
      correo: userData?.correo || '',
      pais: userData?.pais || '',
      ciudad: userData?.ciudad || '',
      contrasena: '',
      confirmarContrasena: ''
    }
  })

  const handleSubmit = async (data: UserFormValues) => {
    console.log("Datos del formulario:", data)
    try {
      if (isCreateMode) {
        // Lógica para creación de usuario
        const response = await apiService.post('users', {
          nombre: data.nombre,
          apellidoPaterno: data.apellidoPaterno,
          apellidoMaterno: data.apellidoMaterno,
          correo: data.correo,
          genero: data.genero,
          telefono: data.telefono,
          pais: data.pais,
          ciudad: data.ciudad,
          imagen: "default.jpg",
          contrasena: data.contrasena
        });
  
        if (response.data) { 
          toast.success("Usuario creado correctamente");
          if (onSuccess) onSuccess();
        } else {
          throw new Error("No se recibieron datos del servidor");
        }
      } else {
 
        const userId = userData?.id;
        if (!userId) {
          throw new Error("ID de usuario no proporcionado");
        }
  
        const response = await apiService.put(`users/${userId}`, {
          nombre: data.nombre,
          apellidoPaterno: data.apellidoPaterno,
          apellidoMaterno: data.apellidoMaterno,
          genero: data.genero,
          telefono: data.telefono,
          pais: data.pais,
          ciudad: data.ciudad,
          imagen: userData?.imagen || "default.jpg"
        });
  
        const updatedUser = response.data?.usuario || response.data;
        
        if (!updatedUser) {
          throw new Error("No se recibieron datos actualizados del servidor");
        }
  
        toast.success("Perfil actualizado correctamente");
        
        if (currentUser?.id === userId) {
          save_data(updatedUser);
        }
        
        if (onSuccess) onSuccess();
      }
    } catch (error: any) {
      console.error("Error detallado:", error);
      
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          `Ocurrió un error al ${isCreateMode ? 'crear' : 'actualizar'} el usuario`;
      
      toast.error(errorMessage);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre del usuario" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="apellidoPaterno"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellido Paterno</FormLabel>
                <FormControl>
                  <Input placeholder="Apellido paterno" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="apellidoMaterno"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellido Materno</FormLabel>
                <FormControl>
                  <Input placeholder="Apellido materno" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genero"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Género</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un género" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {GENDER_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telefono"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input placeholder="Número de teléfono" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="correo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="correo@ejemplo.com" 
                    {...field} 
                    disabled={!isCreateMode} // Solo editable en creación
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pais"
            render={({ field }) => (
              <FormItem>
                <FormLabel>País</FormLabel>
                <FormControl>
                  <Input placeholder="País de residencia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ciudad"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ciudad</FormLabel>
                <FormControl>
                  <Input placeholder="Ciudad de residencia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isCreateMode && (
            <>
              <FormField
                control={form.control}
                name="contrasena"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Mínimo 8 caracteres" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmarContrasena"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Contraseña</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Repite la contraseña" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>

        <DialogFooter>
          <Button type="submit">
            {'Guardar Cambios'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}