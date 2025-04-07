import { Button } from "@/components/ui/button"
import { Table as TableType } from "@tanstack/react-table"
import { EventHistorico } from "@/components/interface/eventohistorico"

interface Props {
  table: TableType<EventHistorico>
}

export const EventPagination = ({ table }: Props) => (
  <div className="flex items-center justify-between py-4">
    <div className="text-sm text-muted-foreground">
      Mostrando {table.getFilteredRowModel().rows.length} eventos
      {table.getFilteredSelectedRowModel().rows.length > 0 && (
        <span>, {table.getFilteredSelectedRowModel().rows.length} seleccionados</span>
      )}
    </div>
    <div className="space-x-2">
      <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
        Anterior
      </Button>
      <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
        Siguiente
      </Button>
    </div>
  </div>
)
