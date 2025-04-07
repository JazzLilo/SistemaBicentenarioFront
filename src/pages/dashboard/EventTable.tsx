import { flexRender, Table as TableType } from "@tanstack/react-table"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { EventHistorico } from "@/components/interface/eventohistorico"

interface Props {
  table: TableType<EventHistorico>
  columnsLength: number
  loading: boolean
  onView: (evento: EventHistorico) => void
  onDelete: (evento: EventHistorico) => void
}

export const EventTable = ({ table, columnsLength, loading, onView, onDelete }: Props) => (
  <div className="rounded-md border">
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columnsLength} className="h-24 text-center">
              {loading ? "Cargando eventos..." : "No hay eventos registrados"}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>
)
