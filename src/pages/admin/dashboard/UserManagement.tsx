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
import {  Plus, RefreshCw } from "lucide-react"
import { DialogUserEdit } from "./edit/DialogUserEdit"
import { apiService } from "@/services/apiService"
import { User } from "@/components/interface/user"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { DialogUserCreate } from "./edit/DialogUserCreate"
import { DialogRoleAdd } from "./edit/DialogRoleAdd"

export const UserManagement = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [openUser, setOpenUser] = useState(false)
  const [openUserC, setOpenUserC] = useState(false)
  const [openRole, setOpenRole] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const [globalFilter, setGlobalFilter] = useState('')

  const handleSelectUser = (user: User) => {
    setSelectedUser(user)
    setOpenUser(true)
  }

  const handleDeleteUser = async (userId: number) => {
    try {
      await apiService.delete(`users/${userId}`)
      toast.success("Usuario eliminado correctamente")
      fetchUsers()
    } catch (error) {
      console.error(error)
      toast.error("Error al eliminar el usuario")
    }
  }

  const columns: ColumnDef<User>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={(value) => table.toggleAllPageRowsSelected(!!value.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={(value) => row.toggleSelected(!!value.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "nombre",
      header: "Nombre Completo",
      cell: ({ row }) => {
        const user = row.original
        return (
          <div className="font-medium">
            {user.nombre} {user.apellidoPaterno} {user.apellidoMaterno}
          </div>
        )
      },
    },
    {
      accessorKey: "correo",
      header: "Correo",
      cell: ({ row }) => (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {row.getValue("correo")}
          {row.original.email_verified_at && (
            <Badge className="ml-2" variant="outline">
              Verificado
            </Badge>
          )}
        </div>
      ),
    },
    {
      accessorKey: "telefono",
      header: "Teléfono",
      cell: ({ row }) => (
        <div>{row.getValue("telefono") || '-'}</div>
      ),
    },
    {
      accessorKey: "ciudad",
      header: "Ubicación",
      cell: ({ row }) => (
        <div>
          {row.getValue("ciudad")}, {row.original.pais}
        </div>
      ),
    },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ row }) => (
        <Badge variant={row.getValue("estado") ? "default" : "destructive"}>
          {row.getValue("estado") ? "Activo" : "Inactivo"}
        </Badge>
      ),
    },
    {
      accessorKey: "ultimoIntentoFallido",
      header: "Último Intento",
      cell: ({ row }) => (
        <div className="text-xs">
          {row.original.cantIntentos > 0 ? (
            <>
              <span className="text-red-500">{row.original.cantIntentos} intentos</span>
              <br />
              {new Date(row.getValue("ultimoIntentoFallido")).toLocaleString()}
            </>
          ) : '-'}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const user = row.original

        return (
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleSelectUser(user)}
            >
              Editar
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                setSelectedUser(user)
                setOpenRole(true)
              }}
            >
              Roles
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-red-50 text-red-600 hover:bg-red-100"
              onClick={() => handleDeleteUser(user.id)}
            >
              Eliminar
            </Button>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: users,
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

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await apiService.get('users/?skip=0&limit=100')
      setUsers(response.data as User[])
    } catch (error) {
      console.error(error)
      toast.error("Error al cargar los usuarios")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Gestión de Usuarios</h3>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={fetchUsers}
            disabled={loading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Actualizar
          </Button>
          <Button  onClick={() => setOpenUserC(true)}  >
            <Plus className="mr-2 h-4 w-4" />
            Agregar Usuario
          </Button>
        </div>
      </div>

      <div className="flex items-center py-4 space-x-2">
        <Input
          placeholder="Buscar en todos los campos..."
          value={globalFilter ?? ''}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-md"
        />
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
                  {loading ? 'Cargando usuarios...' : 'No hay usuarios registrados'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          Mostrando {table.getFilteredRowModel().rows.length} usuarios
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

      <DialogUserEdit 
        open={openUser} 
        onOpenChange={setOpenUser} 
        user={selectedUser || undefined}
      />
      <DialogUserCreate
        open={openUserC} 
        onOpenChange={setOpenUserC}
      />
      {selectedUser && (
        <DialogRoleAdd 
          open={openRole} 
          onOpenChange={setOpenRole}
          userData={selectedUser}
        />
      )}

    </div>
  )
}