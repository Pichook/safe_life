import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// const AVATAR = require('@/assets/images/react-logo.png');
// const THUMB = require('@/assets/images/react-logo@2x.png');

const posts = [
  {
    id: '1',
    title: 'Street 171',
    location: 'Royal Blvd.',
    date: '2024/08/21',
    time: '13:00',
  },
  {
    id: '2',
    title: 'Street 171',
    location: 'Royal Blvd.',
    date: '2024/08/21',
    time: '13:00',
  },
  {
    id: '3',
    title: 'Street 171',
    location: 'Royal Blvd.',
    date: '2024/08/21',
    time: '13:00',
  },
];

const profile = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.avatarWrapOuter}>
            <View style={styles.avatarWrapInner}>
              {/* <Image source={AVATAR} style={styles.avatar} resizeMode="cover" /> */}
            </View>
          </View>

          <ThemedText type="subtitle" style={styles.name}>Ethan Carter</ThemedText>
          <ThemedText style={styles.handle}>@eThan_Carter</ThemedText>

          <View style={styles.pointsPill}>
            <MaterialIcons name="star" size={16} color="#FFFFFF" />
            <ThemedText style={styles.pointsText}>2000 Points</ThemedText>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle" style={{ fontSize: 22 }}>Post History</ThemedText>
          <TouchableOpacity activeOpacity={0.8}>
            <ThemedText style={styles.seeAll}>See All</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={{ gap: 16 }}>
          {posts.map((item) => (
            <View key={item.id} style={styles.postCard}>
              {/* <Image source={THUMB} style={styles.postImage} /> */}
              <View style={{ flex: 1, paddingRight: 8 }}>
                <View style={styles.badgeDanger}>
                  <ThemedText style={styles.badgeDangerText}>Dangerous</ThemedText>
                </View>
                <TouchableOpacity activeOpacity={0.8}>
                  <ThemedText style={styles.postTitle}>{item.title}</ThemedText>
                </TouchableOpacity>
                <View style={styles.locationRow}>
                  <MaterialIcons name="location-on" size={16} color="#99A0A5" />
                  <ThemedText style={styles.locationText}>{item.location}</ThemedText>
                </View>
              </View>
              <View style={styles.rightMeta}>
                <ThemedText style={styles.metaText}>{item.date}</ThemedText>
                <ThemedText style={styles.metaText}>{item.time}</ThemedText>
                <MaterialIcons name="chevron-right" size={20} color="#B6BCC2" />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 2,
  },
  avatarWrapOuter: {
    width: 140,
    height: 140,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
  },
  avatarWrapInner: {
    width: 120,
    height: 120,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#F1F2F4',
  },
  avatar: {
    width: 104,
    height: 104,
    borderRadius: 80,
  },
  name: {
    marginTop: 16,
  },
  handle: {
    color: '#98A2B3',
    marginTop: 4,
  },
  pointsPill: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FF8A34',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
  },
  pointsText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  sectionHeader: {
    marginTop: 12,
    paddingHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  seeAll: {
    color: Colors.light.tint,
    fontWeight: '600',
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 1,
  },
  postImage: {
    width: 76,
    height: 76,
    borderRadius: 10,
  },
  badgeDanger: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFE2E2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 6,
  },
  badgeDangerText: {
    color: '#E15268',
    fontSize: 12,
    fontWeight: '600',
  },
  postTitle: {
    color: '#2F6BFF',
    fontSize: 18,
    fontWeight: '700',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  locationText: {
    color: '#99A0A5',
  },
  rightMeta: {
    alignItems: 'flex-end',
    gap: 4,
  },
  metaText: {
    color: '#B6BCC2',
    fontSize: 12,
  },
});

export default profile;
