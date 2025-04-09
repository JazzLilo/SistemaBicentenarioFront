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
import { culturaAtom } from "@/context/context"
import { Cultura } from "../interface"
export const CulturaManagement = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [culturas, setCulturas] = useState<Cultura[]>([])
  const [loading, setLoading] = useState(false)
  const [globalFilter, setGlobalFilter] = useState('')

  const [open, setOpen] = useState(false)
  const [openCrear, setOpenCrear] = useState(false)
  const [, setSelectedCultura] = useState<Cultura | null>(null)
  const [, setCultura] = useAtom(culturaAtom)

  const fetchCulturas = async () => {
    setLoading(true)
    await apiService.get("culturas").then((response) => {
      const data: any = response.data
      setCulturas(data)
    }).catch((error) => {
      console.log(error)
      toast.error("Error al cargar las culturas")
    }).finally(() => {
      setLoading(false)
    })
  }
  useEffect(() => {
    fetchCulturas()
  }
    , [])



  const columns: ColumnDef<Cultura>[] = [
    {
      accessorKey: "nombre",
      header: "Nombre",
      cell: ({ row }) => {
        const nombre = row.original.nombre || "Sin nombre"
        return `${nombre}`
      }
    },
    {
      accessorKey: "ubicacion.nombre",
      header: "Ubicación",
      cell: ({ row }) => {
        return row.original.ubicacion.nombre || "Sin partido"
      }
    },
    {
      accessorKey: "acciones",
      header: "Acciones",
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">

            <Button variant="outline" size="sm" onClick={() => {
              setSelectedCultura(row.original)
              setCultura(row.original)
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

  const table = useReactTable({
    data: culturas,
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

  const handleRemove = async (id: number) => {
    setLoading(true)

    await apiService.delete(`culturas/${id}`).then((response) => {
      console.log(response)
      fetchCulturas()
      toast.success("Cultura eliminada correctamente")
    }).catch((error) => {
      console.log(error)
      toast.error("Error al eliminar la cultura")
    }).finally(() => {
      setLoading(false)
    }
    )

  }


  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center py-4 space-x-2">
          <Input
            placeholder="Buscar..."
            value={globalFilter ?? ''}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="max-w-md"
          />
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={fetchCulturas}
            disabled={loading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Actualizar
          </Button>
          <Button
            onClick={() => setOpenCrear(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Agregar Cultura
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
                  {loading ? 'Cargando ...' : 'No hay eventos registrados'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          Mostrando {table.getFilteredRowModel().rows.length} Culturas
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
