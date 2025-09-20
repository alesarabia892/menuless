import { StyleSheet } from 'react-native';
import { spacing, radii, typography } from '../theme/tokens';
import { Theme } from '../theme/ThemeContext';

export function createAppShellStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      position: 'absolute',
      top: spacing.lg,
      zIndex: 20,
    },
    content: {
      flex: 1,
      paddingTop: spacing.xl,
    },
    hamburger: {
      width: 44,
      height: 44,
      borderRadius: radii.md,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
    },
    hamburgerLine: {
      width: 20,
      height: 2,
      backgroundColor: theme.colors.textPrimary,
      marginVertical: 2,
      borderRadius: 1,
    },
    overlayContainer: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 30,
      elevation: 10,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: '#000',
      elevation: 11,
      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.15,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
    },
    drawer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      backgroundColor: theme.colors.background,
      borderLeftWidth: 1,
      borderLeftColor: theme.colors.border,
      paddingTop: spacing.lg,
      paddingHorizontal: spacing.md,
      elevation: 12,
      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.12,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
    },
    drawerTitle: {
      fontSize: 18,
      fontWeight: typography.weightBold,
      color: theme.colors.textPrimary,
      marginBottom: spacing.sm,
    },
    menuItem: {
      paddingVertical: spacing.sm,
    },
    menuItemText: {
      fontSize: 16,
      color: theme.colors.textPrimary,
      marginLeft: spacing.sm,
    },
    menuSectionTitle: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      marginTop: spacing.md,
      marginBottom: spacing.xs,
    },
  });
}


