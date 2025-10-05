import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HeaderCustom({ title } : { title: string }) {
  return (
    <SafeAreaView style={{backgroundColor:'#FFFFFF'}}>
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
        </View>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        paddingVertical:16,
        backgroundColor:'#FFFFFF'
    }, 
    text: {
        fontSize:20,
        fontWeight:'bold',
        color:'#000000'
    }
})