'use client';

import Link from 'next/link';
import { Truck, Gauge, Map, Droplet, LineChart, ShieldCheck } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col">
      <header className="w-full border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-tr from-primary to-primary/70 text-primary-foreground">
              <Truck className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-wide">Los Libertadores</span>
              <span className="text-xs text-muted-foreground">Transportation & Fuel Control</span>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-primary transition-colors">
              Características
            </a>
            <a href="#metrics" className="hover:text-primary transition-colors">
              Métricas
            </a>
            <a href="#security" className="hover:text-primary transition-colors">
              Seguridad
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/main" className="hidden md:inline-flex">
              <Button variant="outline" size="sm">
                Iniciar sesión
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex flex-1 items-center">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-12 md:flex-row md:items-center">
          <section className="flex-1 space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Nuevo · Sistema unificado de transporte y combustible</p>

            <h1 className="max-w-xl text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Controla tus <span className="bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">rutas, vehículos</span> y combustible en una sola vista.
            </h1>

            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              “Los Libertadores” es un sistema diseñado para empresas de transporte interprovincial que necesitan reducir costos operativos mediante el control preciso de viajes, conductores, consumo de
              combustible y rendimiento por ruta.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/app" className="w-full sm:w-auto">
                <Button className="inline-flex w-full items-center justify-center gap-2 sm:w-auto shadow-lg shadow-primary/30" size="lg">
                  Ver demo del panel
                  <LineChart className="h-4 w-4" />
                </Button>
              </Link>
              <a href="#features" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="inline-flex w-full items-center justify-center gap-2 sm:w-auto">
                  Explorar características
                </Button>
              </a>
            </div>

            <div className="flex flex-wrap gap-4 pt-4 text-xs text-muted-foreground" id="features">
              <div className="inline-flex items-center gap-2">
                <Droplet className="h-4 w-4 text-primary" />
                <span>Control de consumo por km y por ruta</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary" />
                <span>Asignación conductor–vehículo–viaje</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <Map className="h-4 w-4 text-primary" />
                <span>Rutas y frecuencias optimizadas</span>
              </div>
            </div>
          </section>

          <section className="flex-1" id="metrics">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-6 rounded-[32px] bg-linear-to-tr from-primary/30 via-primary/20 to-primary/10 blur-2xl" />
              <div className="relative rounded-[28px] border border-border bg-card p-5 shadow-2xl shadow-primary/30">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-destructive" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-xs text-muted-foreground">Panel · Los Libertadores</span>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-xl bg-primary/10 p-3">
                      <p className="text-[10px] text-muted-foreground">Consumo mensual</p>
                      <p className="mt-1 text-lg font-semibold text-primary">12 430 L</p>
                      <p className="mt-1 text-[10px] text-emerald-400">↓ 8% vs mes anterior</p>
                    </div>
                    <div className="rounded-xl bg-primary/10 p-3">
                      <p className="text-[10px] text-muted-foreground">Rendimiento promedio</p>
                      <p className="mt-1 text-lg font-semibold">8.7 km/L</p>
                      <p className="mt-1 text-[10px] text-emerald-400">+0.6 km/L optimizado</p>
                    </div>
                  </div>

                  <div className="space-y-2 rounded-2xl bg-muted p-3 text-xs">
                    <p className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>Alertas de consumo</span>
                      <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] text-primary">3 activas</span>
                    </p>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between rounded-xl bg-background/60 px-2 py-1.5">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-destructive" />
                          <span className="text-[11px]">Vehículo ABC-123 · Ruta R-001</span>
                        </div>
                        <span className="text-[10px] text-destructive">+18% consumo</span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl bg-background/60 px-2 py-1.5">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-amber-400" />
                          <span className="text-[11px]">Conductor J. Pérez</span>
                        </div>
                        <span className="text-[10px] text-amber-300">Bajo rendimiento</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom mini-graph & badges */}
                  <div className="flex items-end justify-between gap-4">
                    <div className="flex flex-1 items-end gap-1">
                      {[40, 60, 45, 80, 55].map((h, i) => (
                        <div key={i} className="flex-1 rounded-full bg-linear-to-t from-primary/10 to-primary/80" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                    <div className="flex flex-col gap-1 text-[10px] text-muted-foreground" id="security">
                      <span className="inline-flex items-center gap-1 rounded-full bg-background/60 px-2 py-1">
                        <Droplet className="h-3 w-3 text-primary" />
                        <span>Litros / Ruta</span>
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-background/60 px-2 py-1">
                        <ShieldCheck className="h-3 w-3 text-emerald-400" />
                        <span>Alertas automáticas</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating chips */}
              <div className="pointer-events-none absolute -left-10 bottom-10 hidden flex-col gap-3 text-[10px] text-muted-foreground md:flex">
                <div className="rounded-full bg-card px-3 py-1.5 shadow-lg shadow-primary/30">+12% rutas optimizadas</div>
                <div className="rounded-full bg-card px-3 py-1.5 shadow-lg shadow-primary/30">-15% costo por km</div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Small footer */}
      <footer className="border-t border-border py-4 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Los Libertadores · Sistema de Gestión de Transporte y Combustible</footer>
    </div>
  );
}
