'use client';

import Link from 'next/link';
import { Truck, Lock, Mail } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SignInPage() {
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
            <span className="hidden text-xs text-muted-foreground sm:inline">¿Nuevo aquí?</span>
            <Link href="/auth/sign-up" className="hidden sm:inline">
              <Button variant="outline" size="sm">
                Crear cuenta
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
              Acceso seguro al panel de control
            </p>
            <h1 className="text-3xl font-bold leading-tight md:text-4xl">
              Inicia sesión y controla
              <span className="block bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">rutas, vehículos y combustible</span>
              en tiempo real.
            </h1>
            <p className="text-sm text-muted-foreground">
              Centraliza la gestión de conductores, viajes y abastecimientos de combustible en un solo sistema diseñado para transporte interprovincial.
            </p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>• Seguimiento de viajes en curso y completados.</li>
              <li>• Consumo de combustible por ruta y por vehículo.</li>
              <li>• Alertas automáticas de alto consumo.</li>
            </ul>
          </section>

          <section className="flex-1">
            <div className="mx-auto w-full max-w-md rounded-2xl border border-border bg-card/80 p-6 shadow-lg shadow-primary/10 backdrop-blur">
              <div className="mb-6 space-y-1 text-center">
                <h2 className="text-xl font-semibold">Iniciar sesión</h2>
                <p className="text-xs text-muted-foreground">Ingresa con tus credenciales para acceder al sistema.</p>
              </div>

              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  // Aquí va tu lógica real de sign-in
                }}
              >
                <div className="space-y-2">
                  <Label htmlFor="email">Correo o usuario</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="email" type="text" autoComplete="username" className="pl-9" placeholder="admin@libertadores.com" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="password" type="password" autoComplete="current-password" className="pl-9" placeholder="••••••••" required />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <input id="remember" type="checkbox" className="h-3.5 w-3.5 rounded border-border text-primary focus:ring-primary" />
                    <Label htmlFor="remember" className="text-xs font-normal text-muted-foreground">
                      Recordar sesión
                    </Label>
                  </div>
                  <Link href="/auth/forgot-password" className="text-xs text-primary underline-offset-2 hover:underline">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                <Button className="w-full" type="submit">
                  Entrar al panel
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
                ¿Aún no tienes cuenta?{' '}
                <Link href="/auth/sign-up" className="text-primary underline-offset-2 hover:underline">
                  Crear cuenta
                </Link>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
