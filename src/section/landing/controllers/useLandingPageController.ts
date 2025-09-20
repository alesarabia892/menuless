import { useCallback, useState } from 'react';
import { Keyboard } from 'react-native';

export type UseLandingPageControllerResult = {
  query: string;
  setQuery: (value: string) => void;
  handleSubmit: () => void;
};

export function useLandingPageController(): UseLandingPageControllerResult {
  const [query, setQuery] = useState<string>('');

  const handleSubmit = useCallback(() => {
    Keyboard.dismiss();
    // TODO: wire navigation or search action here
  }, []);

  return { query, setQuery, handleSubmit };
}


