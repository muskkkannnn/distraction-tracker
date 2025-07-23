import { useMemo } from 'react';

// Emoji state threshold values
const THRESHOLDS = {
  HAPPY: 4,     // 0-4 distractions: Happy emoji
  NEUTRAL: 9,   // 5-9 distractions: Neutral emoji
  CONCERNED: 14 // 10-14 distractions: Concerned emoji
  // 15+ distractions: Overwhelmed emoji
};

// Emoji state types
export type EmojiState = 'happy' | 'neutral' | 'concerned' | 'overwhelmed';

// Mood descriptions for each emoji state
const MOOD_DESCRIPTIONS = {
  happy: "Focused - Great job!",
  neutral: "Somewhat distracted",
  concerned: "Getting concerned",
  overwhelmed: "Overwhelmed - Take a break!"
};

interface UseEmojiStateReturn {
  emojiState: EmojiState;
  moodDescription: string;
}

/**
 * A hook that returns the appropriate emoji state and mood description
 * based on the current distraction count
 * 
 * @param count The current distraction count
 * @returns Object containing emojiState and moodDescription
 */
export function useEmojiState(count: number): UseEmojiStateReturn {
  const emojiState = useMemo<EmojiState>(() => {
    if (count <= THRESHOLDS.HAPPY) {
      return 'happy';
    } else if (count <= THRESHOLDS.NEUTRAL) {
      return 'neutral';
    } else if (count <= THRESHOLDS.CONCERNED) {
      return 'concerned';
    } else {
      return 'overwhelmed';
    }
  }, [count]);

  const moodDescription = useMemo(() => {
    return MOOD_DESCRIPTIONS[emojiState];
  }, [emojiState]);

  return { emojiState, moodDescription };
}

export default useEmojiState; 