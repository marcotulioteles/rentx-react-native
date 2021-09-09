import React, { useEffect, useState } from 'react';
import { Alert, StatusBar, Button } from 'react-native';  
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';
import { database } from '../../database';

import { CarDTO } from '../../dtos/CarDTO';
import { LoadAnimation } from '../../components/LoadAnimation';

// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   useAnimatedGestureHandler,
//   withSpring,
// } from 'react-native-reanimated';

// const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import Logo from '../../assets/logo.svg';
import api from '../../services/api';
import { Car } from '../../components/Car';
import { Car as ModelCar } from '../../database/model/Car';

import { NavigationProps } from '../../@types/navigate-from-react-navigate';

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
} from './styles';

export function Home() {
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);

  const netInfo = useNetInfo();
  const navigation = useNavigation<NavigationProps>();

  // const positionY = useSharedValue(0);
  // const positionX = useSharedValue(0);

  // const myCarsButtonStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       { translateX: positionX.value },
  //       { translateY: positionY.value }
  //     ]
  //   }
  // });

  // const onGestureEvent = useAnimatedGestureHandler({
  //   onStart(_, ctx: any) {
  //     ctx.positionX = positionX.value;
  //     ctx.positionY = positionY.value;
  //   },
  //   onActive(event, ctx: any) {
  //     positionX.value = ctx.positionX + event.translationX;
  //     positionY.value = ctx.positionY + event.translationY;
  //   },
  //   onEnd() {
  //     positionX.value = withSpring(0);
  //     positionY.value = withSpring(0);
  //   }
  // });

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car })
  }

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api
        .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);
        
        const { changes, latestVersion } = response.data;
        return { changes, timestamp: latestVersion };

      }, 
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post('/users/sync', user);
      }
    });
  
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars')
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const carCollection = database.get<ModelCar>('cars');
        const carsDB = await carCollection.query().fetch();

        // const response = await api.get('/cars');
        console.log(carsDB)
        
        if (isMounted) {
          setCars(carsDB);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCars();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />
          {
            !loading &&
            <TotalCars>
              Total de {cars.length} carros
            </TotalCars>
          }
        </HeaderContent>
      </Header>
        
      <Button title="SINCRONIZAR" onPress={offlineSynchronize}/>

      {loading ?
        <LoadAnimation /> :
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
        />
      }

      { /* FLOATING BUTTON */ }
      {/* <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
        style={[
          myCarsButtonStyle,
          {
            position: 'absolute',
            bottom: 13,
            right: 22,
          }
        ]}
        >
        <ButtonAnimated onPress={handleOpenMyCars} style={[styles.button, { backgroundColor: theme.colors.main }]}>
        <Ionicons
        name="ios-car-sport"
        size={32}
        color={theme.colors.shape}
        />
        </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler> */}
      </Container>
  );
}