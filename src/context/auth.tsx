import { Spinner, Center } from '@chakra-ui/react';
import React, { useState } from 'react';
import api from '../services/api';
import { JWTTokenService } from '../services/token';
import { User } from '../types/User';

type AuthContextType = {
  user?: User;
  login: (form: any) => Promise<void>;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextType>({
  login: () => Promise.resolve(),
  logout: () => {},
});

function AuthProvider({ children }: { children: React.ReactChild }) {
  const [user, setUser] = useState<User | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const result = await api.auth.me();
      if (result?.user) {
        setUser(result.user);
      }
    } catch (err) {}
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

  const login = React.useCallback(async (form) => {
    const result = await api.auth.login(form);
    if (result.user && result.token && !result.error) {
      JWTTokenService.set(result.token);
      setUser(result.user);
    } else if (result.error) {
      throw new Error(result.error);
    }
  }, []);

  const logout = React.useCallback(() => {
    JWTTokenService.delete();
    setUser(undefined);
  }, []);

  if (isLoading) {
    return (
      <Center minH="100vh">
        <Spinner />
      </Center>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }} children={children} />
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
