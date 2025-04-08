import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { FormP } from "./FormP"
import { useAtom } from "jotai"
import { presidenteAtom } from '@/context/context'
import { useEffect } from "react"
import { apiService } from "@/services/apiService"
import { toast } from "sonner"
interface DialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export const DialogCrear = ({ open, onOpenChange }: DialogProps) => {

    const [, setPresidente] = useAtom(presidenteAtom)

    useEffect(() => {
        setPresidente(undefined)
    }, [open])


    const handleSubmit = async (data: any) => {
        console.log("Formulario enviado:", data)
        /*
            "nombre": "string",
  "apellido": "string",
  "imagen": "string",
  "periodo_inicio": "2025-04-07T17:40:15.532Z",
  "periodo_fin": "2025-04-07T17:40:15.532Z",
  "biografia": "string",
  "partido_politico": "string",
  "politicas_clave": "string"
        */
        await apiService.post('presidentes',{
            nombre: data.nombre,
            apellido: data.apellido,
            imagen: data.imagen,
            periodo_inicio: data.periodo_inicio,
            periodo_fin: data.periodo_fin,
            biografia: data.biografia,
            partido_politico: data.partido_politico,
            politicas_clave: data.politicas_clave
        }).then((res) => {
            console.log(res.data)
            const data:any = res.data
            setPresidente(data)
            toast.success("Presidente creado correctamente")
            onOpenChange(false)
        }).catch((err) => {
            console.log(err)
            toast.error("Error al crear el presidente")
        })

    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full max-w-4xl h-[90vh] flex flex-col p-0 rounded-lg overflow-hidden">
                <div className="flex flex-col h-full">
                    <DialogHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
                        <DialogTitle className="text-2xl font-bold">
                            Agregar un nuevo Presidente
                        </DialogTitle>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto px-6">
                        <FormP
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
