'use client';

import Link from 'next/link';
import { Truck, UserPlus, Mail, Lock, IdCard } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="w-full border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Truck className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-wide">Los Libertadores</span>
              <span className="text-[11px] text-muted-foreground">Transporte & Combustible</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-muted-foreground sm:inline">¿Ya tienes cuenta?</span>
            <Link href="/auth/sign-in" className="hidden sm:inline">
              <Button variant="outline" size="sm">
                Iniciar sesión
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 md:flex-row md:items-center">
          {/* Left info */}
          <section className="hidden flex-1 flex-col gap-4 md:flex">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Registro de administradores y personal autorizado
            </p>
            <h1 className="text-3xl font-bold leading-tight md:text-4xl">
              Crea tu cuenta para <span className="bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">gestionar flota y combustible</span> de forma centralizada.
            </h1>
            <p className="text-sm text-muted-foreground">Configura usuarios con roles específicos (administrador, logística, conductor) y controla los permisos de acceso al sistema.</p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>• Roles y permisos adaptados a tu operación.</li>
              <li>• Integración futura con autenticación de Google.</li>
              <li>• Pensado para equipos de transporte interprovincial.</li>
            </ul>
          </section>

          <section className="flex-1">
            <div className="mx-auto w-full max-w-md rounded-2xl border border-border bg-card/80 p-6 shadow-lg shadow-primary/10 backdrop-blur">
              <div className="mb-6 space-y-1 text-center">
                <h2 className="text-xl font-semibold">Crear cuenta</h2>
                <p className="text-xs text-muted-foreground">Registra un nuevo usuario para el sistema de gestión.</p>
              </div>

              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  // Aquí va tu lógica real de sign-up
                }}
              >
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre</Label>
                    <Input id="firstName" type="text" placeholder="Juan" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido</Label>
                    <Input id="lastName" type="text" placeholder="Pérez" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="document">Documento</Label>
                    <div className="relative">
                      <IdCard className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input id="document" type="text" className="pl-9" placeholder="DNI / ID" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Rol</Label>
                    <select
                      id="role"
                      className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      defaultValue="ADMIN"
                    >
                      <option value="ADMIN">Administrador</option>
                      <option value="DISPATCH">Logística</option>
                      <option value="DRIVER">Conductor</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="email" type="email" autoComplete="email" className="pl-9" placeholder="usuario@empresa.com" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input id="password" type="password" autoComplete="new-password" className="pl-9" placeholder="••••••••" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                    <Input id="confirmPassword" type="password" autoComplete="new-password" placeholder="Repite la contraseña" required />
                  </div>
                </div>

                <Button className="w-full" type="submit">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Crear cuenta
                </Button>

                <div className="flex items-center gap-2 pt-2 text-[11px] text-muted-foreground">
                  <span className="h-px flex-1 bg-border" />
                  <span>o continúa con</span>
                  <span className="h-px flex-1 bg-border" />
                </div>

                <Button type="button" variant="outline" className="w-full text-xs">
                  Continuar con Google
                </Button>
              </form>

              <p className="mt-6 text-center text-xs text-muted-foreground">
                ¿Ya tienes una cuenta?{' '}
                <Link href="/auth/sign-in" className="text-primary underline-offset-2 hover:underline">
                  Iniciar sesión
                </Link>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
