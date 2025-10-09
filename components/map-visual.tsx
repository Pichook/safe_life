import { useLocation } from "@/app/context/location-context";
import markers from "@/assets/markers";
import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapVisual({style} : {style?: object}) {
    // const [location, setLocation] = useState<Location.LocationObject | null>(null)
    const { location } = useLocation();

  return (
    <View>
        <MapView style={[ styles.map, style ]} 
            initialRegion={markers[0].coordinates}>
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