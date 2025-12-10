'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Truck, ClipboardList, User, Map, Navigation, Droplet, FileText, Settings } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useProfile } from '@/components/profile/profile-context';
import { cn } from '@/lib/utils';

export const AppSidebar = () => {
  const pathname = usePathname();
  const { user } = useProfile();

  const menuItems = [
    { href: '/main', label: 'Dashboard', icon: ClipboardList },
    { href: '/main/vehicles', label: 'Vehículos', icon: Truck },
    { href: '/main/drivers', label: 'Conductores', icon: User },
    { href: '/main/routes', label: 'Rutas', icon: Map },
    { href: '/main/trips', label: 'Viajes', icon: Navigation },
    { href: '/main/fuel', label: 'Abastecimiento', icon: Droplet },
    { href: '/main/reports', label: 'Reportes', icon: FileText },
    { href: '/main/settings', label: 'Configuración', icon: Settings },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Truck className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-none">Libertadores</span>
            <span className="text-[11px] text-muted-foreground">Transporte & Fuel</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Gestión</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;

                const isActive = item.href === '/main' ? pathname === item.href : pathname === item.href || pathname.startsWith(item.href + '/');

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                      className={cn(
                        'flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors',
                        !isActive && 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                        isActive && 'bg-primary! text-primary-foreground! hover:bg-primary! hover:text-primary-foreground!',
                      )}
                    >
                      <Link href={item.href}>
                        <Icon className={cn('h-4 w-4', isActive ? 'text-primary-foreground!' : 'text-muted-foreground')} />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center gap-2 px-2 py-2 text-xs">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted font-semibold">{user?.avatarInitials ?? 'US'}</div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-medium">{user?.fullName ?? 'Usuario'}</span>
            <span className="truncate text-[11px] text-muted-foreground">{user?.role ?? 'ROLE'}</span>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};
