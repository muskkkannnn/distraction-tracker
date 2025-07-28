import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import EmojiDisplay from './src/components/EmojiDisplay';
import { EmojiProvider, useEmojiContext } from './src/contexts/EmojiContext';
// End of Selection
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationFooter, { TabKey } from './src/components/NavigationFooter';
import HistoryCalendarScreen from './src/components/HistoryCalendarScreen';
import SettingsScreen from './src/components/SettingsScreen';

const HomeScreen: React.FC = () => {
  const { count, addToCount, resetCount } = useEmojiContext();
  const [incrementValue, setIncrementValue] = useState(1);

  return (
    <>
      {/* App Name */}
      <Text style={styles.title}>Distraction Tracker</Text>

      {/* PNG Emoji */}
      <EmojiDisplay count={count} />

      {/* Total Distractions Headline */}
      <Text style={[styles.headline, {lineHeight: 35}]}>I have been distracted{'\n'}{count} times today.</Text>

      <Text style={styles.subHeadline}>Oops! You're back, again?</Text>

      {/* Counter Controls */}
      <View style={styles.controlsRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => incrementValue > 1 && setIncrementValue(incrementValue - 1)}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <View style={styles.countDisplay}>
          <Text style={styles.countNumber}>{incrementValue}</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => incrementValue < 9 && setIncrementValue(incrementValue + 1)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Add Distraction Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => addToCount(incrementValue)}
      >
        <Text style={styles.addButtonText}>
          {incrementValue === 1
            ? 'Add Distraction'
            : `Add ${incrementValue} Distractions`}
        </Text>
      </TouchableOpacity>

      {/* Reset Button */}
      {/* <TouchableOpacity
        style={styles.resetButton}
        onPress={resetCount}
      >
        <Text style={styles.resetText}>Reset Counter</Text>
      </TouchableOpacity> */}
    </>
  );
};

const HistoryScreen: React.FC = () => (
  <HistoryCalendarScreen />
);



const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.containerWithFooter}>
        <View style={styles.content}>
          {activeTab === 'home' && <HomeScreen />}
          {activeTab === 'history' && <HistoryScreen />}
          {activeTab === 'settings' && <SettingsScreen />}
        </View>
        <NavigationFooter activeTab={activeTab} onTabPress={setActiveTab} />
      </View>
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <EmojiProvider initialCount={0}>
        <AppContent />
      </EmojiProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F0FF',
  },
  containerWithFooter: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    paddingBottom: 0, // increased space for footer and safe area
  },
  title: {
    fontSize: 20,
    fontWeight: 900,
    marginBottom: 10,
    //marginTop: 50,
  },
  headline: {
    fontSize: 22,
    fontWeight: 900,
    marginTop: 10,
    marginBottom: 10,
    color: 'rgba(83, 30, 108, 100)',
    textAlign: 'center',
  },
  subHeadline: {
    fontSize: 14,
    fontWeight: 800,
    marginTop: 20,
    marginBottom: 0,
    color: 'rgba(83, 30, 108, 100)',
    textAlign: 'center',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 25,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 900,
    color: 'rgba(83, 30, 108, 100)',
  },
  countDisplay: {
    width: 60,
    alignItems: 'center',
    marginHorizontal: 26,
  },
  countNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'rgba(127, 86, 217, 0.69)',
    paddingVertical: 12,
    // paddingHorizontal: 43,
    width: 275,
    alignItems: 'center',
    borderRadius: 13,
    marginBottom: 20,
    marginTop: 15,
  },
  addButtonText: {
    color: 'rgba(255, 255, 255, 100)',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // resetButton: {
  //   padding: 10,
  // },
  // resetText: {
  //   color: '#666',
  //   fontSize: 16,
  // },
});
