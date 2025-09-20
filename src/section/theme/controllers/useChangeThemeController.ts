import React from 'react';
import { useTheme } from '../../../ui/theme/ThemeContext';

export function useChangeThemeController() {
  const { theme, setMode } = useTheme();
  const isDark = theme.mode === 'dark';

  const toggle = React.useCallback(() => {
    setMode(isDark ? 'light' : 'dark');
  }, [isDark, setMode]);

  return { isDark, toggle } as const;
}


