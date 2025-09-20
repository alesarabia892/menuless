import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

export type ThemeMode = 'light' | 'dark';

export type ThemeColors = {
  background: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  shadow: string;
};

export type Theme = {
  mode: ThemeMode;
  colors: ThemeColors;
};

const lightColors: ThemeColors = {
  background: '#ffffff',
  textPrimary: '#202124',
  textSecondary: '#5f6368',
  border: '#dadce0',
  shadow: '#000000',
};

const darkColors: ThemeColors = {
  background: '#000000',
  textPrimary: '#ffffff',
  textSecondary: '#e0e0e0',
  border: '#2a2a2a',
  shadow: '#000000',
};

type ThemeContextValue = {
  theme: Theme;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme: ColorSchemeName = Appearance.getColorScheme();
  const initialMode: ThemeMode = systemScheme === 'dark' ? 'dark' : 'light';
  const [mode, setModeState] = useState<ThemeMode>(initialMode);

  const setMode = useCallback((m: ThemeMode) => setModeState(m), []);
  const toggleMode = useCallback(() => setModeState(prev => (prev === 'dark' ? 'light' : 'dark')), []);

  const theme = useMemo<Theme>(() => ({
    mode,
    colors: mode === 'dark' ? darkColors : lightColors,
  }), [mode]);

  const value = useMemo<ThemeContextValue>(() => ({ theme, setMode, toggleMode }), [theme, setMode, toggleMode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

// Hook to build styles from the active theme and memoize them
export function useThemedStyles<T>(builder: (theme: Theme) => T): T {
  const { theme } = useTheme();
  return useMemo(() => builder(theme), [builder, theme]);
}


