'use client';

import { Bell, LogOut, Settings2, User as UserIcon } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { useProfile } from '@/components/profile/profile-context';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

export const AppTopbar = () => {
  const { user, isLoading } = useProfile();

  const handleLogout = () => {
    console.log('Cerrar sesión (mock)');
  };

  const handleOpenProfile = () => {
    console.log('Ver perfil de usuario (mock)');
  };

  const handleOpenSettings = () => {
    console.log('Abrir configuración (mock)');
  };

  const initials = user?.avatarInitials ?? 'US';
  const fullName = isLoading ? 'Cargando...' : (user?.fullName ?? 'Usuario');
  const role = user?.role ?? '';
  const email = user?.email ?? 'usuario@example.com';

  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur lg:px-8">
      <div className="flex flex-1 items-center gap-3">
        <h1 className="text-base font-semibold leading-none md:text-lg">Panel de control</h1>
        <span className="hidden text-xs text-muted-foreground sm:inline">Gestión de transporte y combustible</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative rounded-full p-1.5 text-muted-foreground hover:bg-muted">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-destructive" />
        </button>

        <ThemeToggle />

        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2  px-1 py-1 text-left hover:cursor-pointer focus:outline-none">
              <div className="hidden text-right text-xs sm:flex sm:flex-col">
                <span className="font-medium hover:font-bold">{fullName}</span>
                <span className="text-[11px] text-muted-foreground hover:font-semibold">{role}</span>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{initials}</div>
            </button>
          </PopoverTrigger>

          <PopoverContent align="end" className="w-64 border-border bg-popover p-3 text-foreground">
            <div className="flex items-center gap-3 pb-3 border-b border-border">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">{initials}</div>
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-semibold">{fullName}</span>
                <span className="text-[11px] uppercase tracking-wide text-muted-foreground">{role || 'ROLE'}</span>
                <span className="truncate text-[11px] text-muted-foreground">{email}</span>
              </div>
            </div>

            <div className="mt-3 space-y-1.5 text-xs">
              <Button variant="ghost" size="sm" className="flex w-full items-center justify-start gap-2 px-2 text-xs" onClick={handleOpenProfile}>
                <UserIcon className="h-4 w-4" />
                Ver perfil
              </Button>

              <Button variant="ghost" size="sm" className="flex w-full items-center justify-start gap-2 px-2 text-xs" onClick={handleOpenSettings}>
                <Settings2 className="h-4 w-4" />
                Configuración
              </Button>

              <div className="my-1 h-px bg-border" />

              <Button variant="ghost" size="sm" className="flex w-full items-center justify-start gap-2 px-2 text-xs text-destructive hover:text-destructive" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Cerrar sesión
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};
