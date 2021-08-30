import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import {
  Container,
  IconContainer,
  InputText,
  ChangePasswordVisibilityButton
} from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name']
}

export function PasswordInput({ iconName, ...rest }: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const theme = useTheme();

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible(!isPasswordVisible)
    console.log(isPasswordVisible)
  }
  
  return (
    <Container>
      <IconContainer>
        <Feather 
          name={iconName}
          size={24}
          color={theme.colors.title}
        />
      </IconContainer>

      <InputText 
        secureTextEntry={isPasswordVisible}
        {...rest}
      />

      <ChangePasswordVisibilityButton onPress={handlePasswordVisibilityChange}>
        <Feather
          name={isPasswordVisible ? "eye" : "eye-off"}
          size={24}
          color={theme.colors.title}
        />
      </ChangePasswordVisibilityButton>
    </Container>
  );
}