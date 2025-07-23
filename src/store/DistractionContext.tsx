import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DistractionContextType {
  distractionCount: number;
  updateCount: (newCount: number) => void;
  addToCount: (quantity: number) => void;
  resetCount: () => void;
  lastUpdated: Date | null;
}

// Create the context with default values
const DistractionContext = createContext<DistractionContextType>({
  distractionCount: 0,
  updateCount: () => {},
  addToCount: () => {},
  resetCount: () => {},
  lastUpdated: null,
});

// Storage keys for persisting data
const COUNT_STORAGE_KEY = '@distraction_tracker:dailyCount';
const LAST_UPDATED_KEY = '@distraction_tracker:lastUpdated';

export const useDistractionContext = () => useContext(DistractionContext);

export const DistractionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [distractionCount, setDistractionCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Check if we need to reset based on date
  const shouldResetForNewDay = (lastUpdate: string | null): boolean => {
    if (!lastUpdate) return false;
    
    const lastUpdateDate = new Date(lastUpdate);
    const currentDate = new Date();
    
    return (
      lastUpdateDate.getDate() !== currentDate.getDate() ||
      lastUpdateDate.getMonth() !== currentDate.getMonth() ||
      lastUpdateDate.getFullYear() !== currentDate.getFullYear()
    );
  };

  // Load saved count and last updated timestamp
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const [savedCount, savedLastUpdated] = await Promise.all([
          AsyncStorage.getItem(COUNT_STORAGE_KEY),
          AsyncStorage.getItem(LAST_UPDATED_KEY),
        ]);
        
        // Check if we need to reset for a new day
        if (shouldResetForNewDay(savedLastUpdated)) {
          // It's a new day, reset the count
          setDistractionCount(0);
          const now = new Date();
          setLastUpdated(now);
          await Promise.all([
            AsyncStorage.setItem(COUNT_STORAGE_KEY, '0'),
            AsyncStorage.setItem(LAST_UPDATED_KEY, now.toISOString()),
          ]);
        } else {
          // Same day, restore the values
          if (savedCount !== null) {
            setDistractionCount(parseInt(savedCount, 10));
          }
          if (savedLastUpdated !== null) {
            setLastUpdated(new Date(savedLastUpdated));
          }
        }
      } catch (error) {
        console.error('Error loading distraction data:', error);
      }
    };

    loadSavedData();
  }, []);

  // Save the count and timestamp whenever they change
  useEffect(() => {
    const saveData = async () => {
      if (lastUpdated) {
        try {
          await Promise.all([
            AsyncStorage.setItem(COUNT_STORAGE_KEY, distractionCount.toString()),
            AsyncStorage.setItem(LAST_UPDATED_KEY, lastUpdated.toISOString()),
          ]);
        } catch (error) {
          console.error('Error saving distraction data:', error);
        }
      }
    };

    saveData();
  }, [distractionCount, lastUpdated]);

  const updateCount = (newCount: number) => {
    setDistractionCount(newCount);
    setLastUpdated(new Date());
  };

  const addToCount = (quantity: number) => {
    setDistractionCount(prevCount => prevCount + quantity);
    setLastUpdated(new Date());
  };

  const resetCount = () => {
    setDistractionCount(0);
    setLastUpdated(new Date());
  };

  return (
    <DistractionContext.Provider 
      value={{ 
        distractionCount, 
        updateCount, 
        addToCount,
        resetCount,
        lastUpdated 
      }}
    >
      {children}
    </DistractionContext.Provider>
  );
};

export default DistractionContext; 