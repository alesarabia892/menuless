import React from 'react';
import { View, TextInput, TextInputSubmitEditingEventData, NativeSyntheticEvent } from 'react-native';
import { createLandingSearchBarStyles } from '../styles/Landing.styles';
import { useTheme } from '../../../ui/theme/ThemeContext';

export type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void | (() => void);
};

export function SearchBar({ value, onChangeText, placeholder, onSubmitEditing }: SearchBarProps) {
  const { theme } = useTheme();
  const styles = React.useMemo(() => createLandingSearchBarStyles(theme), [theme]);
  return (
    <View style={styles.wrapper}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9aa0a6"
        returnKeyType="search"
        onSubmitEditing={onSubmitEditing as any}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
    </View>
  );
}


