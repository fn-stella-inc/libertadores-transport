"use client";

import Link from "next/link";
import { Truck, Gauge, Map, Droplet, LineChart, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#0f1020] text-zinc-50 flex flex-col">
      {/* Navbar */}
      <header className="w-full border-b border-white/5">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-tr from-pink-400 to-purple-500">
              <Truck className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-wide text-pink-100">
                Los Libertadores
              </span>
              <span className="text-xs text-zinc-400">Transportation & Fuel Control</span>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
            <a href="#features" className="hover:text-pink-200 transition-colors">
              Características
            </a>
            <a href="#metrics" className="hover:text-pink-200 transition-colors">
              Métricas
            </a>
            <a href="#security" className="hover:text-pink-200 transition-colors">
              Seguridad
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-full border border-white/10 px-4 py-1.5 text-xs font-medium text-zinc-200 hover:bg-white/5 md:inline-flex"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/app"
              className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-pink-400 via-purple-400 to-sky-400 px-4 py-1.5 text-xs font-semibold text-[#0f1020] shadow-lg shadow-pink-500/30 hover:brightness-110"
            >
              Ir al panel
              <Gauge className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-1 items-center">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-12 md:flex-row md:items-center">
          {/* Left – text */}
          <section className="flex-1 space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-pink-500/40 bg-pink-500/10 px-3 py-1 text-xs font-medium text-pink-100">
              Nuevo · Sistema unificado de transporte y combustible
            </p>

            <h1 className="max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-pink-100 md:text-5xl">
              Controla tus{" "}
              <span className="bg-linear-to-r from-pink-300 via-purple-300 to-sky-300 bg-clip-text text-transparent">
                rutas, vehículos
              </span>{" "}
              y combustible en una sola vista.
            </h1>

            <p className="max-w-xl text-sm leading-relaxed text-zinc-300 md:text-base">
              “Los Libertadores” es un sistema diseñado para empresas de transporte interprovincial
              que necesitan reducir costos operativos mediante el control preciso de viajes,
              conductores, consumo de combustible y rendimiento por ruta.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/app"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-pink-400 via-purple-400 to-sky-400 px-6 py-2 text-sm font-semibold text-[#0f1020] shadow-lg shadow-pink-500/30 hover:brightness-110"
              >
                Ver demo del panel
                <LineChart className="h-4 w-4" />
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-2 text-sm font-medium text-zinc-100 hover:bg-white/10"
              >
                Explorar características
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 pt-4 text-xs text-zinc-300">
              <div className="inline-flex items-center gap-2">
                <Droplet className="h-4 w-4 text-sky-300" />
                <span>Control de consumo por km y por ruta</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <Truck className="h-4 w-4 text-pink-300" />
                <span>Asignación conductor–vehículo–viaje</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <Map className="h-4 w-4 text-purple-300" />
                <span>Rutas y frecuencias optimizadas</span>
              </div>
            </div>
          </section>

          {/* Right – “illustration” card */}
          <section className="flex-1">
            <div className="relative mx-auto max-w-md">
              {/* Glow */}
              <div className="absolute -inset-6 rounded-[32px] bg-linear-to-tr from-pink-500/30 via-purple-500/30 to-sky-400/30 blur-2xl" />
              {/* Screen */}
              <div className="relative rounded-[28px] border border-white/10 bg-[#18192b] p-5 shadow-2xl shadow-purple-900/50">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                  </div>
                  <span className="text-xs text-zinc-400">Panel · Los Libertadores</span>
                </div>

                <div className="space-y-4">
                  {/* Top summary */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-xl bg-linear-to-br from-pink-500/20 to-purple-500/10 p-3">
                      <p className="text-[10px] text-zinc-300">Consumo mensual</p>
                      <p className="mt-1 text-lg font-semibold text-pink-100">12 430 L</p>
                      <p className="mt-1 text-[10px] text-emerald-300">↓ 8% vs mes anterior</p>
                    </div>
                    <div className="rounded-xl bg-linear-to-br from-sky-500/20 to-emerald-500/10 p-3">
                      <p className="text-[10px] text-zinc-300">Rendimiento promedio</p>
                      <p className="mt-1 text-lg font-semibold text-sky-100">8.7 km/L</p>
                      <p className="mt-1 text-[10px] text-emerald-300">+0.6 km/L optimizado</p>
                    </div>
                  </div>

                  {/* Middle list */}
                  <div className="space-y-2 rounded-2xl bg-[#111222] p-3 text-xs">
                    <p className="mb-1 flex items-center justify-between text-[11px] text-zinc-400">
                      <span>Alertas de consumo</span>
                      <span className="rounded-full bg-pink-500/20 px-2 py-0.5 text-[10px] text-pink-100">
                        3 activas
                      </span>
                    </p>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between rounded-xl bg-white/5 px-2 py-1.5">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-red-400" />
                          <span className="text-[11px] text-zinc-100">
                            Vehículo ABC-123 · Ruta R-001
                          </span>
                        </div>
                        <span className="text-[10px] text-red-300">+18% consumo</span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl bg-white/5 px-2 py-1.5">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-amber-300" />
                          <span className="text-[11px] text-zinc-100">Conductor J. Pérez</span>
                        </div>
                        <span className="text-[10px] text-amber-200">Bajo rendimiento</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom mini-graph & badges */}
                  <div className="flex items-end justify-between gap-4">
                    <div className="flex flex-1 items-end gap-1">
                      {[40, 60, 45, 80, 55].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-full bg-linear-to-t from-purple-500/10 to-sky-400/70"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                    <div className="flex flex-col gap-1 text-[10px] text-zinc-300">
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-1">
                        <Droplet className="h-3 w-3 text-sky-300" />
                        <span>Litros / Ruta</span>
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-1">
                        <ShieldCheck className="h-3 w-3 text-emerald-300" />
                        <span>Alertas automáticas</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating chips */}
              <div className="pointer-events-none absolute -left-10 bottom-10 hidden flex-col gap-3 text-[10px] text-zinc-200 md:flex">
                <div className="rounded-full bg-[#18192b] px-3 py-1.5 shadow-lg shadow-purple-900/40">
                  +12% rutas optimizadas
                </div>
                <div className="rounded-full bg-[#18192b] px-3 py-1.5 shadow-lg shadow-sky-900/40">
                  -15% costo por km
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Small footer */}
      <footer className="border-t border-white/5 py-4 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} Los Libertadores · Sistema de Gestión de Transporte y
        Combustible
      </footer>
    </div>
  );
}
