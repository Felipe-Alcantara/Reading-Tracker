const STORAGE_KEY = 'reading-tracker-sessions';

export const StorageService = {
  getSessions: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading sessions:', error);
      return [];
    }
  },

  saveSession: (session) => {
    try {
      const sessions = StorageService.getSessions();
      const updatedSessions = [...sessions, session];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSessions));
      return updatedSessions;
    } catch (error) {
      console.error('Error saving session:', error);
      return [];
    }
  },

  clearAll: () => {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  },
  
  importData: (data) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return true;
    } catch (e) {
        return false;
    }
  }
};
