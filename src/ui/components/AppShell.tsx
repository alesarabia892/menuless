import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { HamburgerButton } from './HamburgerButton';
import { SideMenu } from './SideMenu';
import { createAppShellStyles } from '../styles/AppShell.styles';
import { spacing } from '../theme/tokens';
import { useTheme } from '../theme/ThemeContext';

export type AppShellProps = {
  children: React.ReactNode;
  menuSide?: 'left' | 'right';
  onNavigateHome?: () => void;
  onNavigateChangeTheme?: () => void;
  onLogout?: () => void;
};

export function AppShell({ children, menuSide = 'left', onNavigateHome, onNavigateChangeTheme, onLogout }: AppShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme();
  const styles = React.useMemo(() => createAppShellStyles(theme), [theme]);

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          menuSide === 'right' ? { right: spacing.xs } : { left: spacing.xs },
        ]}
      >
        <HamburgerButton onPress={openMenu} />
      </View>

      <View style={styles.content}>{children}</View>

      <SideMenu
        isOpen={menuOpen}
        onRequestClose={closeMenu}
        side={menuSide}
        onNavigateHome={onNavigateHome}
        onNavigateChangeTheme={onNavigateChangeTheme}
        onLogout={onLogout}
      />
    </View>
  );
}

export default AppShell;


