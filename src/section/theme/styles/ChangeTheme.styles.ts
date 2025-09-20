import { StyleSheet } from 'react-native';
import { spacing, typography } from '../../../ui/theme/tokens';
import { Theme } from '../../../ui/theme/ThemeContext';

export function createChangeThemeStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing.md,
      backgroundColor: theme.colors.background,
    },
    switchRow: {
      gap: spacing.sm as unknown as number,
      marginTop: spacing.lg,
      marginBottom: spacing.lg,
    },
    label: {
      fontSize: 16,
      color: theme.colors.textSecondary,
    },
    previewRow: {
      width: '90%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginBottom: spacing.md,
    },
    logo: {
      width: 120,
      height: 120,
    },
    banner: {
      width: '90%',
      height: 80,
    },
  });
}


