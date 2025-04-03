
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"

export type Activity = {
  id: string
  user: string
  action: string
  date: string
  status: "Completado" | "Pendiente" | "Fallido"
}

const columns: ColumnDef<Activity>[] = [
  {
    accessorKey: "user",
    header: "Usuario",
  },
  {
    accessorKey: "action",
    header: "Acción",
  },
  {
    accessorKey: "date",
    header: "Fecha",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"))
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue("status") as Activity["status"]
      
      const statusClasses = {
        Completado: "bg-green-100 text-green-800",
        Pendiente: "bg-yellow-100 text-yellow-800",
        Fallido: "bg-red-100 text-red-800",
      }
      
      return (
        <span className={`px-2 py-1 rounded-full text-xs ${statusClasses[status]}`}>
          {status}
        </span>
      )
    },
  },
]

const data: Activity[] = [
  {
    id: "1",
    user: "Juan Pérez",
    action: "Creó un evento",
    date: "2023-06-15",
    status: "Completado",
  },
  {
    id: "2",
    user: "María Gómez",
    action: "Actualizó noticia",
    date: "2023-06-14",
    status: "Completado",
  },
  {
    id: "3",
    user: "Carlos Ruiz",
    action: "Subió recurso",
    date: "2023-06-13",
    status: "Pendiente",
  },
]

export function ActivityTable() {
  return <DataTable columns={columns} data={data} />
}