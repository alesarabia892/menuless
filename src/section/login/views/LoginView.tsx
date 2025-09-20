import React from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { UseLoginControllerResult } from '../controllers/useLoginController';
import { useThemedStyles, useTheme } from '../../../ui/theme/ThemeContext';
import { createLoginStyles } from '../styles/Login.styles';

export function LoginView({ email, password, isSubmitting, error, setEmail, setPassword, handleSubmit }: UseLoginControllerResult) {
  const styles = useThemedStyles(createLoginStyles);
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Image
          source={theme.mode === 'dark'
            ? require('../../../../assets/logos/chatbot_dark.png')
            : require('../../../../assets/logos/chatbot_ligth.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      <Text style={styles.title}>Login</Text>

      <View style={styles.form}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Correo"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={theme.colors.textSecondary}
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Contraseña"
          secureTextEntry
          autoCapitalize="none"
          placeholderTextColor={theme.colors.textSecondary}
          style={styles.input}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity disabled={isSubmitting} style={styles.button} onPress={handleSubmit}>
          {isSubmitting ? (
            <ActivityIndicator color={theme.mode === 'dark' ? '#fff' : '#000'} />
          ) : (
            <Text style={theme.mode === 'dark' ? styles.buttonTextDark : styles.buttonTextLight}>Ingresar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}


