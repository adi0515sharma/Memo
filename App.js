import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/AuthenticationSection/LoginScreen'
import HomeComponent from './Screens/HomeSection/HomeScreen';
import auth from '@react-native-firebase/auth';
import GetConnection from './local/Database';
import Create from './Screens/HomeSection/Create';


const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

export default function App() {


  const [initialScreen, setInitialScreen] = useState(null)


  useEffect(()=>{

    const realmConnection = GetConnection()
    return ()=>{
      realmConnection.close()
    }
  },[])


  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user)=>{
      if (user) {
        console.log(user)
        setInitialScreen("HomeScreen")
      } else {
        setInitialScreen("LoginScreen")
  
      }
    });
    return subscriber; // unsubscribe on unmount
  }, []);


  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user)=>{
      if (user) {
        setInitialScreen("HomeScreen")
      } else {
        setInitialScreen("LoginScreen")
  
      }
    });
    return subscriber; // unsubscribe on unmount
  }, []);


  if(!initialScreen){
    return <></>
  }
 
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialScreen}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeComponent}  options={{ headerShown: false }} />
        <Stack.Screen name="EditScreen" component={Create} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>

  );
}
