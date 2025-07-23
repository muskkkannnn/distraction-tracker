import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { EmojiState } from '../hooks/useEmojiState';
import { HappyEmoji, NeutralEmoji, ConcernedEmoji, OverwhelmedEmoji } from '../../assets/emojis';

interface AnimatedEmojiProps {
  state: EmojiState;
  size?: number;
}

/**
 * Animated emoji component that handles transitions between different emoji states
 * with a bounce effect when the emoji changes.
 */
const AnimatedEmoji: React.FC<AnimatedEmojiProps> = ({ state, size = 96 }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const prevStateRef = useRef<EmojiState>(state);

  // Animate when state changes
  useEffect(() => {
    if (prevStateRef.current !== state) {
      // Animate out
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.5,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Animate in
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
        ]).start();
      });
      
      prevStateRef.current = state;
    }
  }, [state, scaleAnim, opacityAnim]);

  // Get the appropriate emoji component based on state
  const getEmojiComponent = () => {
    switch (state) {
      case 'happy':
        return HappyEmoji;
      case 'neutral':
        return NeutralEmoji;
      case 'concerned':
        return ConcernedEmoji;
      case 'overwhelmed':
        return OverwhelmedEmoji;
      default:
        return HappyEmoji;
    }
  };

  const EmojiComponent = getEmojiComponent();

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <EmojiComponent width={size} height={size} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AnimatedEmoji; 