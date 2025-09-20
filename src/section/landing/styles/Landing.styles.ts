import { StyleSheet } from 'react-native';
import { spacing, radii, typography } from '../../../ui/theme/tokens';
import { Theme } from '../../../ui/theme/ThemeContext';

export function createLandingStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width: 140,
      height: 140,
      marginBottom: spacing.xs,
    },
    spacerSmall: {
      height: spacing.md,
    },
    footer: {
      position: 'absolute',
      bottom: spacing.xs,
      left: 0,
      right: 0,
      alignItems: 'center',
    },
    footerRow: {
      // moved to common.rowCenter; left empty for backward compatibility if accidentally referenced
    },
    footerText: {
      fontSize: typography.bodySm,
      color: theme.colors.textSecondary,
    },
  });
}

export function createLandingSearchBarStyles(theme: Theme) {
  return StyleSheet.create({
    wrapper: {
      width: '88%',
      maxWidth: 720,
      borderRadius: radii.pill,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.background,
      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.06,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    input: {
      height: 52,
      paddingHorizontal: spacing.sm,
      fontSize: typography.input,
      color: theme.colors.textPrimary,
    },
  });
}


