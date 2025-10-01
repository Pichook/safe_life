import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const map = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:'#FFFFFF' }}>
        <ThemedView style={{ flexDirection: 'column', gap:8}}>
            <ThemedText type="title">Profile Page</ThemedText>
            <ThemedText>This is my new page!</ThemedText>
        </ThemedView>
    </SafeAreaView>

  );
};

export default map;
