import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'styled-components';

import {
  Container,
  Header,
  Title,
  SubTitle
} from './styles';
import { BackButton } from '../../components/BackButton';

export function MyCars() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/schedules_byuser?user_id=1');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [])

  return (
    <Container>
      <Header>
        <StatusBar 
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton
          onPress={handleBack}
          color={theme.colors.shape}
        />

        <Title>Escolha uma {'\n'}data de início e {'\n'}fim do aluguel</Title>
        <SubTitle>Conforto, segurança e praticidade.</SubTitle>
      </Header>
    </Container>
  );
}