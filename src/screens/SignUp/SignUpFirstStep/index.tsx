import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../../@types/navigate-from-react-navigate';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from './styles';
import { Alert } from 'react-native';

export function SignUpFirstStep() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');
  const navigation = useNavigation<NavigationProps>();

  const scheme = yup.object().shape({
    driverLicense: yup.string().required('Número da CNH é obrigatório'),
    email: yup.string().required('e-mail é obrigatório').email('Digite um e-mail válido'),
    name: yup.string().required('Nome é obrigatório')
  });

  const data = { name, email, driverLicense };

  function handleBack() {
    navigation.goBack();
  }

  async function handleSignUpSecondStep() {
    try {
      await scheme.validate(data);
      navigation.navigate('SignUpSecondStep', { user: data });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return Alert.alert('Opa', error.message);
      }
    }

  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>
            Crie sua{'\n'}conta
          </Title>
          <SubTitle>
            Faça seu cadastro de{'\n'}forma rápida e fácil
          </SubTitle>

          <Form>
            <FormTitle>01. Dados</FormTitle>
            <Input
              iconName="user"
              placeholder="Nome"
              onChangeText={setName}
              value={name}
            />
            <Input
              iconName="mail"
              placeholder="e-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}              
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              onChangeText={setDriverLicense}
              value={driverLicense}              
            />
          </Form>

          <Button
            title="Próximo"
            onPress={handleSignUpSecondStep}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}