import { useCallback, useMemo, useState } from 'react';
import { Keyboard } from 'react-native';
import { makeAuthRepository } from '../../../application/di/container';

export type UseLoginControllerResult = {
  email: string;
  password: string;
  isSubmitting: boolean;
  error: string | null;
  isLoggedIn: boolean;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  handleSubmit: () => Promise<boolean>;
  logout: () => Promise<void>;
};

export function useLoginController(): UseLoginControllerResult {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const authRepository = useMemo(() => makeAuthRepository(), []);

  const handleSubmit = useCallback(async (): Promise<boolean> => {
    Keyboard.dismiss();
    setError(null);
    setIsSubmitting(true);
    try {
      const token = await authRepository.login(email, password);
      if (token) {
        setIsLoggedIn(true);
        return true;
      } else {
        setError('Credenciales inválidas');
        return false;
      }
    } catch (e) {
      setError('Ocurrió un error. Intenta nuevamente.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [authRepository, email, password]);

  const logout = useCallback(async () => {
    await authRepository.logout();
    setIsLoggedIn(false);
  }, [authRepository]);

  return { email, password, isSubmitting, error, isLoggedIn, setEmail, setPassword, handleSubmit, logout };
}


