'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Truck, User, Map, Navigation, Droplet, Gauge, AlertTriangle, Clock, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const DashboardPage = () => {
  const totalVehicles = 45;
  const activeDrivers = 32;
  const activeRoutes = 18;
  const tripsToday = 12;
  const monthlyFuelLiters = 12430;
  const avgEfficiency = 8.4;

  const recentTrips = [
    {
      code: 'T-1001',
      route: 'R-001',
      origin: 'Lima',
      destination: 'Ica',
      vehicle: 'ABC-123',
      driver: 'Juan Pérez',
      status: 'En Progreso',
      departure: '10/12/2025 08:15',
    },
    {
      code: 'T-1002',
      route: 'R-002',
      origin: 'Arequipa',
      destination: 'Cusco',
      vehicle: 'DEF-456',
      driver: 'Roberto Díaz',
      status: 'Programado',
      departure: '11/12/2025 06:00',
    },
    {
      code: 'T-0998',
      route: 'R-001',
      origin: 'Lima',
      destination: 'Ica',
      vehicle: 'ABC-123',
      driver: 'Juan Pérez',
      status: 'Completado',
      departure: '05/12/2025 08:05',
    },
  ];

  const recentFuel = [
    {
      id: 1,
      date: '09/12/2025 08:30',
      vehicle: 'ABC-123',
      fuel: 'Diesel',
      liters: 150,
      total: 675,
      station: 'Repsol Norte',
    },
    {
      id: 2,
      date: '10/12/2025 11:15',
      vehicle: 'XYZ-789',
      fuel: 'Gasolina',
      liters: 40,
      total: 192,
      station: 'Primax Sur',
    },
  ];

  const alerts = [
    {
      id: 1,
      type: 'consumo',
      label: 'Alto consumo',
      detail: 'Vehículo ABC-123 · Ruta R-001',
      severity: 'high' as const,
    },
    {
      id: 2,
      type: 'rendimiento',
      label: 'Bajo rendimiento',
      detail: 'Conductor Juan Pérez',
      severity: 'medium' as const,
    },
  ];

  const weeklyFuel = [
    { day: 'Lun', liters: 400 },
    { day: 'Mar', liters: 300 },
    { day: 'Mié', liters: 550 },
    { day: 'Jue', liters: 450 },
    { day: 'Vie', liters: 600 },
    { day: 'Sáb', liters: 700 },
    { day: 'Dom', liters: 200 },
  ];

  const pieColors = [
    '#f97373', // Lun
    '#fb923c', // Mar
    '#facc15', // Mié
    '#4ade80', // Jue
    '#2dd4bf', // Vie
    '#60a5fa', // Sáb
    '#a855f7', // Dom
  ];

  const totalWeeklyLiters = weeklyFuel.reduce((acc, d) => acc + d.liters, 0);
  const avgWeeklyLiters = totalWeeklyLiters / weeklyFuel.length;
  const maxWeeklyLiters = Math.max(...weeklyFuel.map((d) => d.liters));
  const minWeeklyLiters = Math.min(...weeklyFuel.map((d) => d.liters));
  const maxDay = weeklyFuel.find((d) => d.liters === maxWeeklyLiters)?.day;
  const minDay = weeklyFuel.find((d) => d.liters === minWeeklyLiters)?.day;

  const statusBadge = (status: string) => {
    const base = 'inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium';
    if (status === 'En Progreso') {
      return <span className={`${base} bg-blue-500/10 text-blue-600 dark:text-blue-300`}>En progreso</span>;
    }
    if (status === 'Programado') {
      return <span className={`${base} bg-purple-500/10 text-purple-600 dark:text-purple-300`}>Programado</span>;
    }
    if (status === 'Completado') {
      return <span className={`${base} bg-emerald-500/10 text-emerald-600 dark:text-emerald-300`}>Completado</span>;
    }
    return <span className={`${base} bg-muted text-muted-foreground`}>{status}</span>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <p className="text-xs text-muted-foreground">Vista general de operación, consumo de combustible y rendimiento.</p>
        </div>
        <Button size="sm" className="gap-2">
          Ver reportes
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* KPIs principales */}
      <section className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-xs font-medium text-muted-foreground">Vehículos</p>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Truck className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-semibold">{totalVehicles}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">Flota registrada en el sistema.</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-xs font-medium text-muted-foreground">Conductores activos</p>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <User className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-semibold">{activeDrivers}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">Con conductores habilitados para operar.</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-xs font-medium text-muted-foreground">Rutas activas</p>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Map className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-semibold">{activeRoutes}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">Configuradas en el sistema.</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-xs font-medium text-muted-foreground">Viajes hoy</p>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Navigation className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-semibold">{tripsToday}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">Programados y en progreso.</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-xs font-medium text-muted-foreground">Consumo mensual</p>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Droplet className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-semibold">{monthlyFuelLiters.toLocaleString('es-PE')} L</p>
          <p className="mt-1 text-[11px] text-muted-foreground">Total de litros abastecidos.</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-xs font-medium text-muted-foreground">Rendimiento promedio</p>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Gauge className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-semibold">{avgEfficiency.toFixed(1)} km/L</p>
          <p className="mt-1 text-[11px] text-muted-foreground">Basado en viajes completados.</p>
        </div>
      </section>

      <section className="grid gap-4 items-start lg:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-4 md:p-5">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold">Consumo semanal</p>
              <p className="text-[11px] text-muted-foreground">Litros cargados por día (mock)</p>
            </div>
          </div>

          <div className="w-full">
            <div className="grid h-56 grid-cols-1 gap-4 md:h-64 md:grid-cols-[2fr_1fr]">
              <div className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyFuel}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.2} />
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'currentColor' }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: 'currentColor' }} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        fontSize: 11,
                        borderRadius: 8,
                      }}
                      formatter={(value) => [`${value} L`, 'Litros']}
                      labelStyle={{ fontSize: 11 }}
                    />
                    <Bar dataKey="liters" radius={[6, 6, 0, 0]} className="fill-primary" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip
                      contentStyle={{
                        fontSize: 11,
                        borderRadius: 8,
                      }}
                      formatter={(value) => [`${value} L`, 'Litros']}
                      labelStyle={{ fontSize: 11 }}
                    />
                    <Pie
                      data={weeklyFuel}
                      dataKey="liters"
                      nameKey="day"
                      outerRadius="80%"
                      paddingAngle={2}
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
                    >
                      {weeklyFuel.map((entry, index) => (
                        <Cell key={`slice-${entry.day}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="mt-5 overflow-hidden rounded-lg border border-border bg-background">
            <table className="w-full text-left text-[11px]">
              <tbody>
                <tr className="border-t border-border/80 bg-muted/40">
                  <td className="px-2 py-1.5 font-semibold">Total</td>
                  <td className="px-2 py-1.5 font-semibold">{totalWeeklyLiters.toLocaleString('es-PE')} L</td>
                </tr>
                <tr className="border-t border-border/80 bg-muted/20">
                  <td className="px-2 py-1.5">Promedio / día</td>
                  <td className="px-2 py-1.5">{avgWeeklyLiters.toFixed(1)} L</td>
                </tr>
                <tr className="border-t border-border/80 bg-muted/20">
                  <td className="px-2 py-1.5">Mayor consumo</td>
                  <td className="px-2 py-1.5">
                    {maxWeeklyLiters.toLocaleString('es-PE')} L ({maxDay})
                  </td>
                </tr>
                <tr className="border-t border-border/80 bg-muted/20">
                  <td className="px-2 py-1.5">Menor consumo</td>
                  <td className="px-2 py-1.5">
                    {minWeeklyLiters.toLocaleString('es-PE')} L ({minDay})
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-3 md:p-4 text-[11px]">
          <div className="mb-2 flex items-center justify-between gap-2">
            <div>
              <p className="text-xs font-semibold">Alertas</p>
              <p className="text-[10px] text-muted-foreground">Consumo y rendimiento fuera de rango.</p>
            </div>
            <Badge variant="outline" className="px-2 py-0.5 text-[10px]">
              {alerts.length} activas
            </Badge>
          </div>

          <div className="mt-1 space-y-1.5 max-h-56 overflow-y-auto pr-1">
            {alerts.map((a) => (
              <div key={a.id} className="flex items-start gap-2 rounded-md border border-border bg-background px-2 py-1.5">
                <div className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full ${a.severity === 'high' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'}`}>
                  <AlertTriangle className="h-3 w-3" />
                </div>
                <div className="flex-1">
                  <p className="font-medium leading-tight text-[11px]">{a.label}</p>
                  <p className="text-[10px] text-muted-foreground">{a.detail}</p>
                </div>
              </div>
            ))}
            {alerts.length === 0 && <p className="text-[10px] text-muted-foreground">No hay alertas activas.</p>}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="text-sm font-semibold">Últimos viajes</p>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="hidden text-xs md:block">
            <table className="w-full text-left">
              <thead className="border-b border-border/60 text-[11px] uppercase text-muted-foreground">
                <tr>
                  <th className="py-1.5 pr-2">Código</th>
                  <th className="py-1.5 pr-2">Ruta</th>
                  <th className="py-1.5 pr-2">Vehículo</th>
                  <th className="py-1.5 pr-2">Conductor</th>
                  <th className="py-1.5 pr-2">Salida</th>
                  <th className="py-1.5 pr-2">Estado</th>
                </tr>
              </thead>
              <tbody>
                {recentTrips.map((t) => (
                  <tr key={t.code} className="border-b border-border/40 text-xs last:border-b-0">
                    <td className="py-2 pr-2 font-medium">{t.code}</td>
                    <td className="py-2 pr-2">
                      {t.route} · {t.origin} → {t.destination}
                    </td>
                    <td className="py-2 pr-2">{t.vehicle}</td>
                    <td className="py-2 pr-2">{t.driver}</td>
                    <td className="py-2 pr-2">{t.departure}</td>
                    <td className="py-2 pr-2">{statusBadge(t.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-2 text-xs md:hidden">
            {recentTrips.map((t) => (
              <div key={t.code} className="rounded-lg border border-border bg-background p-3">
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-semibold">{t.code}</p>
                  {statusBadge(t.status)}
                </div>
                <p className="text-[11px] text-muted-foreground">
                  {t.route} · {t.origin} → {t.destination}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Vehículo {t.vehicle} · {t.driver}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">Salida: {t.departure}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="text-sm font-semibold">Últimos abastecimientos</p>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="hidden text-xs md:block">
            <table className="w-full text-left">
              <thead className="border-b border-border/60 text-[11px] uppercase text-muted-foreground">
                <tr>
                  <th className="py-1.5 pr-2">Fecha</th>
                  <th className="py-1.5 pr-2">Vehículo</th>
                  <th className="py-1.5 pr-2">Combustible</th>
                  <th className="py-1.5 pr-2">Litros</th>
                  <th className="py-1.5 pr-2">Total</th>
                  <th className="py-1.5 pr-2">Estación</th>
                </tr>
              </thead>
              <tbody>
                {recentFuel.map((f) => (
                  <tr key={f.id} className="border-b border-border/40 text-xs last:border-b-0">
                    <td className="py-2 pr-2">{f.date}</td>
                    <td className="py-2 pr-2 font-medium">{f.vehicle}</td>
                    <td className="py-2 pr-2">{f.fuel}</td>
                    <td className="py-2 pr-2">{f.liters.toFixed(1)} L</td>
                    <td className="py-2 pr-2">S/ {f.total.toFixed(2)}</td>
                    <td className="py-2 pr-2">{f.station}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-2 text-xs md:hidden">
            {recentFuel.map((f) => (
              <div key={f.id} className="rounded-lg border border-border bg-background p-3">
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-semibold">{f.vehicle}</p>
                  <span className="text-[11px] text-muted-foreground">{f.date}</span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  {f.fuel} · {f.liters.toFixed(1)} L
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">Total: S/ {f.total.toFixed(2)}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">Estación: {f.station}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
