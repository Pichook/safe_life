import { HapticTab } from '@/components/haptic-tab';
import HeaderCustom from '@/components/header-custom';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from 'expo-router';
import React from 'react';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
      //   tabBarItemStyle: {  
      //     //testing
      //   borderColor: '#000000',
      //   borderWidth:1
      // },
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          title: 'Post',
          tabBarIcon: ({ color }) => <Entypo name="circle-with-plus" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          header: () => <HeaderCustom title='Map' />,
          headerShown: true,
          tabBarIcon: ({ color }) => <Entypo name="map" size={24} color={color} />,
        }}
      />      
      <Tabs.Screen
        name="reward"
        options={{
          header: () => <HeaderCustom title='Rewards' />,
          headerShown: true,
          tabBarIcon: ({ color }) => <FontAwesome5 name="gift" size={24} color={color} />,
        }}
      />
        <Tabs.Screen
        name="profile"
        options={{
          header: () => <HeaderCustom title='Profile' />,
          headerShown: true,
          tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
