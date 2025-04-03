import { 
    BarChart, 
    LineChart, 
    PieChart 
  } from "recharts";
  
  export const StatisticsPanel = () => {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-4 border rounded-lg">
            <h4 className="mb-4 text-lg font-medium">Visitas por mes</h4>
            <LineChart
              data={[
                { name: 'Ene', value: 400 },
                { name: 'Feb', value: 300 },
                // Más datos...
              ]}
            />
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="mb-4 text-lg font-medium">Contenido más visto</h4>
            <BarChart
              data={[
                { name: 'Noticia 1', value: 100 },
                { name: 'Evento 1', value: 80 },
                // Más datos...
              ]}
            />
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="p-4 border rounded-lg">
            <h4 className="mb-4 text-lg font-medium">Dispositivos</h4>
            <PieChart
              data={[
                { name: 'Mobile', value: 60 },
                { name: 'Desktop', value: 30 },
                { name: 'Tablet', value: 10 },
              ]}
            />
          </div>
          {/* Más gráficos... */}
        </div>
      </div>
    );
  };