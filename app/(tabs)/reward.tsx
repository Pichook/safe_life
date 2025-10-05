import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// const VOUCHER = require('@/assets/images/react-logo@2x.png');

type Reward = {
  id: string;
  title: string;
  subtitle: string;
  costPoints: number;
};

const availableRewards: Reward[] = [
  { id: '1', title: 'Aeon Gift Card', subtitle: '100 Yen Equivalent', costPoints: 500 },
  { id: '2', title: 'Aeon Gift Card', subtitle: '100 Yen Equivalent', costPoints: 500 },
  { id: '3', title: 'Aeon Gift Card', subtitle: '100 Yen Equivalent', costPoints: 500 },
  { id: '4', title: 'Aeon Gift Card', subtitle: '100 Yen Equivalent', costPoints: 500 },
];

const reward = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.pointsCardOuter}>
            <ThemedText style={styles.pointsLabel}>Your Current Points</ThemedText>
            <ThemedText style={styles.pointsValue}>1,250</ThemedText>
            <ThemedText style={styles.pointsSub}>Keep it up!</ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Available Rewards</ThemedText>
          <View style={{ gap: 16 }}>
            {availableRewards.map((r) => (
              <View key={r.id} style={styles.rewardCard}>
                {/* <Image source={VOUCHER} style={styles.rewardImage} /> */}
                <View style={{ flex: 1 }}>
                  <TouchableOpacity activeOpacity={0.8}>
                    <ThemedText style={styles.rewardTitle}>{r.title}</ThemedText>
                  </TouchableOpacity>
                  <ThemedText style={styles.rewardSubtitle}>{r.subtitle}</ThemedText>
                  <ThemedText style={styles.rewardPoints}>{r.costPoints} Points</ThemedText>
                </View>
                <TouchableOpacity style={styles.redeemBtn} activeOpacity={0.8}>
                  <ThemedText style={styles.redeemText}>Redeem</ThemedText>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Redemption History</ThemedText>
          <View style={styles.historyCard}>
            {/* <Image source={VOUCHER} style={styles.rewardImage} /> */}
            <View style={{ flex: 1 }}>
              <ThemedText style={styles.rewardTitle}>Aeon Gift Card</ThemedText>
              <ThemedText style={styles.historyDate}>Aug 15, 2025</ThemedText>
            </View>
            <ThemedText style={styles.negativePoints}>-100 points</ThemedText>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 24,
  },
  pointsCardOuter: {
    alignSelf: 'center',
    borderWidth: 10,
    borderColor: '#FFC58E',
    borderRadius: 100,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointsLabel: {
    color: '#9AA1A9',
    fontSize: 16,
  },
  pointsValue: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: '800',
    color: '#FF8A34',
  },
  pointsSub: {
    marginTop: 6,
    color: '#9AA1A9',
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    paddingHorizontal: 4,
  },
  rewardCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 1,
  },
  rewardImage: {
    width: 76,
    height: 48,
    borderRadius: 8,
  },
  rewardTitle: {
    color: '#2F6BFF',
    fontSize: 18,
    fontWeight: '700',
  },
  rewardSubtitle: {
    color: '#99A0A5',
    marginTop: 4,
  },
  rewardPoints: {
    color: '#25A244',
    marginTop: 6,
    fontWeight: '700',
  },
  redeemBtn: {
    backgroundColor: '#FF8A34',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
  },
  redeemText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 1,
  },
  historyDate: {
    color: '#99A0A5',
    marginTop: 6,
  },
  negativePoints: {
    color: '#E15268',
    fontWeight: '700',
  },
  seeAll: {
    color: Colors.light.tint,
  },
});

export default reward;
