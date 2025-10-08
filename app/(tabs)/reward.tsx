
import { Colors } from '@/constants/theme';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// const VOUCHER = require('@/assets/images/react-logo.png');

import { ImageSourcePropType } from 'react-native';

type Reward = {
  id: string;
  title: string;
  subtitle?: string;
  costPoints: number;
  imageURL: ImageSourcePropType;
  dateRedeemed?: string;
};

const { width, height } = Dimensions.get('window');

const availableRewards: Reward[] = [
  { id: '1', title: 'Aeon Gift Card', subtitle: '100 Yen Equivalent', costPoints: 500, imageURL: require('@/assets/images/react-logo.png') },
  { id: '2', title: 'Aeon Gift Card', subtitle: '100 Yen Equivalent', costPoints: 500, imageURL: require('@/assets/images/react-logo.png') },
  { id: '3', title: 'Aeon Gift Card', subtitle: '100 Yen Equivalent', costPoints: 500, imageURL: require('@/assets/images/react-logo.png') },
  { id: '4', title: 'Aeon Gift Card', subtitle: '100 Yen Equivalent', costPoints: 500, imageURL: require('@/assets/images/react-logo.png') },
];

const redeemedRewards: Reward[] = [
  { id: '1', title: 'Aeon Gift Card', costPoints: 500, imageURL: require('@/assets/images/react-logo.png'), dateRedeemed: 'Aug 15, 2025' },
  { id: '2', title: 'Aeon Gift Card', costPoints: 500, imageURL: require('@/assets/images/react-logo.png'), dateRedeemed: 'Aug 15, 2025' },
  { id: '3', title: 'Aeon Gift Card', costPoints: 500, imageURL: require('@/assets/images/react-logo.png'), dateRedeemed: 'Aug 15, 2025' },
  { id: '4', title: 'Aeon Gift Card', costPoints: 500, imageURL: require('@/assets/images/react-logo.png'), dateRedeemed: 'Aug 15, 2025' },
];

const reward = () => {
  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} >
        <View style={styles.pointsCardOuter}>
            <Text style={styles.pointsLabel}>Your Current Points</Text>
            <Text style={styles.pointsValue}>1,250</Text>
            <Text style={styles.pointsSub}>Keep it up!</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Rewards</Text>
          <View style={{ gap: 16 }}>
            {availableRewards.map((r) => (
              <View key={r.id} style={styles.rewardCard}>
                <Image source={r.imageURL} style={styles.rewardImage} resizeMode='contain' />
                <View style={{ flex: 1 }}>
                  <TouchableOpacity activeOpacity={0.8}>
                    <Text style={styles.rewardTitle}>{r.title}</Text>
                  </TouchableOpacity>
                  <Text style={styles.rewardSubtitle}>{r.subtitle}</Text>
                  <Text style={styles.rewardPoints}>{r.costPoints} Points</Text>
                </View>
                <TouchableOpacity style={styles.redeemBtn} activeOpacity={0.8}>
                  <Text style={styles.redeemText}>Redeem</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Redemption History</Text>
          {
            redeemedRewards.length > 1 && (redeemedRewards.map((r) => (
              <View key={r.id} style={styles.historyCard}>
                <Image source={r.imageURL} style={styles.rewardImage} resizeMode='contain'/>
                <View style={{ flex: 1 }}>
                  <Text style={styles.rewardTitle}>{r.title}</Text>
                  <Text style={styles.historyDate}>{r.dateRedeemed}</Text>
                </View>
                <Text style={styles.negativePoints}>-{r.costPoints} points</Text>
              </View>
            )))
          }

        </View>
      </ScrollView>
    // {/* </SafeAreaView> */}
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    gap: 32,
    backgroundColor: '#FFFFFF',
    
  },
  pointsCardOuter: {
    alignSelf: 'center',
    borderWidth: 10,
    borderColor: '#FFC58E',
    borderRadius: 100,
    paddingVertical: 20,
    paddingHorizontal: 40,
    boxShadow: '0 4px 16px rgba(255, 110, 7, 0.2)',
    shadowRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointsLabel: {
    color: '#9AA1A9',
    fontSize: 12,
  },
  pointsValue: {
    marginTop: 6,
    fontSize: 24,
    fontWeight: '700',
    color: '#FF8A34',
  },
  pointsSub: {
    marginTop: 6,
    fontSize: 12,
    color: '#9AA1A9',
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  rewardTitle: {
    color: '#2F6BFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: -4,
  },
  rewardSubtitle: {
    color: '#99A0A5',
    fontSize: 10,
    // marginTop: 2,
  },
  rewardPoints: {
    color: '#25A244',
    marginTop: 6,
    fontSize: 14,
    fontWeight: '700',
  },
  redeemBtn: {
    backgroundColor: '#FF8A34',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 24,
  },
  redeemText: {
    color: '#FFFFFF',
    fontSize: 12,
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
    fontSize: 10,
    marginTop: 6,
  },
  negativePoints: {
    color: '#E15268',
    fontSize: 12,
    fontWeight: '700',
  },
  seeAll: {
    color: Colors.light.tint,
  },
});

export default reward;
