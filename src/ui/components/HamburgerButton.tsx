import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { createAppShellStyles } from '../styles/AppShell.styles';
import { useTheme } from '../theme/ThemeContext';

export type HamburgerButtonProps = {
  onPress: () => void;
};

export function HamburgerButton({ onPress }: HamburgerButtonProps) {
  const { theme } = useTheme();
  const styles = React.useMemo(() => createAppShellStyles(theme), [theme]);
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel="Open menu"
      onPress={onPress}
      style={styles.hamburger}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <View style={styles.hamburgerLine} />
      <View style={styles.hamburgerLine} />
      <View style={styles.hamburgerLine} />
    </TouchableOpacity>
  );
}

export default HamburgerButton;


