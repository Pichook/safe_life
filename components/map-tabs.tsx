import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapScreens from './map-screens';

export default function MapTabs() {
  const [activeTab, setActiveTab] = useState<'map' | 'list'>('map');

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* Tabs Row */}
      <View style={{backgroundColor:'#FFFFFF'}}>
        <View style={styles.tabRow}>
            <TouchableOpacity
            style={[styles.tab, activeTab === 'map' && styles.activeTab]}
            onPress={() => setActiveTab('map')}
            >
            <Text style={[styles.tabText, activeTab === 'map' && styles.activeTabText]}>
                Map
            </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={[styles.tab, activeTab === 'list' && styles.activeTab]}
            onPress={() => setActiveTab('list')}
            >
            <Text style={[styles.tabText, activeTab === 'list' && styles.activeTabText]}>
                List
            </Text>
            </TouchableOpacity>
        </View>
      </View>


      {/* Tab Content */}
      <View style={{ flex: 1, marginTop: 20 }}>
        <MapScreens activeTab={activeTab} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    // marginTop: 16,
    marginHorizontal: 16,
    height: 50,

  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  tabText: {
    fontSize: 16,
    color: '#555',
  },
  activeTab: {
    // borderBottomWidth: 2,
    // borderBottomColor: '#007aff',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#000000ff',
  },
});