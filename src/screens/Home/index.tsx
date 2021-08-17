import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
} from './styles';

export function Home() {
  const carData1 = {
    brand: 'audi',
    name: 'rs 5 coupe',
    rent: {
      period: 'ao dia',
      price: 120,
    },
    thumbnail: 'https://www.motortrend.com/uploads/sites/10/2018/05/2018-audi-rs5-4wd-coupe-angular-front.png',
  }
  const carData2 = {
    brand: 'porsche',
    name: 'Panamera',
    rent: {
      period: 'ao dia',
      price: 340,
    },
    thumbnail: 'https://purepng.com/public/uploads/large/purepng.com-black-porsche-panamera-carcarvehicletransportporsche-961524660080ezwd4.png',
  }

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
          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>

      <Car 
        data = {carData1}
      />
      <Car 
        data = {carData2}
      />
    </Container>
  );
}