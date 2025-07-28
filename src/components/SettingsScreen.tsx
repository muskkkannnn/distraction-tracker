import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';

interface SettingsScreenProps {}

const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [hourlyReminders, setHourlyReminders] = useState(false);
  const [dailySummary, setDailySummary] = useState(true);

  const toggleDarkMode = () => setIsDarkMode(previous => !previous);
  const toggleNotifications = () => setNotificationsEnabled(previous => !previous);
  const toggleHourlyReminders = () => setHourlyReminders(previous => !previous);
  const toggleDailySummary = () => setDailySummary(previous => !previous);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* <Text style={styles.title}>Settings</Text> */}
      
      {/* Theme Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Dark Mode</Text>
            <Text style={styles.settingDescription}>Switch between light and dark themes</Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: '#E0E0E0', true: '#7F56D9' }}
            thumbColor={isDarkMode ? '#531E6C' : '#F4F0FF'}
          />
        </View>
      </View>

      {/* Notifications Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Enable Notifications</Text>
            <Text style={styles.settingDescription}>Receive reminders and updates</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: '#E0E0E0', true: '#7F56D9' }}
            thumbColor={notificationsEnabled ? '#531E6C' : '#F4F0FF'}
          />
        </View>

        {notificationsEnabled && (
          <>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Hourly Reminders</Text>
                <Text style={styles.settingDescription}>Get reminded every hour to check your distractions</Text>
              </View>
              <Switch
                value={hourlyReminders}
                onValueChange={toggleHourlyReminders}
                trackColor={{ false: '#E0E0E0', true: '#7F56D9' }}
                thumbColor={hourlyReminders ? '#531E6C' : '#F4F0FF'}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Daily Summary</Text>
                <Text style={styles.settingDescription}>Receive a daily summary of your distractions</Text>
              </View>
              <Switch
                value={dailySummary}
                onValueChange={toggleDailySummary}
                trackColor={{ false: '#E0E0E0', true: '#7F56D9' }}
                thumbColor={dailySummary ? '#531E6C' : '#F4F0FF'}
              />
            </View>
          </>
        )}
      </View>

      {/* Data Section */}
      {/* <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data & Privacy</Text>
        
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Export Data</Text>
            <Text style={styles.settingDescription}>Export your distraction history</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Clear All Data</Text>
            <Text style={styles.settingDescription}>Delete all your distraction records</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View> */}

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Version</Text>
            <Text style={styles.settingDescription}>1.0.0</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Privacy Policy</Text>
            <Text style={styles.settingDescription}>Read our privacy policy</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Terms of Service</Text>
            <Text style={styles.settingDescription}>Read our terms of service</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F0FF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    width: '100%',
    alignSelf: 'stretch',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#531E6C',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#531E6C',
    marginBottom: 15,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#531E6C',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  arrow: {
    fontSize: 18,
    color: '#999',
    fontWeight: 'bold',
  },
});

export default SettingsScreen; 