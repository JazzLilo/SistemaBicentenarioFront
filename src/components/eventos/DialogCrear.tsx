import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { FormEvento } from "./FormEvento"
import { useAtom } from "jotai"
import { useEffect } from "react"
import { apiService } from "@/services/apiService"
import { toast } from "sonner"
import { eventoAtom } from "@/context/context"

interface DialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export const DialogCrear = ({ open, onOpenChange }: DialogProps) => {

    const [, setCultura] = useAtom(eventoAtom)

    useEffect(() => {
        setCultura(undefined)
    }, [open])

    const handleSubmit = async (data: any) => {
        console.log("Formulario enviado:", data)
        apiService.post('ubicaciones', data.ubicacion).then((res) => {
            console.log(res.data)
            const ubicacion_id = res.data
            apiService.post('eventos-agendables/', {
                nombre: data.nombre,
                categoria: data.categoria,
                estado: data.estado,
                descripcion: data.descripcion,
                fecha_hora: data.fecha_hora,
                id_ubicacion: ubicacion_id,
                id_organizador: data.id_organizador,
                imagen: data.imagen
            }).then((res) => {
                console.log(res.data)
                toast.success("Evento creado correctamente")
                onOpenChange(false)
            }).catch((err) => {
                console.log(err)
                toast.error("Error al crear")
            })
        }).catch((err) => {
            console.log(err)
            toast.error("Error al crear ")
        }).finally(() => {
            onOpenChange(false)
        })

 


    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full max-w-4xl h-[90vh] flex flex-col p-0 rounded-lg overflow-hidden">
                <div className="flex flex-col h-full">
                    <DialogHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
                        <DialogTitle className="text-2xl font-bold">
                            Agregar Evento
                        </DialogTitle>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto px-6">
                        <FormEvento
                            mode="create"
                            onSubmit={handleSubmit}
                        />
                    </div>

                    <div className="border-t bg-gray-50 px-6 py-3 flex justify-end">
                        <button
                            onClick={() => onOpenChange(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
