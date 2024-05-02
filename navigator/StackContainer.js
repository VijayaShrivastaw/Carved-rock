
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Home from '../views/Home';
import About from '../views/About';
import Careers from '../views/Careers';
import Contact from '../views/Contact';
import Trail from '../views/Trail';
import TrailDetail from '../views/TrailDetail'
import Store from '../views/Store';
import Boot from '../views/Boot';
import BootShop from '../views/BootShop';
import KayakShop from '../views/KayakShop';
const Stack = createNativeStackNavigator();

const StackContainer = () => {
  return (
  <GestureHandlerRootView>
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen
          name="Home"
          component={Home}
        
          
        />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Careers" component={Careers} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="Trail" component={Trail} />
        <Stack.Screen name="TrailDetail" component={TrailDetail} />
        <Stack.Screen name="Store" component={Store} />
        <Stack.Screen name="Boot" component={Boot} />
        <Stack.Screen name="BootShop" component={BootShop} />
        <Stack.Screen name="KayakShop" component={KayakShop} />

        

        
        
      </Stack.Navigator>
      </GestureHandlerRootView>
  
  );
};

export default StackContainer