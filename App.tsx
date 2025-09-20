import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import LandingPageScreen from './src/section/landing/LandingPageScreen';
import LoginScreen from './src/section/login/LoginScreen';
import ChangeThemeScreen from './src/section/theme/ChangeThemeScreen';
import AppShell from './src/ui/components/AppShell';
import { ThemeProvider, useTheme } from './src/ui/theme/ThemeContext';
import { makeAuthRepository } from './src/application/di/container';

export default function App() {
  return (
    <ThemeProvider>
      <AppWithTheme />
    </ThemeProvider>
  );
}

function AppWithTheme() {
  const { theme } = useTheme();
  const [screen, setScreen] = useState<'login' | 'landing' | 'changeTheme'>('login');
  const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const auth = makeAuthRepository();
        const token = await auth.getToken();
        if (token) {
          try {
            await auth.me();
            if (!cancelled) setScreen('landing');
          } catch {
            if (!cancelled) setScreen('login');
          }
        } else {
          if (!cancelled) setScreen('login');
        }
      } finally {
        if (!cancelled) setBootstrapped(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Guard: cada vez que se navega a pantallas protegidas, validar token en backend
  React.useEffect(() => {
    let cancelled = false;
    if (bootstrapped && screen !== 'login') {
      (async () => {
        try {
          await makeAuthRepository().me();
        } catch {
          if (!cancelled) setScreen('login');
        }
      })();
    }
    return () => { cancelled = true; };
  }, [bootstrapped, screen]);

  if (!bootstrapped) return null;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }] }>
      {screen === 'login' ? (
        <>
          <LoginScreen onAuthenticated={() => setScreen('landing')} />
          <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} />
        </>
      ) : (
        <>
          <AppShell
            menuSide="left"
            onNavigateHome={() => setScreen('landing')}
            onNavigateChangeTheme={() => setScreen('changeTheme')}
            onLogout={async () => {
              try { await makeAuthRepository().logout(); } catch {}
              setScreen('login');
            }}
          >
            {screen === 'landing' ? (
              <LandingPageScreen />
            ) : (
              <ChangeThemeScreen />
            )}
          </AppShell>
          <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});


