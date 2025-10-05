import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function MapBar() {
  return (
    <View style={styles.container}>
        <Image source={require('@/assets/images/react-logo.png')} />
        <Text>React Logo</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        margin:16,
        padding:16,
        backgroundColor:'#416dc5ff',
        borderRadius:8,
    }
})
