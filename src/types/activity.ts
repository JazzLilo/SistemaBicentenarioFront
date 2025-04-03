export type Activity = {
    id: string
    user: string
    action: string
    date: string
    status: "Completado" | "Pendiente" | "Fallido"
  }