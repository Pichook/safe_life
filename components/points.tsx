import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from '../app/(tabs)/reward';
import { useRefresh } from '../app/context/refresher';


export default function Points() {
    const { refreshing } = useRefresh();
    const [profile, setProfile] = useState<{ points: number } | null>(null);
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
        })
        supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        })
    }, [])
    const fetchPoints = useCallback(async () => {
    if (!session?.user) return null;
    const { data, error } = await supabase
        .from('profiles')
        .select('points')
        .eq('id', session.user?.id)
        .single();
    if (error) {
        console.log(error);
        return null;
    }
    setProfile(data);
    return data;
    }, [session]);

    useEffect(() => {
        fetchPoints();
    }, [fetchPoints]);
    
    useEffect(() => {
        if (refreshing) {
        fetchPoints();
        }
    }, [refreshing]);


    
  return (
    <View style={styles.pointsCardOuter}>
        <Text style={styles.pointsLabel}>Your Current Points</Text>
        <Text style={styles.pointsValue}>{profile?.points.toLocaleString() || 0}</Text>
        <Text style={styles.pointsSub}>Keep it up!</Text>
    </View>
  )
}
