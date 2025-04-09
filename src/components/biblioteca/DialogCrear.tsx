import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { FormBiblio } from "./FormBiblio"
import { useAtom } from "jotai"
import { useEffect } from "react"
import { apiService } from "@/services/apiService"
import { toast } from "sonner"
import { bibliotecaAtom } from "@/context/context"

interface DialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export const DialogCrear = ({ open, onOpenChange }: DialogProps) => {

    const [, setCultura] = useAtom(bibliotecaAtom)

    useEffect(() => {
        setCultura(undefined)
    }, [open])

    const handleSubmit = async (data: any) => {
        console.log("Formulario enviado:", data)

       await apiService.post("bibliotecas",{
        titulo: data.titulo,
        autor: data.autor,
        imagen: data.imagen,
        fecha_publicacion: data.fecha_publicacion,
        edicion: data.edicion,
        id_tipo: data.id_tipo,
        fuente: data.fuente,
        enlace: data.enlace,
        }).then((response) => {
            console.log(response)
            toast.success("Libro creado correctamente")
            onOpenChange(false)
        })
        .catch((error) => {
            console.log(error)
            toast.error("Error al crear")
        }
        ).finally(() => {
            setCultura(undefined)
        }
        )   

       

    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full max-w-4xl h-[90vh] flex flex-col p-0 rounded-lg overflow-hidden">
                <div className="flex flex-col h-full">
                    <DialogHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
                        <DialogTitle className="text-2xl font-bold">
                            Agregar Libro
                        </DialogTitle>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto px-6">
                        <FormBiblio
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
