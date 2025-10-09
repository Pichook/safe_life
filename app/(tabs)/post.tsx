import { Alert, Dimensions, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Map from '@/components/map';
import { supabase } from '@/lib/supabase';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from '@supabase/supabase-js';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from "zod";
import { useLocation } from '../context/location-context';
import { image, postSchema } from './model/post_schema';

// import { randomUUID } from 'expo-crypto';

  const { width, height } = Dimensions.get('window');

  type CategoryId = "" | "Drainage" | "Ongoing Disaster" | "Road Hazard" | "Others";
  type HazardLevel = "Low" | "Medium" | "High";
  
  const categories: { id: CategoryId; label: string }[] = [
      { id: "Drainage", label: "Drainage" },
      { id: "Ongoing Disaster", label: "Ongoing Disaster" },
      { id: "Road Hazard", label: "Road Hazard" },
      { id: "Others", label: "Others" },
    ];

  const hazardLevels: {id: HazardLevel; label: string }[] = [
    {id: "High", label: "High"},
    {id: "Medium", label: "Medium"},
    {id: "Low", label: "Low"},

  ]


export default function TabTwoScreen() {
  const [pic, setPic] = useState<z.infer<typeof image> | null>(null);
    const [session, setSession] = useState<Session | null>(null)
    const randomID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const { location } = useLocation();
  const { control, handleSubmit, formState: { errors }, setValue, reset } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues:{
          userid: session?.user.id.toString(),
          // imageId: randomID,
          image: { uri: '', type: '', name: '' },
          category: 'Road Hazard',
          description: '',
          hazardlevel: 'Low',
          latitude: 0,
          longitude: 0,
    }
  });

      useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        if (session?.user?.id) {
          setValue("userid", session.user.id);
        }
      });

      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        if (session?.user?.id) {
          setValue("userid", session.user.id);
        }
      });

      return () => {
        listener?.subscription.unsubscribe();
      };
    }, [setValue]);

  const openCamera = async () =>{
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Camera permission is required to take a photo');
      return;
    }

    const Cam_result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    })


    if (!Cam_result.canceled) {
      const image = Cam_result.assets[0];
      const imgObj = { uri: image.uri, type: image.mimeType ?? '', name: image.fileName ?? '' };
      setPic(imgObj);
      setValue('image', imgObj);
    }

    console.log("Image Collected", Cam_result);
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const image = result.assets[0]
      setPic({ uri: image.uri, type: image.type ?? '', name: image.fileName ?? '' });
    }

    console.log(result);
  }

  const insertImage = async(img: z.infer<typeof image>) =>{
    const {data, error} = await supabase.from('images')
  .insert([
      { uri: img.uri, type: img.type, name: img.name }
    ])
    .select('id').single();

    if (error) throw error;
    return data.id;
  }

  const onSubmit = async (postData: z.infer<typeof postSchema>) => {
    try{
      let imageid = null;
      if (postData.image?.uri) {
        imageid = await insertImage(postData.image);
      }
      const { image, ...postFields } = postData; // remove image field before inserting
      const {data, error} = await supabase.from('posts')
      .insert([{
        ...postFields,
        imageid,
        userid: session?.user.id,
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
      }])
      .select('*').single();

      if (error) throw error;
      console.log("Post inserted", data);
      console.log("location", location)
      reset();
      setPic(null);

    } catch (error) {
      console.error("Error inserting post", error); 
    }
  }

  const onErrors = (errors: any) =>{
    console.log("Form Errors", errors);
  }


  // Remove direct watch, use Controller for reactivity

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      {/* <SafeAreaView style={{flex:1}}> */}
        <Map style={styles.map} />
        <ScrollView style={{flex:1}} contentContainerStyle={styles.overlay} keyboardShouldPersistTaps='handled'>
          <View style={styles.container}>

            <Controller 
              name='image'
              control={control}
              render={({field:{ value, onChange}}) => (
                <>
                  {value?.uri ? (
                    <View style={{ alignItems: 'center', marginVertical: 10 }}>
                      {/* <Text style={[styles.header, {backgroundColor: '#F5F5F5', borderRadius: 10, padding:10}]}>Preview</Text> */}
                      <Image source={{ uri: value.uri }} style={{ width: 200, height: 200, borderRadius: 10 }} />
                      <TouchableOpacity
                        style={[styles.deleteButton, { marginTop: 8, backgroundColor: '#F87171', padding: 8, borderRadius: 6 }]}
                        onPress={() => {
                          onChange({ uri: '', type: '', name: '' });
                        }}
                      >
                        <MaterialIcons name="cancel" size={24} color="white" />
                      </TouchableOpacity>
                    </View>
                  ) : null}
                {
                  !value?.uri ? (
                    <TouchableOpacity onPress={openCamera} style={styles.cameraContainer}>
                      <View style={styles.camera}>
                        <AntDesign name="camera" size={36} color="#DE9246" />
                        <Text style={styles.header}>Open Camera</Text>
                        <Text style={styles.text}>Please take a photo of the hazardous area</Text>
                      </View>
                    </TouchableOpacity>
                  ) : null}


                </>
              )}
            />



            <View style={styles.form}>
              <Text style={styles.header}>Select Category</Text>
              <Controller
                control={control}
                name="category"
                render={({ field: { value, onChange } }) => (
                  <View style={styles.category}>
                    {categories.map((category) => (
                      <TouchableOpacity
                        style={[styles.categoryItems, value === category.id && styles.active_categoryItems]}
                        key={category.id}
                        onPress={() => onChange(category.id)}
                      >
                        {category.id === "Drainage" && <MaterialIcons name="flood" size={16} color={value === category.id ? "white" : "#797979ff"} />}
                        {category.id === "Ongoing Disaster" && <Feather name="alert-triangle" size={16} color={value === category.id ? "white" : "#797979ff"} />}
                        {category.id === "Road Hazard" && <MaterialIcons name="remove-road" size={16} color={value === category.id ? "white" : "#797979ff"} />}
                        {category.id === "Others" && <AntDesign name="question-circle" size={16} color={value === category.id ? "white" : "#797979ff"} />}
                        <Text style={[styles.text, { color: value === category.id ? "white" : "#797979ff" }]}>{category.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              />

                <View>
                  <View style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
                    <Text style={styles.header}>Comment</Text>
                    <Text style={styles.text}>(Optional)</Text>
                  </View>
                  <Controller 
                  control={control}
                  name="description"
                  render = {({field: { value, onChange}}) => (
                    <TextInput 
                      multiline={true}
                      numberOfLines={4}
                      placeholder='Add additional details here...'
                      value={value}
                      onChangeText={onChange}
                      textAlignVertical='top'
                      style={{height:100, borderWidth: 1, borderColor: '#34343423', borderRadius: 10, padding: 10, fontSize: 12, backgroundColor: '#F5F5F5'}}
                        keyboardType="default"
                        autoCapitalize="none"
                    />
                  )}
                  />
                </View>

                <View style={{flexDirection: 'column', gap: 4}}>
                  <Text style={styles.header}>Hazard Level Evaluation</Text>
                  <Controller 
                  control={control}
                  name="hazardlevel"
                  render={({ field: { value, onChange } }) => (
                    <View style={{flexDirection: 'row', gap: 10}}>
                      {hazardLevels.map((level) => {
                        let selectedStyle = null;
                        if (value === level.id) {
                          if (level.id === 'Low') selectedStyle = styles.hazardLow;
                          else if (level.id === 'Medium') selectedStyle = styles.hazardMedium;
                          else if (level.id === 'High') selectedStyle = styles.hazardHigh;
                        }
                        return (
                          <TouchableOpacity key={level.id} onPress={() => onChange(level.id)}>
                            <View style={[styles.Hazard, selectedStyle]}>
                              {level.id === "Low" && <FontAwesome5 name="check-circle" size={16} color={value === level.id ? "white" : "#797979ff"} />}
                              {level.id === "Medium" && <Feather name="alert-triangle" size={16} color={value === level.id ? "white" : "#797979ff"} />}
                              {level.id === "High" && <MaterialIcons name="flood" size={16} color={value === level.id ? "white" : "#797979ff"} />}
                              <Text style={[styles.text, { color: value === level.id ? "white" : "#797979ff" }]}>{level.label}</Text>
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  )}
                  
                  />

                </View>
              </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit, onErrors)}
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
    gap: 5,
    padding: 10,
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
  },
  active_categoryItems: {
    backgroundColor: '#4ADE80',
    borderColor: '#4ADE80'
  },
  hazardLow: {
    backgroundColor: '#4ADE80',
    borderColor: '#4ADE80',
  },
  hazardMedium: {
    backgroundColor: '#FACC15',
    borderColor: '#FACC15',
  },
  hazardHigh: {
    backgroundColor: '#F87171',
    borderColor: '#F87171',
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 5,
  }
});
