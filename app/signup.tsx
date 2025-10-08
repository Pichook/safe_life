import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { supabase } from '@/lib/supabase';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, AppState, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh()
    } else {
      supabase.auth.stopAutoRefresh()
    }
  })
export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [language, setLanguage] = useState<'km' | 'en'>('en');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
    //   name: name,
      email: email,
      password: password,
    }) 
    
    if (error) Alert.alert(error.message)
    const {data: userData, error: userError} = await supabase.auth.getUser()
    if (userError) Alert.alert(userError.message)

        const user = userData?.user
    if (user) {
        const  { error: insertError } = await supabase
        .from('profiles')
        .upsert({ id: user.id, username: name })

        if (insertError) Alert.alert(insertError.message)

    }


    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
    router.push('/(tabs)')

  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF7F2' }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          <ThemedView style={styles.container}>
            <ThemedText type="title" style={styles.welcome}>Welcome!</ThemedText>
            <ThemedText style={styles.subtitle}>Sign up for HazardApp</ThemedText>

            <View style={styles.card}>
              <View style={styles.inputRow}>
                <View style={styles.inputIconWrap}>
                  <MaterialIcons name="person" size={20} color="#A87342" />
                </View>
                <TextInput
                  placeholder="Name"
                  placeholderTextColor="#B8B3AE"
                  value={name}
                  onChangeText={(text) => setName(text)}
                  style={styles.textInput}
                />
              </View>

              <View style={styles.inputRow}>
                <View style={styles.inputIconWrap}>
                  <MaterialIcons name="email" size={20} color="#A87342" />
                </View>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#B8B3AE"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  style={styles.textInput}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputRow}>
                <View style={styles.inputIconWrap}>
                  <MaterialIcons name="lock" size={20} color="#A87342" />
                </View>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#B8B3AE"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  style={styles.textInput}
                  secureTextEntry={true}
                />
              </View>

              {/* <TouchableOpacity activeOpacity={0.8} style={styles.verifyButton} disabled={loading} onPress={() => {
                signInWithEmail();
              }}>
                <ThemedText style={styles.verifyText}>Log in</ThemedText>
              </TouchableOpacity> */}
              <TouchableOpacity activeOpacity={0.8} style={styles.verifyButton} disabled={loading} onPress={() => {
                signUpWithEmail();
              }}>
                <ThemedText style={styles.verifyText}>Sign up</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.7} style={{ alignSelf: 'center' }}>
                <ThemedText style={styles.forgot}>Forgot password?</ThemedText>
              </TouchableOpacity>
            </View>

            <View style={styles.langSwitch}>
              <TouchableOpacity
                onPress={() => setLanguage('km')}
                activeOpacity={0.8}
                style={[styles.langOption, language === 'km' && styles.langActive]}
              >
                <ThemedText style={[styles.langText, language === 'km' && styles.langTextActive]}>Khmer</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setLanguage('en')}
                activeOpacity={0.8}
                style={[styles.langOption, language === 'en' && styles.langActive]}
              >
                <ThemedText style={[styles.langText, language === 'en' && styles.langTextActive]}>English</ThemedText>
              </TouchableOpacity>
            </View>

            {/* <View style={styles.bottomWave} /> */}
          </ThemedView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF7F2',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  welcome: {
    color: '#2B2B2B',
    marginTop: 80,
    textAlign: 'center',
  },
  subtitle: {
    color: '#C9A990',
    marginTop: 8,
  },
  card: {
    width: '100%',
    marginTop: 28,
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.06)',
    borderRadius: 16,
    padding: 18,
    gap: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5EFEB',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 52,
  },
  inputIconWrap: {
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    color: '#2B2B2B',
    paddingVertical: 12,
  },
  verifyButton: {
    marginTop: 6,
    backgroundColor: '#FF8A34',
    borderRadius: 12,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  forgot: {
    marginTop: 10,
    color: '#B8895F',
  },
  langSwitch: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 22,
    backgroundColor: '#ECE7E2',
    borderRadius: 22,
    padding: 4,
  },
  langOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
  },
  langActive: {
    backgroundColor: '#FF8A34',
  },
  langText: {
    color: '#7A736C',
  },
  langTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  bottomWave: {
    position: 'absolute',
    bottom: -250,
    left: -80,
    right: -80,
    height: 320,
    borderTopLeftRadius: 220,
    borderTopRightRadius: 220,
    backgroundColor: '#FCE7DA',
  },
});


