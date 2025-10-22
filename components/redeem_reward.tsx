import { useRefresh } from '@/app/context/refresher';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from '../app/(tabs)/reward';

interface RedeemedReward {
  redemption_id: string;
  reward_id: string;
  rewarditemname: string;
  pointvalue: number;
//   equalPrice: number;
  image: string;
  redeemed_at: string;
}

export default function RedeemReward() {
    const { refreshing } = useRefresh();
    const [redeemedRewards, setRewards] = useState<RedeemedReward[]>([]);
    const [session, setSession] = useState<Session | null>(null);
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])
    useEffect(() => {
        async function fetchRedeemedRewards() {
            if (!session?.user?.id) return;

            const { data, error } = await supabase
                .from('user_redeemed_rewards')
                .select('redemption_id, reward_id, rewarditemname, pointvalue, image, redeemed_at')
                .eq('user_id', session.user.id)
                .order('redeemed_at', { ascending: false });

            if (error) {
                console.error('Error fetching redeemed rewards:', error);
                return;
            }

            console.log('Redeemed rewards:', data);
            setRewards(data as RedeemedReward[]);
        }

        fetchRedeemedRewards();

        if (refreshing) {
            fetchRedeemedRewards();
        }
    }, [session, refreshing]);
  return (
    <>
        <Text style={styles.sectionTitle}>Redemption History</Text>
        {
            redeemedRewards.length > 1 ? (redeemedRewards.map((r, index) => (
                <View key={index} style={styles.historyCard}>
                    <Image source={{uri : r.image}} style={styles.rewardImage} resizeMode='contain'/>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.rewardTitle}>{r.rewarditemname}</Text>
                        <View style={{ flexDirection: 'column',  gap:0, marginTop: 6 }}>
                        <Text style={styles.historyDate}>{new Date(r.redeemed_at).toLocaleDateString()}</Text>
                        <Text style={styles.historyDate}>{new Date(r.redeemed_at).toLocaleTimeString()}</Text>
                        </View>
                    </View>
                    <Text style={styles.negativePoints}>-{r.pointvalue} points</Text>
                </View>
            ))) : (
                <View style={styles.historyCard}>
                    <Text style={styles.nullCard}>No redeemed rewards yet.</Text>
                </View>
            )
        }
    </>
  )
}


