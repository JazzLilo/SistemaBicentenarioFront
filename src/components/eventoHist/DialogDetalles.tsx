import { useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { EventHistorico } from '../interface/eventohistorico'
import { useAtom } from 'jotai'
import { eventohistoricoAtom } from "@/context/context"
import { TabEHist } from './TabEHist'

interface DialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    evento?: EventHistorico
}

export const DialogDetalles = ({ open, onOpenChange, evento }: DialogProps) => {
    const [, setEventohistorico] = useAtom(eventohistoricoAtom)

    useEffect(() => {
        if (evento) {
            setEventohistorico(evento)
        }
    }, [evento, setEventohistorico])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full max-w-4xl h-[90vh] flex flex-col p-0 rounded-lg overflow-hidden">
                <div className="flex flex-col h-full">
                    <DialogHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
                        <DialogTitle className="text-2xl font-bold">
                            Detalles del Evento Histórico
                        </DialogTitle>
                        <DialogDescription className="text-blue-100">
                            Información completa y opciones de gestión
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto px-6">
                        <TabEHist />
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