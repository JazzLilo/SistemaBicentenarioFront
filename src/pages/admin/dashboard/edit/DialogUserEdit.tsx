import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"

import { FormUserAdm } from "@/components/form/FormUserAdm"
import { User } from "@/components/interface/user"
import { useEffect } from "react"

interface DialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    user?: User
}

export const DialogUserEdit = (
    { open, onOpenChange, user }: DialogProps
) => {

    useEffect(() => {
        if (open) {
            console.log("Usuario seleccionado:", user)
        }
    },[open]    )
    
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
                    userData={user} 
                    onSuccess={() => {
                        console.log("Usuario actualizado")
                        onOpenChange(false)
                    }}
                />
            </DialogContent>
        </Dialog>
    )
}
