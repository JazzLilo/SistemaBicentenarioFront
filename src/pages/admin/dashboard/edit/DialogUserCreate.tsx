import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"

import { FormUserAdm } from "@/components/form/FormUserAdm"


interface DialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export const DialogUserCreate = (
    { open, onOpenChange }: DialogProps
) => {
  
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Editar Perfil</DialogTitle>
                    <DialogDescription>
                        Actualiza los datos del usuario.
                    </DialogDescription>
                </DialogHeader>
                <FormUserAdm
                    onSuccess={() => {
                        console.log("Usuario actualizado")
                        onOpenChange(false)
                    }}
                    mode="create"
                />
            </DialogContent>
        </Dialog>
    )
}
