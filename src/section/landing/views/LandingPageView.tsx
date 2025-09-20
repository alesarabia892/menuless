import React from 'react';
import { View, Text, Image } from 'react-native';
import { SearchBar } from '../widgets/SearchBar';
import { createLandingStyles } from '../styles/Landing.styles';
import { createCommonStyles } from '../../../ui/styles/Common.styles';
import { useTheme } from '../../../ui/theme/ThemeContext';

export type LandingPageViewProps = {
  query: string;
  onChangeQuery: (value: string) => void;
  onSubmit: () => void;
};

export default function LandingPageView({ query, onChangeQuery, onSubmit }: LandingPageViewProps) {
  const { theme } = useTheme();
  const styles = React.useMemo(() => createLandingStyles(theme), [theme]);
  const common = React.useMemo(() => createCommonStyles(theme), [theme]);
  return (
    <View style={styles.container}>
      <View style={common.centerArea}>
        <Image
          source={theme.mode === 'dark'
            ? require('../../../../assets/logos/chatbot_dark.png')
            : require('../../../../assets/logos/chatbot_ligth.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={common.title}>Ponte Pilas!!!</Text>
        <View style={styles.spacerSmall} />
        <SearchBar
          value={query}
          onChangeText={onChangeQuery}
          placeholder="Buscar servicios..."
          onSubmitEditing={onSubmit}
        />
      </View>
      <View style={styles.footer}>
        <View style={common.rowCenter}>
          <Text style={styles.footerText}>
            Creado por OrchIdeaLinks  © {new Date().getFullYear()} Todos los derechos reservados
          </Text>
        </View>
      </View>
    </View>
  );
}


