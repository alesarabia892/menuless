import React from 'react';
import LandingPageView from './views/LandingPageView';
import { useLandingPageController } from './controllers/useLandingPageController';

export default function LandingPageScreen() {
  const { query, setQuery, handleSubmit } = useLandingPageController();

  return (
    <LandingPageView
      query={query}
      onChangeQuery={setQuery}
      onSubmit={handleSubmit}
    />
  );
}


