import { Presidente } from "../interface/presidente"
import { useState, useEffect } from "react"
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
import { Plus, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import { apiService } from "@/services/apiService"
import { DialogCrear } from "./DialogCrear"
import { DialogDetalles } from "./DialogDetalles"
import { useAtom } from "jotai"
import { presidenteAtom } from "@/context/context"


const PresidentesManagement = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [pres, setPres] = useState<Presidente[]>([])
  const [loading, setLoading] = useState(false)
  const [globalFilter, setGlobalFilter] = useState('')



  const [open, setOpen] = useState(false)
  const [openCrear, setOpenCrear] = useState(false)
  const [, setSelectedPres] = useState<Presidente | null>(null)
  const [, setPresidente] = useAtom(presidenteAtom)
  const columns: ColumnDef<Presidente>[] = [
    {
      accessorKey: "nombre",
      header: "Nombre del Evento",
      cell: ({ row }) => {
        const nombre = row.original.nombre || "Sin nombre"
        const apellido = row.original.apellido || "Sin apellido"
        return `${nombre} ${apellido}`
      }
    },
    {
      accessorKey: "periodo",
      header: "Periodo",
      cell: ({ row }) => {
        const inicio = new Date(row.original.periodo_inicio).toLocaleDateString();
        const fin = new Date(row.original.periodo_fin).toLocaleDateString();
        return `${inicio} - ${fin}`;
      }
    },
    {
      accessorKey: "partido_politico",
      header: "Partido Politico",
      cell: ({ row }) => {
        return row.original.partido_politico || "Sin partido"
      }
    },
    {
      accessorKey: "acciones",
      header: "Acciones",
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">

            <Button variant="outline" size="sm" onClick={() => {
              setSelectedPres(row.original)
              setPresidente(row.original)
              setOpen(true)
            }}>
              Ver
            </Button>
            <Button variant="destructive" size="sm" onClick={() => handleRemove(row.original.id)}>
              Eliminar
            </Button>
          </div>
        )
      }
    }
  ]

  const handleRemove = async (id: number) => {
    await apiService.delete(`presidentes/${id}`).then(() => {
      fetchPresidentes()
      toast.success("Presidente eliminado correctamente")
    }
    ).catch((err: any) => {
      console.log(err)
      toast.error("Error al eliminar el presidente")
    })
  }

  const fetchPresidentes = async () => {
    setLoading(true)
    await apiService.get('presidentes/?skip=0&limit=100').then((res) => {
      setPres(res.data as Presidente[])
      setLoading(false)
    }
    ).catch((err: any) => {
      console.log(err)
      setLoading(false)
      toast.error("Error al cargar los presidentes")
    })
  }
  useEffect(() => {
    fetchPresidentes()
  }, [])

  const table = useReactTable({
    data: pres,
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
            placeholder="Buscar Presidentes..."
            value={globalFilter ?? ''}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="max-w-md"
          />
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={fetchPresidentes}
            disabled={loading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Actualizar
          </Button>
          <Button
            onClick={() => setOpenCrear(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Agregar Presidente
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
      {openCrear && (
        <DialogCrear open={openCrear} onOpenChange={setOpenCrear} />
      )}
      {open && (
        <DialogDetalles open={open} onOpenChange={setOpen} />
      )}
    </div>
  )
}

export default PresidentesManagement
