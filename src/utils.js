import { differenceInMinutes, format, parseISO, startOfDay, isSameDay } from 'date-fns';

export const calculateDuration = (start, end) => {
  if (!start || !end) return 0;
  const startDate = typeof start === 'string' ? parseISO(start) : start;
  const endDate = typeof end === 'string' ? parseISO(end) : end;
  return differenceInMinutes(endDate, startDate);
};

export const calculatePagesPerMin = (pages, durationMin) => {
  if (!durationMin || durationMin <= 0) return 0;
  return parseFloat((pages / durationMin).toFixed(2));
};

export const aggregateSessionsByDay = (sessions) => {
  const map = new Map();

  sessions.forEach(session => {
    // Ensure we are working with the date part only for grouping
    const dateKey = format(parseISO(session.date), 'yyyy-MM-dd');
    
    if (!map.has(dateKey)) {
      map.set(dateKey, { date: dateKey, count: 0, totalDuration: 0, sessions: 0 });
    }
    
    const entry = map.get(dateKey);
    entry.count += session.pages;
    entry.totalDuration += session.duration_min;
    entry.sessions += 1;
  });

  return Array.from(map.values());
};

export const formatDuration = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
};

export const getHeatmapClass = (count) => {
  if (!count || count === 0) return 'color-empty';
  if (count < 10) return 'color-scale-1';
  if (count < 25) return 'color-scale-2';
  if (count < 50) return 'color-scale-3';
  if (count < 100) return 'color-scale-4';
  return 'color-scale-5';
};
