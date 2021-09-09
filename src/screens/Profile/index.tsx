import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as yup from 'yup';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { useAuth } from '../../hooks/auth';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';

import { NavigationProps } from '../../@types/navigate-from-react-navigate';
import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from './styles';
import { PasswordInput } from '../../components/PasswordInput';
import { Button } from '../../components/Button';

export function Profile() {
  const { user, signOut, updatedUser } = useAuth();

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);
  
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>()

  function handleBack() {
    navigation.goBack();
  }

  function hendleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
    setOption(optionSelected);
  }

  async function handleAvatarSelect() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    if (result.uri) {
      setAvatar(result.uri);
    }
  }

  async function handleProfileUpdate() {
    try {
      const schema = yup.object().shape({
        driverLicense: yup.string().required('CNH é obrigatória'),
        name: yup.string().required('Nome é obrigatório')
      })

      const data = { name, driverLicense }
      await schema.validate(data);

      await updatedUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        name,
        driver_license: driverLicense,
        avatar,
        token: user.token
      });

      Alert.alert('Perfil atualizado!')

    } catch (error) {
      if (error instanceof yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } else {
        Alert.alert('Não foi possível atualizar o perfil!');
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton
                color={theme.colors.shape}
                onPress={handleBack}
              />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={signOut}>
                <Feather
                  name="power"
                  size={24}
                  color={theme.colors.shape}
                />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              { !!avatar && <Photo source={{ uri: avatar }} /> }
              <PhotoButton onPress={handleAvatarSelect}>
                <Feather
                  name="camera"
                  size={24}
                  color={theme.colors.shape}
                />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option
                active={option === 'dataEdit'}
                onPress={() => hendleOptionChange('dataEdit')}
              >
                <OptionTitle
                  active={option === 'dataEdit'}
                >
                  Dados
                </OptionTitle>
              </Option>
              <Option
                active={option === 'passwordEdit'}
                onPress={() => hendleOptionChange('passwordEdit')}
              >
                <OptionTitle
                  active={option === 'passwordEdit'}
                >
                  Trocar Senha
                </OptionTitle>
              </Option>
            </Options>

            {option === 'dataEdit' ?
              <Section>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCorrect={false}
                  defaultValue={user.name}
                  onChangeText={setName}
                />
                <Input
                  iconName="mail"
                  editable={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                  onChangeText={setDriverLicense}
                />
              </Section> :
              <Section>
                <PasswordInput
                  iconName="lock"
                  placeholder="Senha atual"
                />
                <PasswordInput
                  iconName="lock"
                  placeholder="Nova senha"
                />
                <PasswordInput
                  iconName="lock"
                  placeholder="Repetir senha"
                />
              </Section>}

              <Button 
                title="Salvar alterações"
                onPress={handleProfileUpdate}
              />

          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}