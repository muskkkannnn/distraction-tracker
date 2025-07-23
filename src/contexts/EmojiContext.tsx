import React, { createContext, useContext, useState, useEffect } from 'react';
import useEmojiState, { EmojiState } from '../hooks/useEmojiState';

interface EmojiContextType {
  count: number;
  setCount: (count: number) => void;
  addToCount: (value: number) => void;
  resetCount: () => void;
  emojiState: EmojiState;
  moodDescription: string;
}

// Create context with default values
const EmojiContext = createContext<EmojiContextType>({
  count: 0,
  setCount: () => {},
  addToCount: () => {},
  resetCount: () => {},
  emojiState: 'happy',
  moodDescription: '',
});

// Custom hook for using the emoji context
export const useEmojiContext = () => useContext(EmojiContext);

interface EmojiProviderProps {
  children: React.ReactNode;
  initialCount?: number;
}

/**
 * Provider component for emoji state management
 */
export const EmojiProvider: React.FC<EmojiProviderProps> = ({ 
  children,
  initialCount = 0
}) => {
  const [count, setCount] = useState<number>(initialCount);
  const { emojiState, moodDescription } = useEmojiState(count);

  // Add to the current count
  const addToCount = (value: number) => {
    setCount(prevCount => prevCount + value);
  };

  // Reset count to zero
  const resetCount = () => {
    setCount(0);
  };

  // Value object for the context provider
  const value = {
    count,
    setCount,
    addToCount,
    resetCount,
    emojiState,
    moodDescription,
  };

  return (
    <EmojiContext.Provider value={value}>
      {children}
    </EmojiContext.Provider>
  );
};

export default EmojiContext; 