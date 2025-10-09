import { useLocation } from '@/app/context/location-context';
import markers from '@/assets/markers';
import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Map({style} : {style?: object}) {
    const { location } = useLocation();
  return (
          <MapView style={[ styles.map, style ]} 
          initialRegion={markers[0].coordinates}>
              {/* Custom orange home marker */}
              {/* <Marker coordinate={markers[0].coordinates} onPress={() => setShowReportSheet(true)}>
                <View style={styles.homeMarkerWrap}>
                  <View style={styles.homeMarkerCircle}>
                    <Ionicons name="home" size={22} color="#ffffff" />
                  </View>
                  <View style={styles.homeMarkerTriangle} />
                </View>
              </Marker> */}
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
})