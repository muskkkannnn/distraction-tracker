import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import EmojiDisplay from './EmojiDisplay';
import { useEmojiContext } from '../contexts/EmojiContext';

/**
 * Component to test emoji feedback system with different distraction counts
 */
const EmojiTester: React.FC = () => {
  const { count, setCount } = useEmojiContext();
  
  // Predefined test cases to cover all emoji states
  const testCases = [
    { label: 'Happy (0)', value: 0 },
    { label: 'Happy (4)', value: 4 },
    { label: 'Neutral (5)', value: 5 },
    { label: 'Neutral (9)', value: 9 },
    { label: 'Concerned (10)', value: 10 },
    { label: 'Concerned (14)', value: 14 },
    { label: 'Overwhelmed (15)', value: 15 },
    { label: 'Overwhelmed (20)', value: 20 },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Emoji Feedback Test</Text>
      
      {/* Current Test Case */}
      <View style={styles.currentTest}>
        <Text style={styles.countLabel}>Current Count: {count}</Text>
        <EmojiDisplay useGlobalContext={true} emojiSize={80} />
      </View>
      
      {/* Test Case Buttons */}
      <View style={styles.testButtons}>
        <Text style={styles.sectionTitle}>Test Cases</Text>
        {testCases.map((testCase) => (
          <TouchableOpacity
            key={testCase.value}
            style={[
              styles.testButton,
              count === testCase.value && styles.activeTestButton
            ]}
            onPress={() => setCount(testCase.value)}
          >
            <Text 
              style={[
                styles.testButtonText,
                count === testCase.value && styles.activeTestButtonText
              ]}
            >
              {testCase.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Manual Count Control */}
      <View style={styles.manualControl}>
        <Text style={styles.sectionTitle}>Manual Testing</Text>
        <View style={styles.counterControls}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => setCount(Math.max(0, count - 1))}
          >
            <Text style={styles.controlButtonText}>-1</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => setCount(Math.max(0, count - 5))}
          >
            <Text style={styles.controlButtonText}>-5</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.controlButton, styles.resetButton]}
            onPress={() => setCount(0)}
          >
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => setCount(count + 5)}
          >
            <Text style={styles.controlButtonText}>+5</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => setCount(count + 1)}
          >
            <Text style={styles.controlButtonText}>+1</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  currentTest: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  countLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  testButtons: {
    marginBottom: 20,
  },
  testButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  activeTestButton: {
    backgroundColor: '#2196f3',
  },
  testButtonText: {
    fontSize: 16,
  },
  activeTestButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  manualControl: {
    marginBottom: 20,
  },
  counterControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  controlButton: {
    backgroundColor: '#e0e0e0',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  controlButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#ffcc80',
  },
  resetButtonText: {
    color: '#e65100',
    fontWeight: 'bold',
  },
});

export default EmojiTester; 