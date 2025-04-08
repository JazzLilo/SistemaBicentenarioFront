import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Multimedia } from './Multimedia'
import { Detalles } from './Detalles'
import { EventHistoricoForm } from './FormEH'
import ErrorBoundary from '@/components/ErrorBoundary';
import { apiService } from "@/services/apiService";
import { useAtom } from "jotai"
import { eventohistoricoAtom } from '@/context/context'
import { toast } from "sonner";

export const TabEHist = () => {

  const [eventohistorico] = useAtom(eventohistoricoAtom)

  const handleUpdate = async (data:any) => {
    console.log("Formulario enviado:", data)
    let id_ubicacion = eventohistorico?.ubicacion.id
    if(eventohistorico?.ubicacion.latitud != data.ubicacion.latitud || eventohistorico?.ubicacion.longitud != data.ubicacion.longitud){
      await apiService.post(`ubicaciones`, {
        nombre: data.ubicacion.nombre,
        latitud: data.ubicacion.latitud,
        longitud: data.ubicacion.longitud,
        descripcion: data.ubicacion.descripcion,
        imagen: data.ubicacion.imagen,
      })
      .then((response) => {console.log(response);          
          id_ubicacion = response.data as any;
      })
      .catch((error) => {console.log(error)});
    }
    else{
      await apiService.put(`ubicaciones/${data.ubicacion.id}`, data.ubicacion)
    .then((response) => {console.log(response);
    })
    .catch((error) => {console.log(error)});
    }
    await apiService.put(`eventos_historicos/${data.id}`, {
      nombre: data.nombre,
      fecha_inicio: data.fecha_inicio,
      fecha_fin: data.fecha_fin,
      id_ubicacion: id_ubicacion,
      descripcion: data.descripcion,
      tipo: data.tipo
    })
    .then((response) => {console.log(response)
      toast.success("Evento actualizado correctamente")
    })
    .catch((error) => {console.log(error)});
  }



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
            onSubmit={handleUpdate}
          />
        </TabsContent>
        <TabsContent value="multimedia" className="focus-visible:outline-none h-full">
        <ErrorBoundary>
    <Multimedia />
  </ErrorBoundary>
        </TabsContent>
      </div>
    </Tabs>
  )
}