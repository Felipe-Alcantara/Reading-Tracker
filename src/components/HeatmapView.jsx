import React, { useMemo, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  isToday,
  parseISO,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { aggregateSessionsByDay, formatDuration } from '../utils';

export default function HeatmapView({ sessions }) {
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(startOfMonth(today));

  const byDate = useMemo(() => {
    const agg = aggregateSessionsByDay(sessions);
    const map = new Map();
    agg.forEach((d) => {
      map.set(d.date, d);
    });
    return map;
  }, [sessions]);

  const goToPreviousMonth = () => {
    setSelectedMonth((prev) => subMonths(prev, 1));
  };

  const goToNextMonth = () => {
    setSelectedMonth((prev) => addMonths(prev, 1));
  };

  const goToToday = () => {
    setSelectedMonth(startOfMonth(today));
  };

  const getLevel = (dayData) => {
    const pages = dayData?.count || 0;
    const minutes = dayData?.totalDuration || 0;

    // Prioriza páginas para intensidade; se não houver, usa minutos.
    const amount = pages > 0 ? pages : minutes;
    if (amount <= 0) return 0;

    // Níveis simples (0-5)
    if (pages > 0) {
      if (amount < 10) return 1;
      if (amount < 25) return 2;
      if (amount < 50) return 3;
      if (amount < 100) return 4;
      return 5;
    }

    // Quando não há páginas, usa minutos (limiares em minutos)
    if (amount < 15) return 1;
    if (amount < 30) return 2;
    if (amount < 60) return 3;
    if (amount < 120) return 4;
    return 5;
  };

  const levelClass = (level) => {
    switch (level) {
      case 0:
        return 'bg-gray-100 dark:bg-gray-700';
      case 1:
        return 'bg-brand-100 dark:bg-brand-900/30';
      case 2:
        return 'bg-brand-200 dark:bg-brand-900/45';
      case 3:
        return 'bg-brand-300 dark:bg-brand-900/60';
      case 4:
        return 'bg-brand-500 dark:bg-brand-700';
      case 5:
        return 'bg-brand-700 dark:bg-brand-600';
      default:
        return 'bg-gray-100 dark:bg-gray-700';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 overflow-hidden h-[600px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">Consistência de Leitura</h3>
        
        {/* Navegação do mês */}
        <div className="flex items-center gap-2">
          <button
            onClick={goToPreviousMonth}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Mês anterior"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          
          <button
            onClick={goToToday}
            className="px-3 py-1.5 text-sm font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            {format(selectedMonth, "MMMM 'de' yyyy", { locale: ptBR })}
          </button>
          
          <button
            onClick={goToNextMonth}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Próximo mês"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Calendário do mês selecionado */}
      <div className="flex-1 flex flex-col">
        {(() => {
          const monthEnd = endOfMonth(selectedMonth);
          const gridStart = startOfWeek(selectedMonth, { weekStartsOn: 1 });
          const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

          const days = [];
          for (let d = gridStart; d <= gridEnd; d = addDays(d, 1)) {
            days.push(d);
          }

          return (
            <>
              {/* Cabeçalho dos dias da semana */}
              <div className="grid grid-cols-7 gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">
                {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((d) => (
                  <div key={d} className="text-center">{d}</div>
                ))}
              </div>

              {/* Grade do mês */}
              <div className="grid grid-cols-7 gap-3 flex-1">
                {days.map((day) => {
                  const dateKey = format(day, 'yyyy-MM-dd');
                  const dayData = byDate.get(dateKey);
                  const level = getLevel(dayData);

                  const pages = dayData?.count || 0;
                  const minutes = dayData?.totalDuration || 0;
                  const sessionsCount = dayData?.sessions || 0;

                  const isThisMonth = isSameMonth(day, selectedMonth);
                  const isDayToday = isToday(day);

                  const tooltipParts = [];
                  tooltipParts.push(format(day, "dd/MM/yyyy", { locale: ptBR }));
                  if (sessionsCount > 0) {
                    tooltipParts.push(`${sessionsCount} sessão(ões)`);
                    if (pages > 0) tooltipParts.push(`${pages} pág.`);
                    if (minutes > 0) tooltipParts.push(formatDuration(minutes));
                  } else {
                    tooltipParts.push('Sem leitura');
                  }

                  return (
                    <div key={dateKey} className="flex flex-col items-center gap-1.5">
                      <div
                        className={[
                          'w-full aspect-square rounded-xl border flex flex-col items-center justify-center select-none cursor-pointer transition-all hover:scale-105',
                          isThisMonth ? 'border-gray-200 dark:border-gray-700' : 'border-transparent opacity-30',
                          levelClass(level),
                          isDayToday ? 'ring-2 ring-brand-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-800' : '',
                        ].join(' ')}
                        data-tooltip-id="heatmap-tooltip"
                        data-tooltip-content={tooltipParts.join(' • ')}
                      >
                        <span className="text-sm font-bold text-gray-800 dark:text-gray-100">
                          {format(day, 'd')}
                        </span>
                        
                        {/* Mini indicador do quanto foi lido */}
                        {(pages > 0 || minutes > 0) && (
                          <span className="text-[10px] font-medium text-gray-600 dark:text-gray-300 leading-none mt-0.5">
                            {pages > 0 ? `${pages}p` : formatDuration(minutes)}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          );
        })()}
      </div>

      <Tooltip id="heatmap-tooltip" />
      
      <div className="flex items-center justify-end gap-2 mt-auto pt-4 text-xs text-gray-500">
        <span>Menos</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-gray-700"></div>
          <div className="w-3 h-3 rounded-sm bg-brand-100 dark:bg-brand-900/30"></div>
          <div className="w-3 h-3 rounded-sm bg-brand-200 dark:bg-brand-900/45"></div>
          <div className="w-3 h-3 rounded-sm bg-brand-300 dark:bg-brand-900/60"></div>
          <div className="w-3 h-3 rounded-sm bg-brand-500 dark:bg-brand-700"></div>
          <div className="w-3 h-3 rounded-sm bg-brand-700 dark:bg-brand-600"></div>
        </div>
        <span>Mais</span>
      </div>
    </div>
  );
}
