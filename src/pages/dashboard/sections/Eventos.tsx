import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mapa } from "./Mapa"
import Historia from "./Historia"
import TimeLine from "./TimeLine"
import { MapPinned, BookOpen, Clock } from "lucide-react"

function Eventos() {
  return (
    <div className="w-full">

      <Tabs defaultValue="mapa" className="w-full">
        <TabsList className="flex bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <TabsTrigger
            value="mapa"
            className="flex-1 data-[state=active]:bg-white data-[state=active]:text-blue-600 px-4 py-3 flex items-center justify-center gap-2 font-semibold transition-colors"
          >
            <MapPinned size={18} />
            Mapa
          </TabsTrigger>
          <TabsTrigger
            value="historias"
            className="flex-1 data-[state=active]:bg-white data-[state=active]:text-blue-600 px-4 py-3 flex items-center justify-center gap-2 font-semibold transition-colors"
          >
            <BookOpen size={18} />
            Historias
          </TabsTrigger>
          <TabsTrigger
            value="timeline"
            className="flex-1 data-[state=active]:bg-white data-[state=active]:text-blue-600 px-4 py-3 flex items-center justify-center gap-2 font-semibold transition-colors"
          >
            <Clock size={18} />
            Línea de Tiempo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mapa" className="p-6 bg-gray-50">
          <Mapa />
        </TabsContent>
        <TabsContent value="historias" className="p-6 bg-gray-50">
          <Historia />
        </TabsContent>
        <TabsContent value="timeline" className="p-6 bg-gray-50">
          <TimeLine />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Eventos
