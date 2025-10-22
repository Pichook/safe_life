
import AvailableReward from '@/components/available_reward';
import Points from '@/components/points';
import RedeemReward from '@/components/redeem_reward';
import { Colors } from '@/constants/theme';
import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { RefreshProvider, useRefresh } from '../context/refresher';


const RewardContent = () => {
  const { refreshing, onRefresh } = useRefresh();
  
  return (
    <ScrollView 
      contentContainerStyle={styles.container} 
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh}
          tintColor="#FF8A34"
          colors={["#FF8A34"]}
        />
      }
    >
      <Points />
      <View style={styles.section}>
        <AvailableReward />
      </View>
      <View style={styles.section}>
        <RedeemReward />
      </View>
    </ScrollView>
  );
};

const reward = () => {
  return (
    <RefreshProvider>
      <RewardContent />
    </RefreshProvider>
  );
};

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    gap: 32,
    backgroundColor: '#FFFFFF',
    
  },
  nullCard: {
    color: '#a4a4a4ff',
    fontSize: 14,
    padding: 4,
    marginBottom:4
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
    marginTop: 6,
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
    // marginTop: 6,
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
