'use client';

import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ProfileProvider } from '@/components/profile/profile-context';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppTopbar } from '@/components/layout/app-topbar';

type SecureLayoutProps = {
  children: React.ReactNode;
};

const SecureLayout = ({ children }: SecureLayoutProps) => {
  return (
    <SidebarProvider>
      <ProfileProvider>
        <div className="flex min-h-screen bg-background text-foreground w-full">
          <AppSidebar />

          <div className="flex min-h-screen flex-1 flex-col">
            <AppTopbar />
            <main className="flex-1 overflow-y-auto px-4 py-4 lg:px-8 lg:py-6">{children}</main>
          </div>
        </div>
      </ProfileProvider>
    </SidebarProvider>
  );
};

export default SecureLayout;
