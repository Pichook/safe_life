import { useRefresh } from '@/app/context/refresher';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../app/(tabs)/reward';

interface Reward {
  id: string;
  rewarditemname: string;
  pointvalue: number;
  equalprice: number;
  image: string;
  isavailable: boolean;
  remaining: number | null;
}


export default function AvailableReward() {
    const { refreshing } = useRefresh();
    const [rewards, setRewards] = useState<Reward[]>([]);
    const [session, setSession] = useState<Session | null>(null);
    useEffect(() => {
        fetchRewards();
    }, []);

    async function fetchRewards() {
        const { data, error } = await supabase
            .from('available_rewards')
            .select('id, rewarditemname, pointvalue, equalprice, image, remaining, isavailable')
            .order('createdat', { ascending: false });

        if (error) {
            console.error('Error fetching rewards:', error);
            return;
        }

        setRewards(data as Reward[]);
    }

    async function redeemReward(rewardId: string, userId: string) {
    const { data, error } = await supabase
        .rpc('redeem_reward', { user_uuid: userId, reward_uuid: rewardId });

    if (error) {
        console.error('Error redeeming reward:', error.message);
        alert(error.message); // show the error to the user
        return false;
    }

    return true;
    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])
    const userId = session?.user.id || '';

    useEffect(() => {
        if (refreshing) {
        fetchRewards();
        }
    }, [refreshing]);

  return (
    <>
        <Text style={styles.sectionTitle}>Available Rewards</Text>
        <View style={{ gap: 16 }}>
        {rewards.map((r) => (
            <View key={r.id} style={styles.rewardCard}>
            <Image source={{uri : r.image}} style={styles.rewardImage} resizeMode='contain' />
            <View style={{ flex: 1 }}>
                <TouchableOpacity activeOpacity={0.8}>
                <Text style={styles.rewardTitle}>{r.rewarditemname}</Text>
                </TouchableOpacity>
                <Text style={styles.rewardSubtitle}>{r.equalprice} Yen Equivalence</Text>
                <Text style={styles.rewardPoints}>{r.pointvalue} Points</Text>
            </View>
            <TouchableOpacity
            style={[styles.redeemBtn, !r.isavailable && { backgroundColor: '#ccc' }]}
            activeOpacity={0.8}
            disabled={!r.isavailable}
            onPress={async () => {
                if (!userId) {
                alert('You must be logged in to redeem rewards.');
                return;
                }

                const success = await redeemReward(r.id, userId);
                if (success) {
                alert('Reward redeemed!');
                fetchRewards(); // refresh reward list
                }
            }}
            >
                <Text style={styles.redeemText}>Redeem</Text>
            </TouchableOpacity>
            </View>
        ))}
        </View>
    </>
  )
}

