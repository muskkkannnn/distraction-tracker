import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Calendar, DateObject } from 'react-native-calendars';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CALENDAR_HEIGHT = 520;
const CALENDAR_BG = '#F4F0FF';
const CARD_SIZE = Math.floor((SCREEN_WIDTH - 48 - 6 * 7) / 7); // 24px padding each side, 6px gap between 7 cards
const CARD_HEIGHT = 54;
const CARD_RADIUS = 10;

// Helper to format date as YYYY-MM-DD
function formatDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

const HistoryCalendarScreen: React.FC = () => {
  const today = new Date();
  const [selected, setSelected] = useState<string>(formatDate(today.getFullYear(), today.getMonth(), today.getDate()));
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // Placeholder: generate fake distraction counts for each day in the current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const distractionCounts: Record<string, number> = {};
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = formatDate(currentYear, currentMonth, day);
    distractionCounts[dateStr] = Math.floor(Math.random() * 10); // Replace with real data later
  }

  // Build markedDates for Calendar
  const markedDates = useMemo(() => {
    const marks: Record<string, any> = {};
    Object.entries(distractionCounts).forEach(([date, count]) => {
      if (count > 0) {
        marks[date] = {
          marked: true,
          dotColor: '#7F56D9',
          customStyles: {
            container: {},
            text: {},
          },
        };
      }
    });
    // Highlight selected day
    if (selected) {
      marks[selected] = {
        ...(marks[selected] || {}),
        selected: true,
        selectedColor: '#531E6C',
      };
    }
    return marks;
  }, [distractionCounts, selected]);

  // Custom day component to show a card for each date
  const renderDay = (day: DateObject) => {
    const dateStr = day.dateString;
    const count = distractionCounts[dateStr] || 0;
    const isSelected = day.dateString === selected;
    return (
      <View style={[styles.card, isSelected && styles.selectedCard]}> 
        <Text style={[styles.dayNumber, isSelected && styles.selectedDayNumber]}>{day.day}</Text>
        {count > 0 && (
          <View style={styles.countCard}>
            <Text style={styles.countCardText} numberOfLines={1} ellipsizeMode="tail">{count}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Calendar
        current={formatDate(currentYear, currentMonth, 1)}
        onDayPress={day => setSelected(day.dateString)}
        onMonthChange={month => {
          setCurrentMonth(month.month - 1);
          setCurrentYear(month.year);
        }}
        markedDates={markedDates}
        markingType="custom"
        dayComponent={({ date }) => renderDay(date)}
        theme={{
          backgroundColor: CALENDAR_BG,
          calendarBackground: CALENDAR_BG,
          textSectionTitleColor: '#888',
          selectedDayBackgroundColor: '#531E6C',
          selectedDayTextColor: '#fff',
          todayTextColor: '#7F56D9',
          dayTextColor: '#531E6C',
          textDisabledColor: '#d9e1e8',
          dotColor: '#7F56D9',
          selectedDotColor: '#fff',
          arrowColor: '#7F56D9',
          monthTextColor: '#531E6C',
          indicatorColor: '#7F56D9',
          textDayFontWeight: 'bold',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: 'bold',
          textDayFontSize: 16,
          textMonthFontSize: 20,
          textDayHeaderFontSize: 14,
        }}
        style={styles.calendar}
      />
      <Text style={styles.caption}>Numbers in each card are saved distraction counts.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CALENDAR_BG,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  calendar: {
    borderRadius: 16,
    width: SCREEN_WIDTH - 16,
    height: CALENDAR_HEIGHT,
    alignSelf: 'center',
    elevation: 2,
    marginBottom: 10,
    backgroundColor: CALENDAR_BG,
    padding: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: CARD_RADIUS,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    width: CARD_SIZE,
    height: CARD_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
    paddingVertical: 6,
    paddingHorizontal: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 0,
    overflow: 'hidden',
  },
  selectedCard: {
    borderColor: '#7F56D9',
    borderWidth: 2,
    backgroundColor: '#F4F0FF',
  },
  dayNumber: {
    color: '#531E6C',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  selectedDayNumber: {
    color: '#7F56D9',
  },
  countCard: {
    backgroundColor: '#7F56D9',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 4,
    minWidth: 18,
    maxWidth: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  countCardText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  caption: {
    marginTop: 8,
    color: '#888',
    fontSize: 13,
    textAlign: 'center',
  },
});

export default HistoryCalendarScreen;
 