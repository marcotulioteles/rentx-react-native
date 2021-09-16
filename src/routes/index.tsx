import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { useAuth } from '../hooks/auth';

import { AppTabRoutes } from './app.tab.routes';
import { AuthRoutes } from './auth.routes';
import { CarDTO } from '../dtos/CarDTO';
import { LoadAnimation } from '../components/LoadAnimation';

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: any;
      CarDetails: { car: CarDTO };
      SchedulingDetails: { car: any, dates: string[] };
      Confirmation: { title: string, message: string, nextScreenRoute: string };
      SignUpFirstStep: any;
      SignUpSecondStep: { user: {
        name: string,
        email: string,
        driverLicense: string
      }};
      SignIn: any;
      MyCars: any;
      nextScreenRoute: any;
      Scheduling: { car: CarDTO }
    }
  }
}

export function Routes() {
  const { user, loading } = useAuth();

  return (
    loading ? <LoadAnimation /> :
    <NavigationContainer>
      { user.id ?  <AppTabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}