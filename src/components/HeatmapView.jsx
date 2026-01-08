import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip } from 'react-tooltip';
import { subDays, format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { aggregateSessionsByDay, getHeatmapClass, formatDuration } from '../utils';
import 'react-calendar-heatmap/dist/styles.css';

export default function HeatmapView({ sessions }) {
  const data = aggregateSessionsByDay(sessions);
  const today = new Date();
  
  // Ensure we show at least the last 120 days
  const startDate = subDays(today, 120);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 overflow-hidden h-[600px] flex flex-col">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Consistência de Leitura</h3>
      
      <div className="w-full overflow-x-auto">
        <div className="min-w-[600px]"> {/* Force min width for mobile scrolling */}
          <CalendarHeatmap
            startDate={startDate}
            endDate={today}
            values={data}
            classForValue={(value) => {
              if (!value) {
                return 'color-empty';
              }
              return getHeatmapClass(value.count);
            }}
            tooltipDataAttrs={(value) => {
              if (!value || !value.date) {
                return { 'data-tooltip-content': 'Sem leitura' };
              }
              const dateFormatted = format(parseISO(value.date), "d 'de' MMMM", { locale: ptBR });
              return {
                'data-tooltip-content': `${dateFormatted}: ${value.count} pgs • ${formatDuration(value.totalDuration)}`,
              };
            }}
            showWeekdayLabels={true}
          />
        </div>
      </div>
      <Tooltip id="heatmap-tooltip" />
      
      <div className="flex items-center justify-end gap-2 mt-auto pt-4 text-xs text-gray-500">
        <span>Menos</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-[#ebedf0]"></div>
          <div className="w-3 h-3 rounded-sm bg-[#dcfce7]"></div>
          <div className="w-3 h-3 rounded-sm bg-[#86efac]"></div>
          <div className="w-3 h-3 rounded-sm bg-[#4ade80]"></div>
          <div className="w-3 h-3 rounded-sm bg-[#22c55e]"></div>
          <div className="w-3 h-3 rounded-sm bg-[#15803d]"></div>
        </div>
        <span>Mais</span>
      </div>
    </div>
  );
}
