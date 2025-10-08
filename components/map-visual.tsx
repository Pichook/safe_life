import markers from "@/assets/markers";
import * as Location from "expo-location";
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapVisual({style} : {style?: object}) {
    const [location, setLocation] = useState<Location.LocationObject | null>(null)

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