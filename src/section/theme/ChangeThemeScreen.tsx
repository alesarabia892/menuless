import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../ui/theme/ThemeContext';
import ChangeThemeView from './views/ChangeThemeView';
import { useChangeThemeController } from './controllers/useChangeThemeController';
import { createChangeThemeStyles } from './styles/ChangeTheme.styles';

export default function ChangeThemeScreen() {
  const { theme } = useTheme();
  const styles = React.useMemo(() => createChangeThemeStyles(theme), [theme]);
  const { isDark, toggle } = useChangeThemeController();

  return (
    <View style={styles.container}>
      <ChangeThemeView isDark={isDark} onToggle={toggle} />
    </View>
  );
}


