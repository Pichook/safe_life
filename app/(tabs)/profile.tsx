
import { Colors } from '@/constants/theme';
import { supabase } from '@/lib/supabase';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Session } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AVATAR = require('@/assets/images/react-logo.png');
const THUMB = require('@/assets/images/icon.png');

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
  const { width, height } = Dimensions.get('window');


const profile = () => {
    const [session, setSession] = useState<Session | null>(null)
    const [profile, setProfile] = useState<{ username?: string } | null>(null)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    if(!session?.user) return;

    const fetchProfile = async () => {
        const {data, error} = await supabase.from('profiles').select('username').eq('id', session.user?.id).single()
        if (error) {
        console.log(error)
        } else {
          setProfile(data)
        }
      }


    fetchProfile()
  }, [session])

  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.avatarWrapOuter}>
            <View style={styles.avatarWrapInner}>
              <Image source={AVATAR} style={styles.avatar} resizeMode="cover" />
            </View>
          </View>

          <Text style={styles.name}>{profile?.username}</Text>
          <Text style={styles.handle}>@{session?.user?.email}</Text>

          <View style={styles.pointsPill}>
            <MaterialIcons name="star" size={16} color="#FFFFFF" />
            <Text style={styles.pointsText}>2000 Points</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={{ fontSize: 18, fontWeight: '700' }}>Post History</Text>
          <TouchableOpacity activeOpacity={0.8}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={{ gap: 16 }}>
          {posts.map((item) => (
            <View key={item.id} style={styles.postCard}>
              <Image source={THUMB} style={styles.postImage} />
              <View style={{ flex: 1, paddingRight: 8 }}>
                <View style={styles.badgeDanger}>
                  <Text style={styles.badgeDangerText}>Dangerous</Text>
                </View>
                <TouchableOpacity activeOpacity={0.8}>
                  <Text style={styles.postTitle}>{item.title}</Text>
                </TouchableOpacity>
                <View style={styles.locationRow}>
                  <MaterialIcons name="location-on" size={14} color="#99A0A5" />
                  <Text style={styles.locationText}>{item.location}</Text>
                </View>
              </View>
              <View style={styles.rightMeta}>
                <Text style={styles.metaText}>{item.date}</Text>
                <Text style={styles.metaText}>{item.time}</Text>
                <MaterialIcons name="chevron-right" size={20} color="#B6BCC2" />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
    backgroundColor: '#FFFFFF',
    // height:height,
    // borderWidth:1,
    // borderColor: '#000000',
    
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
    fontWeight: '700',
    fontSize: 20,
    marginTop: 12,
  },
  handle: {
    color: '#98A2B3',
    fontSize: 10,
    // marginTop: 2,
  },
  pointsPill: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FF8A34',
    paddingHorizontal: 16,
    paddingVertical: 8,
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
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  seeAll: {
    color: Colors.light.tint,
    fontWeight: '200',
    fontSize:12,
    
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
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
    marginBottom: 6,
  },
  badgeDangerText: {
    color: '#E15268',
    fontSize: 8,
    fontWeight: '600',
  },
  postTitle: {
    color: '#2F6BFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 6,
  },
  locationText: {
    fontSize:9,
    color: '#99A0A5',
  },
  rightMeta: {
    alignItems: 'flex-end',
    gap: 2,
  },
  metaText: {
    color: '#B6BCC2',
    fontSize: 12,
  },
});

export default profile;
