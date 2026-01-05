import { v4 as uuidv4 } from 'uuid';
import { subDays, format } from 'date-fns';

const generateRandomSession = (daysAgo) => {
  const date = subDays(new Date(), daysAgo);
  const dateStr = format(date, 'yyyy-MM-dd');
  const start = new Date(date);
  start.setHours(10 + Math.floor(Math.random() * 10), 0, 0, 0);
  
  const duration = 15 + Math.floor(Math.random() * 90); // 15 to 105 mins
  const end = new Date(start.getTime() + duration * 60000);
  
  const pages = Math.floor(duration * (0.5 + Math.random() * 1)); // 0.5 to 1.5 pages per min

  return {
    id: uuidv4(),
    date: dateStr,
    start: start.toISOString(),
    end: end.toISOString(),
    duration_min: duration,
    pages: pages,
    pagesPerMin: parseFloat((pages / duration).toFixed(2)),
    notes: Math.random() > 0.7 ? "Sessão produtiva!" : ""
  };
};

export const generateSampleData = () => {
  const sessions = [];
  // Generate data for the last 60 days, skipping some days
  for (let i = 0; i < 60; i++) {
    if (Math.random() > 0.3) { // 70% chance of reading
      sessions.push(generateRandomSession(i));
    }
  }
  return sessions.sort((a, b) => new Date(b.start) - new Date(a.start));
};
