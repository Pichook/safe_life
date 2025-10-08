import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HeaderCustom({ title } : { title: string }) {
  return (
    <SafeAreaView style={{backgroundColor:'#ffffffff', paddingBottom:-46}}>
        {/* {
            title === 'map' ? (
            <View style={styles.container}>
                <Text style={styles.text}>{title}</Text>
            </View>
            ) : 
            (
            <View style={styles.container && {borderWidth:1, borderColor:'#000000'}}>
                <Text style={styles.text}>{title}</Text>
            </View>
            )
        } */}
                    <View style={[styles.container,
                        title !== "Map" && {borderColor:'#e0dede57', borderBottomWidth:0.5}]
                    }>
                {/* <View style={styles.container}> */}
                <Text style={styles.text}>{title}</Text>
            </View>

    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        paddingVertical:12,
        backgroundColor:'#FFFFFF',
        // borderWidth:1,
        // borderColor: 'black'
    }, 
    text: {
        fontSize:20,
        fontWeight:'bold',
        color:'#000000'
    }
})