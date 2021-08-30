import React, { useState } from 'react';
import { StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button } from '../../components/Button';

import * as yup from 'yup';

import { useTheme } from 'styled-components';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Form,
  Footer,
} from './styles';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { Alert } from 'react-native';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const theme = useTheme();

  const scheme = yup.object().shape({
    email: yup.string().required('e-mail obrigatório').email('Digite um e-mail válido'),
    password: yup.string().required('A senha é obrigatória')
  });

  async function handleSignIn() {
    try {
      await scheme.validate({ email, password })
      Alert.alert('tudo certo!')

      //fazer login
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return Alert.alert('Opa', error.message);
      } else {
        Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login, verifique as credenciais')
      }
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <Header>
            <Title>Estamos{'\n'}quase lá.</Title>
            <SubTitle>
              Faça seu login para começar{'\n'}uma experiência incrível.
            </SubTitle>
          </Header>
          <Form>
            <Input
              iconName="mail"
              placeholder="e-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />

            <PasswordInput
              iconName="lock"
              placeholder="senha"
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
              enabled={true}
              loading={false}
            />

            <Button
              title="Criar conta gratuita"
              color={theme.colors.background_secondary}
              onPress={() => {}}
              enabled={false}
              loading={false}
              light={true}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}