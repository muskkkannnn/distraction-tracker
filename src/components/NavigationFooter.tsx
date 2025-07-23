import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type TabKey = 'home' | 'history' | 'settings';

interface NavigationFooterProps {
  activeTab: TabKey;
  onTabPress: (tab: TabKey) => void;
}

const tabs: { key: TabKey; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'history', label: 'History' },
  { key: 'settings', label: 'Settings' },
];

const NavigationFooter: React.FC<NavigationFooterProps> = ({ activeTab, onTabPress }) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}> {/* 12px min padding */}
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab, activeTab === tab.key && styles.activeTab]}
          onPress={() => onTabPress(tab.key)}
        >
          <Text style={[styles.tabLabel, activeTab === tab.key && styles.activeTabLabel]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 110,
    borderTopWidth: 0,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  activeTab: {
    borderTopWidth: 3,
    height: 70,
    borderTopColor: 'rgba(127, 86, 217, 100)',
    backgroundColor: 'rgba(244, 240, 255, 0.69)',
  },
  tabLabel: {
    fontSize: 16,
    color: 'rgba(83, 30, 108, 100)',
  },
  activeTabLabel: {
    color: 'rgba(127, 86, 217, 100)',
    fontWeight: 900,
  },
});

export default NavigationFooter; 