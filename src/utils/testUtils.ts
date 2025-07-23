import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Clear all AsyncStorage data for testing purposes
 */
export const clearAsyncStorage = async () => {
  await AsyncStorage.clear();
};

/**
 * Set mock data for testing
 */
export const setMockAsyncStorage = async (
  count: number, 
  lastUpdated: Date = new Date()
) => {
  await AsyncStorage.setItem('@distraction_tracker:dailyCount', count.toString());
  await AsyncStorage.setItem('@distraction_tracker:lastUpdated', lastUpdated.toISOString());
};

/**
 * Get current count value
 */
export const getCurrentCount = async (): Promise<number> => {
  const count = await AsyncStorage.getItem('@distraction_tracker:dailyCount');
  return count ? parseInt(count, 10) : 0;
};

/**
 * Get current lastUpdated value
 */
export const getLastUpdated = async (): Promise<Date | null> => {
  const lastUpdated = await AsyncStorage.getItem('@distraction_tracker:lastUpdated');
  return lastUpdated ? new Date(lastUpdated) : null;
};

/**
 * Create a date object for yesterday
 */
export const createYesterdayDate = (): Date => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday;
};

/**
 * Mock add to count, skipping the UI
 */
export const mockAddToCount = async (quantity: number): Promise<number> => {
  const currentCount = await getCurrentCount();
  const newCount = currentCount + quantity;
  await setMockAsyncStorage(newCount);
  return newCount;
};

/**
 * Generate a test report
 */
export const generateTestReport = async (): Promise<string> => {
  const count = await getCurrentCount();
  const lastUpdated = await getLastUpdated();
  
  return `
  === DistractionCounter Test Report ===
  Current Count: ${count}
  Last Updated: ${lastUpdated ? lastUpdated.toLocaleString() : 'Never'}
  ================================
  `;
}; 