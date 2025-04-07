import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, RefreshCw } from "lucide-react"

interface Props {
  globalFilter: string
  onFilterChange: (value: string) => void
  onRefresh: () => void
  loading: boolean
  onAddEvent: () => void
}

export const EventToolbar = ({ globalFilter, onFilterChange, onRefresh, loading, onAddEvent }: Props) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center py-4 space-x-2">
      <Input
        placeholder="Buscar eventos..."
        value={globalFilter}
        onChange={(e) => onFilterChange(e.target.value)}
        className="max-w-md"
      />
    </div>
    <div className="flex space-x-2">
      <Button variant="outline" onClick={onRefresh} disabled={loading}>
        <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        Actualizar
      </Button>
      <Button onClick={onAddEvent}>
        <Plus className="mr-2 h-4 w-4" />
        Agregar Evento
      </Button>
    </div>
  </div>
)
