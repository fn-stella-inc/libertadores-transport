'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Shield, Users, User, Lock } from 'lucide-react';

type Role = 'ADMIN' | 'DISPATCHER' | 'DRIVER';

type UserRow = {
  id: number;
  fullName: string;
  email: string;
  username: string;
  role: Role;
  isActive: boolean;
};

const MOCK_USERS: UserRow[] = [
  {
    id: 1,
    fullName: 'Carlos Rodríguez',
    email: 'carlos.admin@libertadores.com',
    username: 'admin',
    role: 'ADMIN',
    isActive: true,
  },
  {
    id: 2,
    fullName: 'Juan Pérez',
    email: 'juan.perez@libertadores.com',
    username: 'jperez',
    role: 'DRIVER',
    isActive: true,
  },
  {
    id: 3,
    fullName: 'María Gómez',
    email: 'maria.gomez@libertadores.com',
    username: 'mgomez',
    role: 'DISPATCHER',
    isActive: false,
  },
];

const SettingsPage = () => {
  const [users, setUsers] = useState<UserRow[]>(MOCK_USERS);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(1);

  // Datos ficticios del usuario logueado (admin actual)
  const [profile, setProfile] = useState({
    fullName: 'Carlos Rodríguez',
    email: 'carlos.admin@libertadores.com',
    phone: '+51 999 111 222',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleRoleChange = (id: number, newRole: Role) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
  };

  const handleActiveToggle = (id: number, value: boolean) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, isActive: value } : u)));
  };

  const selectedUser = users.find((u) => u.id === selectedUserId) ?? users[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Configuración</h1>
          <p className="text-xs text-muted-foreground">Administración de usuarios y ajustes de cuenta.</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-[11px] text-muted-foreground">
          <Shield className="h-3 w-3 text-primary" />
          <span>Vista de administrador</span>
        </div>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Usuarios</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Mi perfil</span>
          </TabsTrigger>
          <TabsTrigger value="password" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span>Contraseña</span>
          </TabsTrigger>
        </TabsList>

        {/* TAB: Usuarios */}
        <TabsContent value="users" className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold">Administrar usuarios</h2>
                <p className="text-xs text-muted-foreground">Cambia roles, activa/desactiva cuentas y selecciona un usuario para ver sus detalles.</p>
              </div>
              <Button size="sm" variant="outline">
                Crear usuario (mock)
              </Button>
            </div>

            {/* Layout: lista + detalle */}
            <div className="grid gap-4 md:grid-cols-[2fr,minmax(260px,1fr)]">
              {/* Tabla / listado */}
              <div className="w-full overflow-x-auto rounded-lg border border-border bg-background text-xs md:text-sm">
                <table className="min-w-full">
                  <thead className="bg-muted/60 text-[11px] uppercase text-muted-foreground">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium">Usuario</th>
                      <th className="px-3 py-2 text-left font-medium">Rol</th>
                      <th className="px-3 py-2 text-left font-medium">Estado</th>
                      <th className="px-3 py-2 text-left font-medium">Activo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} className={`border-t border-border/60 cursor-pointer hover:bg-muted/40 ${selectedUserId === u.id ? 'bg-muted/50' : ''}`} onClick={() => setSelectedUserId(u.id)}>
                        <td className="px-3 py-2">
                          <div className="flex flex-col">
                            <span className="font-medium">{u.fullName}</span>
                            <span className="text-[11px] text-muted-foreground">{u.email}</span>
                            <span className="text-[11px] text-muted-foreground">@{u.username}</span>
                          </div>
                        </td>
                        <td className="px-3 py-2 align-middle">
                          <Select value={u.role} onValueChange={(val: any) => handleRoleChange(u.id, val as Role)}>
                            <SelectTrigger className="h-8 w-[120px] text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ADMIN">ADMIN</SelectItem>
                              <SelectItem value="DISPATCHER">DISPATCHER</SelectItem>
                              <SelectItem value="DRIVER">DRIVER</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-3 py-2 align-middle">
                          <span className="text-[11px] text-muted-foreground">{u.role === 'ADMIN' ? 'Administrador' : u.role === 'DISPATCHER' ? 'Logística / Despacho' : 'Conductor'}</span>
                        </td>
                        <td className="px-3 py-2 align-middle">
                          <div className="flex items-center gap-2">
                            <Switch checked={u.isActive} onCheckedChange={(val: any) => handleActiveToggle(u.id, val)} />
                            <span className="text-[11px] text-muted-foreground">{u.isActive ? 'Activo' : 'Inactivo'}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Panel lateral de detalle */}
              <div className="rounded-lg border border-border bg-background p-4 text-xs">
                <p className="mb-3 text-[11px] font-semibold uppercase text-muted-foreground">Detalle del usuario</p>
                {selectedUser ? (
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold">{selectedUser.fullName}</p>
                      <p className="text-[11px] text-muted-foreground">{selectedUser.email}</p>
                      <p className="text-[11px] text-muted-foreground">@{selectedUser.username}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium text-foreground">Rol</p>
                      <p className="text-[11px] text-muted-foreground">{selectedUser.role}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium text-foreground">Estado</p>
                      <p className="text-[11px] text-muted-foreground">{selectedUser.isActive ? 'Activo' : 'Inactivo'}</p>
                    </div>
                    <div className="pt-3">
                      <Button size="sm" variant="outline" className="w-full">
                        Resetear contraseña (mock)
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-[11px] text-muted-foreground">Selecciona un usuario de la lista para ver sus detalles.</p>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* TAB: Mi perfil */}
        <TabsContent value="profile" className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-4">
              <h2 className="text-sm font-semibold">Mi perfil</h2>
              <p className="text-xs text-muted-foreground">Actualiza tus datos personales visibles en el sistema.</p>
            </div>

            <form className="grid gap-4 md:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1">
                <Label htmlFor="fullName">Nombre completo</Label>
                <Input id="fullName" value={profile.fullName} onChange={(e) => setProfile((p) => ({ ...p, fullName: e.target.value }))} className="h-9 text-sm" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" type="email" value={profile.email} onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))} className="h-9 text-sm" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" value={profile.phone} onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))} className="h-9 text-sm" />
              </div>
              <div className="space-y-1">
                <Label>Rol (solo lectura)</Label>
                <Input value="ADMIN" disabled className="h-9 text-sm" />
              </div>

              <div className="md:col-span-2 flex justify-end">
                <Button size="sm" type="submit">
                  Guardar cambios (mock)
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>

        {/* TAB: Contraseña */}
        <TabsContent value="password" className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-4">
              <h2 className="text-sm font-semibold">Cambiar contraseña</h2>
              <p className="text-xs text-muted-foreground">Actualiza la contraseña de tu cuenta de administrador.</p>
            </div>

            <form className="grid gap-4 md:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1 md:col-span-2">
                <Label htmlFor="currentPassword">Contraseña actual</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm((p) => ({
                      ...p,
                      currentPassword: e.target.value,
                    }))
                  }
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="newPassword">Nueva contraseña</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm((p) => ({
                      ...p,
                      newPassword: e.target.value,
                    }))
                  }
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm((p) => ({
                      ...p,
                      confirmPassword: e.target.value,
                    }))
                  }
                  className="h-9 text-sm"
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-2">
                <Button size="sm" variant="outline" type="button">
                  Cancelar
                </Button>
                <Button size="sm" type="submit">
                  Guardar nueva contraseña (mock)
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
