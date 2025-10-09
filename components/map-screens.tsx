import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapBar from './map-bar';
import MapVisual from './map-visual';


export default function MapScreens({activeTab}: {activeTab: 'map' | 'list'}) {

  return (
    <View style={styles.container}>
        {
            activeTab === 'map' ? (
                <MapVisual  />
            ) : (
                <MapBar />
            )
        }

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
});