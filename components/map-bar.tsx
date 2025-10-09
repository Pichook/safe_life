import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';


type ReportItem = {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  severity: 'Dangerous';
  image: any;
};

const exampleReports: ReportItem[] = Array.from({ length: 4 }).map((_, index) => ({
  id: `report-${index + 1}`,
  title: 'Street 171',
  location: 'Royal Blvd.',
  date: '2024/08/21',
  time: '13:00',
  severity: 'Dangerous',
  image: require('@/assets/images/react-logo.png'),
}));

export default function MapBar() {
  return (
    <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
      {exampleReports.map((item) => (
        <View key={item.id} style={styles.card}>
          <Image style={styles.thumbnail} contentFit="cover" source={item.image} />
          <View style={styles.cardBody}>
            <View style={styles.topRow}>
              <View style={styles.badgeDanger}>
                <Text style={styles.badgeText}>{item.severity}</Text>
              </View>
              <View style={styles.dateTimeWrap}>
                <Text style={styles.dateText}>{item.date}</Text>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
            </View>
            <Text style={styles.titleText}>{item.title}</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={14} color="#94a3b8" style={styles.locationIcon} />
              <Text style={styles.locationText}>{item.location}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  thumbnail: {
    width: 72,
    height: 72,
    borderRadius: 8,
  },
  cardBody: {
    flex: 1,
    marginLeft: 12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  badgeDanger: {
    backgroundColor: '#fee2e2',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#ef4444',
    fontSize: 10,
    fontWeight: '600',
  },
  dateTimeWrap: {
    alignItems: 'flex-end',
  },
  dateText: {
    color: '#94a3b8',
    fontSize: 12,
  },
  timeText: {
    color: '#94a3b8',
    fontSize: 12,
  },
  titleText: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
  },
  locationRow: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 4,
  },
  locationText: {
    color: '#94a3b8',
    fontSize: 12,
  },
});
