import { useState } from "react";
import { format, isSameDay, parseISO, startOfWeek, addDays } from "date-fns";
import { es } from 'date-fns/locale';
import { Evento } from "@/components/interface";

export const CalendarView = ({ eventos }: { eventos: Evento[] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Procesar eventos para el calendario
  const processEvents = () => {
    const eventsByDate: Record<string, Evento[]> = {};
    
    eventos.forEach(evento => {
      const date = parseISO(evento.fecha_hora);
      const dateKey = format(date, 'yyyy-MM-dd');
      
      if (!eventsByDate[dateKey]) {
        eventsByDate[dateKey] = [];
      }
      eventsByDate[dateKey].push(evento);
    });
    
    return eventsByDate;
  };

  const eventsByDate = processEvents();
  

  // Navegación del calendario
  const nextMonth = () => setCurrentMonth(addDays(currentMonth, 31));
  const prevMonth = () => setCurrentMonth(addDays(currentMonth, -31));

  // Generar semanas del mes
  const renderWeeks = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const weeks = [];
    
    for (let week = 0; week < 6; week++) {
      const days = [];
      const weekStart = addDays(startDate, week * 7);
      
      // Verificar si la semana tiene días del mes actual
      let hasDaysInMonth = false;
      for (let day = 0; day < 7; day++) {
        const currentDate = addDays(weekStart, day);
        if (format(currentDate, 'MM') === format(currentMonth, 'MM')) {
          hasDaysInMonth = true;
          break;
        }
      }
      
      if (!hasDaysInMonth && week > 3) return weeks; // No mostrar semanas vacías al final

      for (let day = 0; day < 7; day++) {
        const currentDate = addDays(weekStart, day);
        const dateKey = format(currentDate, 'yyyy-MM-dd');
        const dayEvents = eventsByDate[dateKey] || [];
        const isCurrentMonth = format(currentDate, 'MM') === format(currentMonth, 'MM');
        
        days.push(
          <div 
            key={currentDate.toString()}
            className={`relative p-2 h-24 border border-gray-100 ${
              isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'
            }`}
          >
            <div className="flex justify-between">
              <span className={`text-sm ${
                isSameDay(currentDate, new Date()) ? 
                'bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center' : 
                'text-gray-700'
              }`}>
                {format(currentDate, 'd')}
              </span>
              {dayEvents.length > 0 && (
                <span className="text-xs bg-indigo-100 text-indigo-800 px-1 rounded">
                  {dayEvents.length}
                </span>
              )}
            </div>
            
            <div className="mt-1 space-y-1 overflow-y-auto max-h-16">
              {dayEvents.slice(0, 2).map(event => (
                <div 
                  key={event.id}
                  className="text-xs p-1 rounded truncate"
                  style={{ 
                    backgroundColor: getCategoryColor(event.categoria).bg,
                    color: getCategoryColor(event.categoria).text
                  }}
                >
                  {format(parseISO(event.fecha_hora), 'HH:mm')} - {event.nombre}
                </div>
              ))}
              {dayEvents.length > 2 && (
                <div className="text-xs text-gray-500">+{dayEvents.length - 2} más</div>
              )}
            </div>
          </div>
        );
      }
      
      weeks.push(
        <div key={weekStart.toString()} className="grid grid-cols-7">
          {days}
        </div>
      );
    }
    
    return weeks;
  };

  // Colores por categoría
  const getCategoryColor = (category: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      música: { bg: '#F0F9FF', text: '#0369A1' },
      danza: { bg: '#F0FDF4', text: '#15803D' },
      teatro: { bg: '#FEF2F2', text: '#B91C1C' },
      arte: { bg: '#FFF7ED', text: '#9A3412' },
      festival: { bg: '#F5F3FF', text: '#6D28D9' },
      default: { bg: '#E0E7FF', text: '#4338CA' }
    };
    
    return colors[category.toLowerCase()] || colors.default;
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header del calendario */}
      <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="flex justify-between items-center">
          <button 
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-indigo-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h3 className="text-xl font-semibold">
            {format(currentMonth, 'MMMM yyyy', { locale: es })}
          </h3>
          <button 
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-indigo-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Días de la semana */}
        <div className="grid grid-cols-7 mt-4 text-center">
          {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day, i) => (
            <div key={i} className="text-sm font-medium opacity-90">{day}</div>
          ))}
        </div>
      </div>
      
      {/* Cuerpo del calendario */}
      <div className="p-2">
        {renderWeeks()}
      </div>
      
      {/* Leyenda de categorías */}
      <div className="p-4 border-t border-gray-100">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Leyenda:</h4>
        <div className="flex flex-wrap gap-2">
          {['Música', 'Danza', 'Teatro', 'Arte', 'Festival'].map(cat => (
            <div key={cat} className="flex items-center">
              <span 
                className="w-3 h-3 rounded-full mr-1"
                style={{ backgroundColor: getCategoryColor(cat).bg }}
              ></span>
              <span className="text-xs text-gray-600">{cat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};