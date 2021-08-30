import React from 'react';
import { StatusBar } from 'react-native';
import { Button } from '../../components/Button';

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

export function SignIn() {
  const theme = useTheme();

  return (
    <Container>
      <StatusBar 
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <Title>Estamos{'\n'} quase lá.</Title>
        <SubTitle>
          Faça seu login para começar{'\n'}
          uma experiência incrível.
        </SubTitle>
      </Header>
      <Form>
        <Input 
          iconName="mail"
          placeholder="e-mail"
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
        />

        <PasswordInput 
          iconName="lock"
          placeholder="senha"
        />
      </Form>

      <Footer>
        <Button 
          title="Login"
          onPress={() => {}}
          enabled={false}
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
  );
}