import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

interface EmojiDisplayProps {
  count: number;
}

const emojiSources = [
  require('../../assets/emojis/avatar-placeholder-1.png'), // 0-5
  require('../../assets/emojis/avatar-placeholder-2.png'), // 6-10
  require('../../assets/emojis/avatar-placeholder-3.png'), // 11-15
  require('../../assets/emojis/avatar-placeholder-4.png'), // 16+
];

function getEmojiSource(count: number) {
  if (count <= 5) return emojiSources[0];
  if (count <= 10) return emojiSources[1];
  if (count <= 15) return emojiSources[2];
  return emojiSources[3];
}

const EmojiDisplay: React.FC<EmojiDisplayProps> = ({ count }) => {
  return (
    <View style={styles.container}>
      <Image
        source={getEmojiSource(count)}
        style={styles.emoji}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  emoji: {
    width: 150,
    height: 150,
  },
});

export default EmojiDisplay;