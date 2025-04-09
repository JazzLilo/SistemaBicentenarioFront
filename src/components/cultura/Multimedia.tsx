import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { apiService } from '@/services/apiService';
import { useAtom } from 'jotai';
import { culturaAtom } from '@/context/context';

export interface IMultimedia {
  url: string;
  tipo: 'arte' | 'musica' | 'literatura';
  id_evento_historico: number;
  id: number;
}

type NewItemType = {
  tipo: 'arte' | 'musica' | 'literatura';
  url?: string;
  file?: File | null;
  method: 'url' | 'upload';
  preview?: string;
};

export const Multimedia = () => {
  const [eve] = useAtom(culturaAtom);
  const [multimediaItems, setMultimediaItems] = useState<IMultimedia[]>([]);
  const [newItem, setNewItem] = useState<NewItemType>({
    tipo: 'arte',
    method: 'url',
    url: '',
    file: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<IMultimedia | null>(null);
  const [isGalleryLoading, setIsGalleryLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsGalleryLoading(true);
    try {
      const response:any = await apiService.get(`multimedia/cultura/${eve?.id}`);
      const sortedItems = response.data.sort((a: IMultimedia, b: IMultimedia) => b.id - a.id) ;
      setMultimediaItems(sortedItems);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsGalleryLoading(false);
    }
  }, [eve?.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const preview = URL.createObjectURL(file);

      setNewItem({
        ...newItem,
        file,
        url: undefined,
        preview: newItem.tipo === 'arte' ? preview : undefined
      });
    }
  };

  const validateUrl = (url: string, tipo: 'arte' | 'musica' | 'literatura') => {
    if (!url) return 'La URL no puede estar vacía';
    console.log('Validando URL:', url, tipo);
    try {
      new URL(url);
      return '';
    } catch {
      return 'La URL no es válida';
    }
  };

  const handleSaveItem = async () => {
    if (!eve?.id) return;

    const urlError = newItem.method === 'url' && validateUrl(newItem.url || '', newItem.tipo);
    if (urlError) {
      alert(urlError);
      return;
    }

    if (newItem.method === 'url' && !newItem.url) return;
    if (newItem.method === 'upload' && !newItem.file) return;

    setIsLoading(true);

    try {
      let fileUrl = newItem.url;

      if (newItem.method === 'upload' && newItem.file) {
        const formData = new FormData();
        formData.append('file', newItem.file);
        formData.append('name', `${eve.nombre}-multimedia`);
        formData.append('tipo', 'multimedia');

        const uploadResponse:any = await apiService.postFiles('files/upload', formData);
        fileUrl = uploadResponse.data.file_url;
      }

      if (editingItem) {
        await apiService.put(`multimedia/${editingItem.id}`, {
          url: fileUrl,
          tipo: newItem.tipo
        });
      } else {
        await apiService.post('multimedia/cultura', {
          url: fileUrl,
          tipo: newItem.tipo,
          id_evento_historico: eve.id
        });
      }

      // Limpiar el estado y recargar los datos
      setNewItem({
        tipo: 'arte',
        method: 'url',
        url: '',
        file: null,
        preview: undefined
      });
      setEditingItem(null);

      // Forzar recarga limpia de los datos
      setMultimediaItems([]); // Vaciar temporalmente la lista
      await fetchData(); // Recargar los datos frescos del servidor

    } catch (error) {
      console.error('Error al guardar multimedia:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveItem = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este elemento?')) return;

    try {
      await apiService.delete(`multimedia/${id}`);
      setMultimediaItems(multimediaItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error eliminando multimedia:', error);
    }
  };


  const cancelEditing = () => {
    setEditingItem(null);
    setNewItem({
      tipo: 'arte',
      method: 'url',
      url: '',
      file: null,
      preview: undefined
    });
  };


  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-medium">
          {editingItem ? 'Editar elemento multimedia' : 'Agregar nuevo elemento multimedia'}
        </h3>

        {/* Selector de método */}
        <div className="flex gap-4 mb-4">
          <Button
            variant={newItem.method === 'url' ? 'default' : 'outline'}
            onClick={() => setNewItem({ ...newItem, method: 'url', file: null, preview: undefined })}
          >
            Usar URL
          </Button>
          <Button
            variant={newItem.method === 'upload' ? 'default' : 'outline'}
            onClick={() => setNewItem({ ...newItem, method: 'upload', url: '' })}
          >
            Subir archivo
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Tipo</Label>
            <Select
              value={newItem.tipo}
              onValueChange={(value: 'arte' | 'musica' | 'literatura') =>
                setNewItem({ ...newItem, tipo: value, preview: undefined })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="arte">Arte</SelectItem>
                <SelectItem value="musica">Musica</SelectItem>
                <SelectItem value="Literatura">Literatura</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>{newItem.method === 'url' ? 'URL' : 'Archivo'}</Label>

            {newItem.method === 'url' ? (
              <div className="flex flex-col gap-2">
                <Input
                  value={newItem.url || ''}
                  onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                  placeholder={`https://ejemplo.com/${newItem.tipo === 'arte' ? 'imagen.jpg' : 'video.mp4'}`}
                />
                {newItem.url && newItem.tipo === 'arte' && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground mb-1">Vista previa:</p>
                    <img
                      src={newItem.url}
                      alt="Preview"
                      className="h-20 object-contain border rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      type="file"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                {newItem.preview && newItem.tipo === 'arte' && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground mb-1">Vista previa:</p>
                    <img
                      src={newItem.preview}
                      alt="Preview"
                      className="h-20 object-contain border rounded"
                    />
                  </div>
                )}
                {newItem.file && newItem.tipo === 'musica' && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground">
                      Archivo seleccionado: {newItem.file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Tamaño: {(newItem.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}
                {newItem.file && newItem.tipo === 'literatura' && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground mb-1">Vista previa:</p>
                    <iframe
                      src={newItem.preview}
                      className="h-20 w-full border rounded"
                      title="Preview"
                      onError={(e) => {
                        (e.target as HTMLIFrameElement).style.display = 'none';
                      }}
                    ></iframe>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          {editingItem && (
            <Button variant="outline" onClick={cancelEditing}>
              Cancelar
            </Button>
          )}
          <Button
            onClick={handleSaveItem}
            disabled={
              isLoading ||
              (newItem.method === 'url' && !newItem.url) ||
              (newItem.method === 'upload' && !newItem.file)
            }
          >
            {isLoading ? 'Guardando...' : editingItem ? 'Actualizar' : 'Agregar'}
          </Button>
        </div>
      </div>

      {/* Galería */}
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium mb-4">Galería Multimedia</h3>
        {isGalleryLoading ? (
          <div className="flex justify-center items-center h-40">
            <p>Cargando galería...</p>
          </div>) : (
          <>
            {multimediaItems.length === 0 ? (
              <p className="text-muted-foreground">No hay elementos multimedia aún</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {multimediaItems.map((item) => (
                  <div
                    key={`${item.id}-${item.url}`} // Key más única
                    className="border rounded-lg overflow-hidden relative group hover:shadow-md transition-shadow"
                  >
                    {item.tipo === 'arte' ? (
                      <img
                        src={item.url}
                        alt="Multimedia"
                        className="w-full h-40 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                          (e.target as HTMLImageElement).classList.add('object-contain');
                          (e.target as HTMLImageElement).classList.add('p-2');
                        }}
                      />
                    ) : (
                      <div className="w-full h-40 bg-gray-100 flex items-center justify-center relative">
                        <video className="absolute inset-0 w-full h-full object-cover" controls>
                          <source src={item.url} type={`video/${item.url.split('.').pop()}`} />
                          Tu navegador no soporta videos HTML5.
                        </video>
                        <span className="text-muted-foreground text-xs bg-background/80 px-2 py-1 rounded absolute bottom-2 left-2">
                          {item.url.split('/').pop()}
                        </span>
                      </div>
                    )}

                    <div className="p-3">
                      <p className="text-sm font-medium capitalize">{item.tipo}</p>
                      <p className="text-xs text-muted-foreground truncate">{item.url}</p>
                    </div>

                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )

        }

      </div>
    </div>
  );
};