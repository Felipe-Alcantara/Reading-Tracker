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
      return { success: true, data: updatedSessions };
    } catch (error) {
      console.error('Error saving session:', error);
      if (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
          return { success: false, error: 'STORAGE_FULL' };
      }
      return { success: false, error: 'UNKNOWN' };
    }
  },

  clearAll: () => {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  },
  
  importData: (data) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return { success: true };
    } catch (error) {
        if (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            return { success: false, error: 'STORAGE_FULL' };
        }
        return { success: false, error: 'UNKNOWN' };
    }
  }
};
