import { StyleSheet } from 'react-native';
import { Theme } from '../../../ui/theme/ThemeContext';
import { radii, spacing, typography } from '../../../ui/theme/tokens';

export function createLoginStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
      paddingHorizontal: spacing.lg,
    },
    title: {
      fontSize: typography.brandSize,
      fontWeight: typography.weightBold,
      color: theme.colors.textPrimary,
      marginBottom: spacing.sm,
    },
    logo: {
      width: 300,
      height: 300,
      marginBottom: spacing.xs,
    },
    form: {
      width: '100%',
      maxWidth: 420,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      color: theme.colors.textPrimary,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: radii.md,
      fontSize: typography.input,
      marginBottom: spacing.sm,
    },
    button: {
      backgroundColor: theme.colors.textPrimary,
      borderRadius: radii.md,
      paddingVertical: spacing.sm,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: spacing.md,
    },
    buttonText: {
      color: '#ffffff',
      fontWeight: typography.weightBold,
      fontSize: 16,
    },
    buttonTextDark: {
      color: '#000000',
      fontWeight: typography.weightBold,
      fontSize: 16,
    },
    buttonTextLight: {
      color: '#ffffff',
      fontWeight: typography.weightBold,
      fontSize: 16,
    },
    error: {
      color: 'tomato',
      marginTop: spacing.xs,
    },
  });
}


