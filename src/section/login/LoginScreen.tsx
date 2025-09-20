import React, { useCallback } from 'react';
import { LoginView } from './views/LoginView';
import { useLoginController } from './controllers/useLoginController';

export default function LoginScreen({ onAuthenticated }: { onAuthenticated?: () => void }) {
  const controller = useLoginController();

  const handleSubmit = useCallback(async () => {
    const ok = await controller.handleSubmit();
    if (ok && onAuthenticated) onAuthenticated();
  }, [controller, onAuthenticated]);

  return <LoginView {...controller} handleSubmit={handleSubmit} />;
}


