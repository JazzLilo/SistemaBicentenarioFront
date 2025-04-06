import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Multimedia } from './Multimedia'
import { Detalles } from './Detalles'
import { EventHistoricoForm } from './FormEH'

export const TabEHist = () => {
  return (
    <Tabs defaultValue="detalles" className="w-full h-full flex flex-col">
      <TabsList className="grid grid-cols-3 w-full bg-gray-100 p-1 rounded-lg">
        <TabsTrigger 
          value="detalles" 
          className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2 rounded-md transition-all"
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Detalles
          </span>
        </TabsTrigger>
        <TabsTrigger 
          value="editar" 
          className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2 rounded-md transition-all"
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Editar
          </span>
        </TabsTrigger>
        <TabsTrigger 
          value="multimedia" 
          className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2 rounded-md transition-all"
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Multimedia
          </span>
        </TabsTrigger>
      </TabsList>

      <div className="mt-6 flex-1 overflow-y-auto">
        <TabsContent value="detalles" className="focus-visible:outline-none h-full">
          <Detalles />
        </TabsContent>
        <TabsContent value="editar" className="focus-visible:outline-none h-full">
          <EventHistoricoForm
            mode="edit"
            onSubmit={() => {}}
          />
        </TabsContent>
        <TabsContent value="multimedia" className="focus-visible:outline-none h-full">
          <Multimedia />
        </TabsContent>
      </div>
    </Tabs>
  )
}