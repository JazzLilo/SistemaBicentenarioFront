import React from 'react'
import { apiService } from '@/services/apiService'
import { Presidente } from '@/components/interface'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, Flag, Landmark } from 'lucide-react'

export const Presidentes = () => {
  const [presidentes, setPresidentes] = React.useState<Presidente[]>([])

  const fetchPresidentes = async () => {
    await apiService.get('/presidentes')
      .then((res) => {
        setPresidentes(res.data as Presidente[])
      })
      .catch((err: any) => {
        console.log(err)
      })
  }

  React.useEffect(() => {
    fetchPresidentes()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="p-6">
      <header className='cultural-header'>
        <h1 className="text-3xl font-bold">Presidentes</h1>
        </header>
      <div className="flex justify-between items-center mb-6">
        
        <Button onClick={fetchPresidentes} variant="outline">
          Actualizar lista
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {presidentes.map((presidente) => (
          <Card key={presidente.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={presidente.imagen} />
                <AvatarFallback>
                  {presidente.nombre[0]}{presidente.apellido[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{presidente.nombre} {presidente.apellido}</CardTitle>
                <CardDescription className="mt-1">
                  <Landmark className="inline h-4 w-4 mr-1" />
                  {presidente.partido_politico}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4 mr-2" />
                {formatDate(presidente.periodo_inicio)} -{' '}
                {presidente.periodo_fin ? formatDate(presidente.periodo_fin) : 'Actualidad'}
              </div>

              <Separator className="my-2" />

              <p className="text-sm line-clamp-3">
                {presidente.biografia}
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                {presidente.politicas_clave.split(',').map((politica, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    <Flag className="h-3 w-3 mr-1" />
                    {politica.trim()}
                  </Badge>
                ))}
              </div>
            </CardContent>

            <CardFooter className="text-xs text-muted-foreground">
              ID #{presidente.id}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}