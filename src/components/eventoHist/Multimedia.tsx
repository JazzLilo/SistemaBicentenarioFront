import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { apiService } from '@/services/apiService';
import { useAtom } from 'jotai';
import { eventohistoricoAtom } from '@/context/context'

export interface IMultimedia {
  url: string;
  tipo: 'imagen' | 'video';
  id_evento_historico: number;
  id: number;
}

export const Multimedia = () => {
  const [eve] = useAtom(eventohistoricoAtom);
  const [multimediaItems, setMultimediaItems] = useState<IMultimedia[]>([]);
  const [newItem, setNewItem] = useState<Omit<IMultimedia, 'id' | 'id_evento_historico'>>({ 
    url: '', 
    tipo: 'imagen' 
  });

  const fetchData = async () => {
    await apiService.get(`multimedia/evento_historico/${eve?.id}`).then((response) => {
      const data = response.data;
      setMultimediaItems(data);
    }
    ).catch((error) => {
      console.error('Error fetching data:', error);
    }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddItem = () => {
    if (!newItem.url) return;
    
    const newMultimediaItem: IMultimedia = {
      ...newItem,
      id: Date.now(), // ID temporal
      id_evento_historico: 1 // Esto deberías obtenerlo del contexto o props
    };
    
    setMultimediaItems([...multimediaItems, newMultimediaItem]);
    setNewItem({ url: '', tipo: 'imagen' });
  };

  const handleRemoveItem = (id: number) => {
    setMultimediaItems(multimediaItems.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-medium">Agregar nuevo elemento multimedia</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Tipo</Label>
            <Select
              value={newItem.tipo}
              onValueChange={(value: 'imagen' | 'video') => 
                setNewItem({...newItem, tipo: value})
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="imagen">Imagen</SelectItem>
                <SelectItem value="video">Video</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label>URL</Label>
            <div className="flex gap-2">
              <Input
                value={newItem.url}
                onChange={(e) => setNewItem({...newItem, url: e.target.value})}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              <Button onClick={handleAddItem}>Agregar</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium mb-4">Galería Multimedia</h3>
        
        {multimediaItems.length === 0 ? (
          <p className="text-muted-foreground">No hay elementos multimedia aún</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {multimediaItems.map((item) => (
              <div key={item.id} className="border rounded-lg overflow-hidden relative group">
                {item.tipo === 'imagen' ? (
                  <img 
                    src={item.url} 
                    alt="Multimedia" 
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
                    <span className="text-muted-foreground">Vista previa de video no disponible</span>
                  </div>
                )}
                
                <div className="p-3">
                  <p className="text-sm font-medium capitalize">{item.tipo}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.url}</p>
                </div>
                
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Eliminar
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};