import markers from "@/assets/markers";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import * as Location from "expo-location";
import React, { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

type RankingRow = {
  id: string;
  rank: string;
  name: string;
  posts: number;
  score: number;
};

const RANKING_DATA: RankingRow[] = [
  { id: '1', rank: '1st', name: 'Alex Jones', posts: 123, score: 123 },
  { id: '2', rank: '1st', name: 'Alex Jones', posts: 123, score: 123 },
  { id: '3', rank: '1st', name: 'Alex Jones', posts: 123, score: 123 },
];

export default function MapVisual({style} : {style?: object}) {
    const [location, setLocation] = useState<Location.LocationObject | null>(null)
    const [showRanking, setShowRanking] = useState<boolean>(false)
    const [showReportSheet, setShowReportSheet] = useState<boolean>(false)

    useEffect(() => {
        (async() => {
        try{
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
            console.log("Permission to access location was denied");
            return;
            }
            let loc = await Location.getCurrentPositionAsync({});
            if (!loc) return alert("Permission Granted but no location found");
            setLocation(loc);
            console.log(loc);
        } catch(e){
            console.log(e);
        }

        })();
    }, []);

  return (
  <View style={styles.container}>
      <MapView style={[ styles.map, style ]} 
          initialRegion={markers[0].coordinates}>
              {/* Custom orange home marker */}
              <Marker coordinate={markers[0].coordinates} onPress={() => setShowReportSheet(true)}>
                <View style={styles.homeMarkerWrap}>
                  <View style={styles.homeMarkerCircle}>
                    <Ionicons name="home" size={22} color="#ffffff" />
                  </View>
                  <View style={styles.homeMarkerTriangle} />
                </View>
              </Marker>
              {markers.map((marker, index) => (
              <Marker
                  key={index}
                  coordinate={marker.coordinates}
                  title={marker.name}
              />
              ))}
              {
              location && 
                  (<Marker
                      key={'currentLocation'}
                      coordinate={{
                          latitude: location.coords.latitude,
                          longitude: location.coords.longitude,
                      }}
                      title={'You are here!'}
                      pinColor='blue'
                  />
                  )
              }

      </MapView>

      {showRanking && (
        <View style={styles.rankingCard}>
          <View style={styles.rankingHeader}>
            <View style={styles.headerLeft}>
              <Ionicons name="trophy" size={22} color="#f59e0b" style={{ marginRight: 8 }} />
              <Text style={styles.rankingTitle}>Ranking</Text>
            </View>
            <Text style={styles.seeAll}>See All</Text>
          </View>
          <View style={styles.tableHeader}>
            <Text style={styles.thPost}>Post</Text>
            <Text style={styles.thRight}>LGTransfer</Text>
          </View>
          <View style={styles.headerUnderline} />
          {RANKING_DATA.map((row) => (
            <View key={row.id} style={styles.row}>
              <Text style={styles.rankText}>{row.rank}</Text>
              <View style={styles.personCol}>
                <Ionicons name="person-circle-outline" size={28} color="#9ca3af" style={{ marginRight: 10 }} />
                <View>
                  <Text style={styles.personName}>{row.name}</Text>
                  <Text style={styles.personSub}>{row.posts} posts</Text>
                </View>
              </View>
              <Text style={styles.scoreText}>{row.score}</Text>
            </View>
          ))}
        </View>
      )}

      <Pressable
        onPress={() => setShowRanking((s) => !s)}
        style={[
          styles.toggleFab,
          showRanking ? { borderWidth: 4, borderColor: '#f59e0b' } : { borderWidth: 0 },
        ]}
        accessibilityRole="button"
        accessibilityLabel="Toggle ranking"
      >
        <Ionicons name="trophy" size={32} color="#f59e0b" />
      </Pressable>

      <Modal visible={showReportSheet} animationType="slide" transparent>
        <View style={styles.modalRoot}>
          <Pressable style={styles.modalBackdrop} onPress={() => setShowReportSheet(false)} />
          <View style={styles.sheet}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Hazard Reports</Text>
            <Text style={styles.sheetSubtitle}>Photo submitted by the community</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.previewRow}
            >
              {[0,1,2,3].map((i) => (
                <Image
                  key={`preview-${i}`}
                  source={require('@/assets/images/react-logo.png')}
                  style={styles.previewImage}
                  contentFit="cover"
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
  </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  // Custom orange home marker (approx 45.98 x 58.26)
  homeMarkerWrap: {
    alignItems: 'center',
  },
  homeMarkerCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#f59e0b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeMarkerTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#f59e0b',
  },
  rankingCard: {
    position: 'absolute',
    top: 56,
    left: 16,
    right: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  rankingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankingTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  seeAll: {
    color: '#3b82f6',
    fontSize: 12,
    fontWeight: '600',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  thPost: {
    fontSize: 14,
    color: '#6b7280',
  },
  thRight: {
    fontSize: 14,
    color: '#6b7280',
  },
  headerUnderline: {
    height: 2,
    backgroundColor: '#e5e7eb',
    width: '45%',
    marginTop: 8,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  rankText: {
    width: 36,
    color: '#111827',
    fontWeight: '600',
  },
  personCol: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  personName: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
  },
  personSub: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: 2,
  },
  scoreText: {
    width: 60,
    textAlign: 'right',
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  toggleFab: {
    position: 'absolute',
    bottom: 32,
    left: 16,
    width: 73,
    height: 73,
    borderRadius: 100,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  sheet: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // slightly taller and avoid covering bottom nav bar
    minHeight: 320,
    marginBottom: 84,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 999,
    marginBottom: 8,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  sheetSubtitle: {
    marginTop: 8,
    color: '#6b7280',
  },
  previewRow: {
    paddingVertical: 16,
  },
  previewImage: {
    width: 320,
    height: 220,
    borderRadius: 12,
    marginRight: 16,
    backgroundColor: '#f3f4f6',
  },
});