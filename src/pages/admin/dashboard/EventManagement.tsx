import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { Plus, RefreshCw } from "lucide-react"
import { apiService } from "@/services/apiService"
import { EventHistorico } from "@/components/interface/eventohistorico"
import { toast } from "sonner"

export const EventManagement = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [events, setEvents] = useState<EventHistorico[]>([])
  const [loading, setLoading] = useState(false)
  const [globalFilter, setGlobalFilter] = useState('')

  const columns: ColumnDef<EventHistorico>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "nombre",
      header: "Nombre del Evento",
    },
    {
      accessorKey: "fecha_inicio",
      header: "Fecha Inicio",
      cell: ({ row }) => {
        return new Date(row.getValue("fecha_inicio")).toLocaleDateString()
      }
    },
    {
      accessorKey: "fecha_fin",
      header: "Fecha Fin",
      cell: ({ row }) => {
        return new Date(row.getValue("fecha_fin")).toLocaleDateString()
      }
    },
    {
      accessorKey: "tipo",
      header: "Tipo de Evento",
    },
    {
      accessorKey: "ubicacion.nombre",
      header: "Ubicación",
      cell: ({ row }) => {
        return row.original.ubicacion?.nombre || "Sin ubicación"
      }
    },
    {
      accessorKey: "acciones",
      header: "Acciones",
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => console.log("Ver detalles", row.original)}>
              Ver Detalles
            </Button>
            <Button variant="outline" size="sm" onClick={() => console.log("Editar evento", row.original)}>
              Editar
            </Button>
            <Button variant="destructive" size="sm" onClick={() => console.log("Eliminar evento", row.original)}>
              Eliminar
            </Button>
          </div>
        )
      }
    }
  ]

  const fetchEventos = async () => {
    setLoading(true)
      await apiService.get('eventos_historicos/?skip=0&limit=100').then
      (response => {
        setEvents(response.data as EventHistorico[])
    }).catch((error: any) => {
      console.error(error);
      toast.error("Error al cargar los eventos");
    });
    
  }

  useEffect(() => {
    fetchEventos()
  }, [])

  const table = useReactTable({
    data: events,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  })

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center py-4 space-x-2">
          <Input
            placeholder="Buscar eventos..."
            value={globalFilter ?? ''}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="max-w-md"
          />
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={fetchEventos}
            disabled={loading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Actualizar
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Agregar Evento
          </Button>
        </div>
      </div>



      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {loading ? 'Cargando eventos...' : 'No hay eventos registrados'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          Mostrando {table.getFilteredRowModel().rows.length} eventos
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <span>, {table.getFilteredSelectedRowModel().rows.length} seleccionados</span>
          )}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}