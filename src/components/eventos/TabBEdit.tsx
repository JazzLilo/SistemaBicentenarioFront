import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import  {DetallesEvento}  from './Detalles'
import { FormEvento } from './FormEvento'
import { apiService } from "@/services/apiService";
import { toast } from "sonner";


export const TabPEdit = () => {

  const handleUpdate = async (data: any) => {

    console.log(data)
   
    await apiService.put(`bibliotecas/${data.id}`, {
      titulo: data.titulo,
        autor: data.autor,
        imagen: data.imagen,
        fecha_publicacion: data.fecha_publicacion,
        edicion: data.edicion,
        id_tipo: data.id_tipo,
        fuente: data.fuente,
        enlace: data.enlace,
    }).then((response) => {
      console.log(response)
      toast.success("Libro actualizado correctamente")
    });
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
      </TabsList>

      <div className="mt-6 flex-1 overflow-y-auto">
        <TabsContent value="detalles" className="focus-visible:outline-none h-full">
          <DetallesEvento />
        </TabsContent>
        <TabsContent value="editar" className="focus-visible:outline-none h-full">
          <FormEvento
            mode="edit"
            onSubmit={handleUpdate}
          />
        </TabsContent>
      </div>
    </Tabs>
  )
}
