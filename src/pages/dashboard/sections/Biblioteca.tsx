import { useState, useEffect } from 'react'
import { apiService } from '@/services/apiService'
import { Biblioteca } from '@/components/interface'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Terminal } from "lucide-react"

export const BibliotecaShow = () => {
  const [biblioteca, setBiblioteca] = useState<Biblioteca[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const fetchBiblioteca = async () => {
    try {
      const response : any = await apiService.get('bibliotecas/?skip=0&limit=100')
      setBiblioteca(response.data)
    } catch (error) {
      setError("Error al cargar los libros. Intente nuevamente más tarde.")
      console.error("Error fetching biblioteca:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBiblioteca()
  }, [])

  const filteredBooks = biblioteca.filter(book =>
    book.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.autor.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Biblioteca Digital</h1>
        <Input
          placeholder="Buscar libros por título o autor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-2xl"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[400px] rounded-xl" />
          ))}
        </div>
      ) : (
        <>
          {filteredBooks.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold">No se encontraron libros</h2>
              <p className="text-muted-foreground">Intenta con otro término de búsqueda</p>
            </div>
          ) : (
            <>
              <Carousel className="mb-12">
                <CarouselContent>
                  {filteredBooks.slice(0, 5).map((book) => (
                    <CarouselItem key={book.id} className="md:basis-1/2 lg:basis-1/3">
                      <Card className="h-full">
                        <img
                          src={book.imagen}
                          alt={book.titulo}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <CardHeader>
                          <CardTitle className="truncate">{book.titulo}</CardTitle>
                          <CardDescription className="truncate">{book.autor}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>{book.edicion}</span>
                            <span>{book.fecha_publicacion}</span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full" asChild>
                            <a href={book.enlace} target="_blank" rel="noopener noreferrer">
                              Leer
                            </a>
                          </Button>
                        </CardFooter>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                  <Card key={book.id} className="hover:shadow-lg transition-shadow">
                    <img
                      src={book.imagen}
                      alt={book.titulo}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <CardHeader>
                      <CardTitle className="truncate">{book.titulo}</CardTitle>
                      <CardDescription className="truncate">{book.autor}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Edición:</span>
                          <span className="text-muted-foreground">{book.edicion}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Publicación:</span>
                          <span className="text-muted-foreground">
                            {book.fecha_publicacion}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Categoría:</span>
                          <span className="text-muted-foreground">
                            {book.tipo.tipo}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" asChild>
                        <a href={book.enlace} target="_blank" rel="noopener noreferrer">
                          Leer PDF
                        </a>
                      </Button>
                    
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}