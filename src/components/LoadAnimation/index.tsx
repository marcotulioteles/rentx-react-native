import React from 'react';
import LottieView from 'lottie-react-native';

import loadCarAnimated from '../../assets/loadCarAnimated.json';

import {
  Container
} from './styles';

export function LoadAnimation() {
  return (
    <Container>
      <LottieView 
        source={loadCarAnimated}
        style={{ height: 200 }}
        resizeMode="contain"
        autoPlay
        loop
      />
    </Container>
  );
}
