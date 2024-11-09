import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { getNoteTableInstance, insertNote } from '../../local/Database';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './Home';
import Search from './Search';
import Create from './Create';


const BottomTab = createBottomTabNavigator()

const HomeComponent = () => {



  return (


    <BottomTab.Navigator>
      <BottomTab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name='Search'
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26} />
          ),
          headerShown: false

        }}
      />
      <BottomTab.Screen
        name='Create'
        component={Create}
        options={{
          tabBarLabel: 'Create',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="pencil" color={color} size={26} />
          ),
          headerShown: false
        }}
      />
    </BottomTab.Navigator>

  );
};

export default HomeComponent;