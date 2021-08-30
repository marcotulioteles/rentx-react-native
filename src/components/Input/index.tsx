import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import {
  Container,
  IconContainer,
  InputText
} from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export function Input({ iconName, value, ...rest }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  
  const theme = useTheme();
  
  function handleInputFocus() {
    setIsFocused(true);
  };

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
    
    if (isFilled) {
      console.log('preencheu')
    }
  };

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather 
          name={iconName}
          size={24}
          color={(isFocused || isFilled) ? theme.colors.main : theme.colors.title}
          isFocused={isFocused}
        />
      </IconContainer>

      <InputText 
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        {...rest}
      />
    </Container>
  );
}