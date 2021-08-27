import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator();

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { SchedulingComplete } from '../screens/SchedulingComplete';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';

export function StackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Screen name="Splash" component={Splash}/>
      <Screen name="Home" component={Home}/>
      <Screen name="CarDetails" component={CarDetails}/>
      <Screen name="Scheduling" component={Scheduling}/>
      <Screen name="SchedulingDetails" component={SchedulingDetails}/>
      <Screen name="SchedulingComplete" component={SchedulingComplete}/>
      <Screen name="MyCars" component={MyCars}/>
    </Navigator>
  )
}