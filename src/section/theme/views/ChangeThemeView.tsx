import React from 'react';
import { View, Text, Switch, Image } from 'react-native';
import { useTheme } from '../../../ui/theme/ThemeContext';
import { createChangeThemeStyles } from '../styles/ChangeTheme.styles';
import { createCommonStyles } from '../../../ui/styles/Common.styles';

export type ChangeThemeViewProps = {
  isDark: boolean;
  onToggle: () => void;
};

export default function ChangeThemeView({ isDark, onToggle }: ChangeThemeViewProps) {
  const { theme } = useTheme();
  const styles = React.useMemo(() => createChangeThemeStyles(theme), [theme]);
  const common = React.useMemo(() => createCommonStyles(theme), [theme]);

  return (
    <View style={common.centerArea}>
      <Text style={common.title}>Theme</Text>
      <View style={[common.rowCenter, styles.switchRow]}>
        <Text style={styles.label}>Light</Text>
        <Switch value={isDark} onValueChange={onToggle} />
        <Text style={styles.label}>Dark</Text>
      </View>
    </View>
  );
}


