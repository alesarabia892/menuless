import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createAppShellStyles } from '../styles/AppShell.styles';
import { createCommonStyles } from '../styles/Common.styles';
import { useTheme } from '../theme/ThemeContext';

export type SideMenuProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  side?: 'left' | 'right';
  onNavigateHome?: () => void;
  onNavigateChangeTheme?: () => void;
  onLogout?: () => void;
};

export function SideMenu({ isOpen, onRequestClose, side = 'right', onNavigateHome, onNavigateChangeTheme, onLogout }: SideMenuProps) {
  const screenWidth = Dimensions.get('window').width;
  const drawerWidth = Math.min(320, Math.floor(screenWidth * 0.84));
  const initialOffset = side === 'right' ? drawerWidth : -drawerWidth;
  const translateX = useRef(new Animated.Value(initialOffset)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const AnimatedPressable = (Animated as any).createAnimatedComponent(Pressable);
  const { theme } = useTheme();
  const styles = React.useMemo(() => createAppShellStyles(theme), [theme]);
  const common = React.useMemo(() => createCommonStyles(theme), [theme]);

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(translateX, { toValue: 0, duration: 220, useNativeDriver: true }),
        Animated.timing(overlayOpacity, { toValue: 0.25, duration: 220, useNativeDriver: true }),
      ]).start();
    } else {
      const closedOffset = side === 'right' ? drawerWidth : -drawerWidth;
      Animated.parallel([
        Animated.timing(translateX, { toValue: closedOffset, duration: 220, useNativeDriver: true }),
        Animated.timing(overlayOpacity, { toValue: 0, duration: 220, useNativeDriver: true }),
      ]).start();
    }
  }, [isOpen, drawerWidth, overlayOpacity, translateX, side]);

  return (
    <View pointerEvents={isOpen ? 'auto' : 'none'} style={styles.overlayContainer}>
      <AnimatedPressable style={[styles.overlay, { opacity: overlayOpacity }]} onPress={onRequestClose} />
      <Animated.View
        style={[
          styles.drawer,
          side === 'right' ? { right: 0 } : { left: 0 },
          { width: drawerWidth, transform: [{ translateX }] },
        ]}
      >
        <Text style={styles.drawerTitle}>Menu</Text>
        <Pressable
          style={[styles.menuItem, common.rowCenter]}
          onPress={() => { onNavigateHome && onNavigateHome(); onRequestClose(); }}
          accessibilityRole="button"
        >
          <Ionicons name="home-outline" size={20} color={theme.colors.textPrimary} />
          <Text style={styles.menuItemText}>Home</Text>
        </Pressable>
        <Pressable
          style={[styles.menuItem, common.rowCenter]}
          onPress={() => { onNavigateChangeTheme && onNavigateChangeTheme(); onRequestClose(); }}
          accessibilityRole="button"
        >
          <Ionicons name="color-palette-outline" size={20} color={theme.colors.textPrimary} />
          <Text style={styles.menuItemText}>Theme</Text>
        </Pressable>

        <View style={{ flex: 1 }} />

        <Pressable
          style={[styles.menuItem, common.rowCenter]}
          onPress={() => { onLogout && onLogout(); onRequestClose(); }}
          accessibilityRole="button"
        >
          <Ionicons name="log-out-outline" size={20} color={theme.colors.textPrimary} />
          <Text style={styles.menuItemText}>Logout</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

export default SideMenu;


