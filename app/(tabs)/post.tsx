import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import MapVisual from '@/components/map-visual';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


  const { width, height } = Dimensions.get('window');


export default function TabTwoScreen() {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      {/* <SafeAreaView style={{flex:1}}> */}
        <MapVisual style={styles.map} />
        <ScrollView style={{flex:1}} contentContainerStyle={styles.overlay} keyboardShouldPersistTaps='handled'>
          <View style={styles.container}>

            <View style={styles.cameraContainer}>
              <View style={styles.camera}>
                <AntDesign name="camera" size={36} color="#DE9246" />
                <Text style={styles.header}>Open Camera</Text>
                <Text style={styles.text}>Please take a photo of the hazardous area</Text>
              </View>
            </View>

          
              <View style={styles.form}>
                <Text style={styles.header}>Select Category</Text>
                <View style={styles.category}>
                  <View style={styles.categoryItems}>
                    <MaterialIcons name="flood" size={16} color="#B3B3B3" />
                    <Text style={styles.text}>Drainage</Text>
                  </View>
                  <View style={styles.categoryItems}>
                    <Feather name="alert-triangle" size={16} color="#B3B3B3" />
                    <Text style={styles.text}>Ongoing Disaster</Text>
                  </View>
                  <View style={styles.categoryItems}>
                    <MaterialIcons name="remove-road" size={16} color="#B3B3B3" />
                    <Text style={styles.text}>Road Hazard</Text>
                  </View>
                  <View style={styles.categoryItems}>
                    <AntDesign name="question-circle" size={16} color="#B3B3B3" />
                    <Text style={styles.text}>Others</Text>
                  </View>
                </View>

                <View>
                  <View style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
                    <Text style={styles.header}>Comment</Text>
                    <Text style={styles.text}>(Optional)</Text>
                  </View>
                  <TextInput 
                  multiline={true}
                  numberOfLines={4}
                  placeholder='Add additional details here...'
                  textAlignVertical='top'
                  style={{height:100, borderWidth: 1, borderColor: '#34343423', borderRadius: 10, padding: 10, fontSize: 12, backgroundColor: '#F5F5F5'}}
                    keyboardType="default"
                    autoCapitalize="none"

                  
                  />
                </View>

                <View style={{flexDirection: 'column', gap: 4}}>
                  <Text style={styles.header}>Hazard Level Evaluation</Text>
                  <View style={{flexDirection: 'row', gap: 10}}>
                    <View style={styles.Hazard}>
                      <MaterialIcons name="flood" size={16} color="#B3B3B3" />
                      <Text style={styles.text}>High</Text>
                    </View>
                    <View style={styles.Hazard}>
                      <MaterialIcons name="flood" size={16} color="#B3B3B3" />
                      <Text style={styles.text}>High</Text>
                    </View>
                    <View style={styles.Hazard}>
                      <MaterialIcons name="flood" size={16} color="#B3B3B3" />
                      <Text style={styles.text}>High</Text>
                    </View>
                  </View>
                </View>
              </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => {}}
          activeOpacity={0.8}
          style={styles.button}
        >
          <Text style={{ color: 'white' }}>Send</Text>
        </TouchableOpacity>

        
      {/* </SafeAreaView> */}
    </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
  map: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity:0.5,

    
  },
  overlay: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: height * 0.8,
    margin: 20,
    // padding: 10,
    //     borderWidth:1,
    // borderColor: '#000000',
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#797979ff'
  },
  header:{
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  container: {
    flexDirection: 'column',
    gap:10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    //         borderWidth:1,
    // borderColor: '#04ff96ff',
    // margin: 10,
  },
  cameraContainer: {
    height: height * 0.31,
    width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    //         borderWidth:1,
    // borderColor: '#ea3c3cff',
  },

  camera:{
    flexDirection: 'column',
    width: width * 0.7,
    height: height * 0.2,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: 'white',
    // padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: width * 0.9,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    gap: 10,
    flexDirection: 'column',
  },
  category: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',

  }, 
  categoryItems:{
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    width: '46%',
    padding: 10,
    margin:5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#34343423',
  },
  Hazard:{
    flexDirection: 'row',
    gap: 10,
    padding: 5,
    color: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#34343423',

  },
  button: {
    backgroundColor: '#FA9338',
    // width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    // borderWidth:1,
    // borderColor: '#000000',
  }
});
