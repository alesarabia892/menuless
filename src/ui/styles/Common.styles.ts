import { StyleSheet } from 'react-native';
import { spacing, typography } from '../theme/tokens';
import { Theme } from '../theme/ThemeContext';

export function createCommonStyles(theme: Theme) {
  return StyleSheet.create({
    centerArea: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: -spacing.lg,
    },
    rowCenter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
        fontSize: typography.brandSize,
        fontWeight: typography.weightBold,
        letterSpacing: 0.2,
        color: theme.colors.textPrimary,
    },
  });
}