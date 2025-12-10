'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type UserProfile = {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: 'ADMIN' | 'DISPATCHER' | 'DRIVER' | string;
  avatarInitials: string;
};

type ProfileContextValue = {
  user: UserProfile | null;
  isLoading: boolean;
};

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

const MOCK_USER: UserProfile = {
  id: 'mock-1',
  username: 'ntesla',
  fullName: 'Nicola Tesla',
  email: 'admin@libertadores.com',
  role: 'ADMIN',
  avatarInitials: 'NT',
};

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUser(MOCK_USER);
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return <ProfileContext.Provider value={{ user, isLoading }}>{children}</ProfileContext.Provider>;
};

export const useProfile = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within a ProfileProvider');

  return ctx;
};
