'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Droplet, FileText, Filter, Gauge, Map, Truck } from 'lucide-react';

type ReportFilters = {
  from: string;
  to: string;
  vehicle: string;
  route: string;
};

const ReportsPage = () => {
  const [filters, setFilters] = useState<ReportFilters>({
    from: '',
    to: '',
    vehicle: 'all',
    route: 'all',
  });

  const handleChange = (field: keyof ReportFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  // Mock KPIs
  const totalFuel = 12430; // litros
  const avgEfficiency = 8.7; // km/L
  const tripsCount = 320;
  const costPerKm = 4.2; // S/ por km (mock)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Reportes</h1>
          <p className="text-xs text-muted-foreground">Genera reportes de consumo de combustible, rendimiento y viajes.</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-sm font-medium">Filtros generales de periodo</p>
          <Button size="sm" variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Aplicar filtros (mock)
          </Button>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          <div className="space-y-1 text-xs">
            <label className="font-medium text-foreground">Desde</label>
            <input
              type="date"
              className="h-9 w-full rounded-md border border-input bg-background px-2 text-xs outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={filters.from}
              onChange={(e) => handleChange('from', e.target.value)}
            />
          </div>

          <div className="space-y-1 text-xs">
            <label className="font-medium text-foreground">Hasta</label>
            <input
              type="date"
              className="h-9 w-full rounded-md border border-input bg-background px-2 text-xs outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={filters.to}
              onChange={(e) => handleChange('to', e.target.value)}
            />
          </div>

          <div className="space-y-1 text-xs">
            <label className="font-medium text-foreground">Vehículo</label>
            <select
              className="h-9 w-full rounded-md border border-input bg-background px-2 text-xs outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={filters.vehicle}
              onChange={(e) => handleChange('vehicle', e.target.value)}
            >
              <option value="all">Todos</option>
              <option value="ABC-123">ABC-123</option>
              <option value="XYZ-789">XYZ-789</option>
            </select>
          </div>

          <div className="space-y-1 text-xs">
            <label className="font-medium text-foreground">Ruta</label>
            <select
              className="h-9 w-full rounded-md border border-input bg-background px-2 text-xs outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={filters.route}
              onChange={(e) => handleChange('route', e.target.value)}
            >
              <option value="all">Todas</option>
              <option value="R-001">R-001 · Lima - Ica</option>
              <option value="R-002">R-002 · Arequipa - Cusco</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPIs resumidos */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Droplet className="h-4 w-4" />
            </div>
            <p className="text-xs font-medium">Consumo total</p>
          </div>
          <p className="text-2xl font-semibold">{totalFuel.toLocaleString('es-PE')} L</p>
          <p className="mt-1 text-xs text-muted-foreground">Suma de litros abastecidos en el periodo filtrado.</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Gauge className="h-4 w-4" />
            </div>
            <p className="text-xs font-medium">Rendimiento promedio</p>
          </div>
          <p className="text-2xl font-semibold">{avgEfficiency.toFixed(1)} km/L</p>
          <p className="mt-1 text-xs text-muted-foreground">Relación km recorridos / litros usados.</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Truck className="h-4 w-4" />
            </div>
            <p className="text-xs font-medium">Viajes registrados</p>
          </div>
          <p className="text-2xl font-semibold">{tripsCount.toLocaleString('es-PE')}</p>
          <p className="mt-1 text-xs text-muted-foreground">Cantidad de viajes completados en el periodo.</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Map className="h-4 w-4" />
            </div>
            <p className="text-xs font-medium">Costo por km (estimado)</p>
          </div>
          <p className="text-2xl font-semibold">S/ {costPerKm.toFixed(2)}</p>
          <p className="mt-1 text-xs text-muted-foreground">Estimación de costo promedio por kilómetro recorrido.</p>
        </div>
      </div>

      {/* Sección de plantillas de reportes */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold">Plantillas de reportes</h2>
            <p className="text-xs text-muted-foreground">Elige el tipo de reporte que necesitas exportar.</p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <Button variant="outline" size="sm">
              Exportar PDF
            </Button>
            <Button variant="outline" size="sm">
              Exportar Excel
            </Button>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          <button className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-3 text-left text-xs hover:bg-muted/60">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold">Consumo de combustible</span>
              <span className="text-[11px] text-muted-foreground">Litros, costo y frecuencia por vehículo y ruta.</span>
            </div>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </button>

          <button className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-3 text-left text-xs hover:bg-muted/60">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold">Rendimiento por vehículo</span>
              <span className="text-[11px] text-muted-foreground">km/L, litros por 100 km, alertas de bajo rendimiento.</span>
            </div>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </button>

          <button className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-3 text-left text-xs hover:bg-muted/60">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold">Rendimiento por ruta</span>
              <span className="text-[11px] text-muted-foreground">Comparación de consumo y costo por trayecto.</span>
            </div>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </button>

          <button className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-3 text-left text-xs hover:bg-muted/60">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold">Historial de viajes</span>
              <span className="text-[11px] text-muted-foreground">Lista detallada de viajes, horarios y responsables.</span>
            </div>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </button>

          <button className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-3 text-left text-xs hover:bg-muted/60">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold">Costos por vehículo</span>
              <span className="text-[11px] text-muted-foreground">Costo de combustible y viajes por unidad.</span>
            </div>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </button>

          <button className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-3 text-left text-xs hover:bg-muted/60">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold">Resumen ejecutivo</span>
              <span className="text-[11px] text-muted-foreground">KPI clave para gerencia: costos, consumo y viajes.</span>
            </div>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Sección de notas / ayuda */}
      <div className="rounded-xl border border-dashed border-border bg-muted/40 p-4 text-xs text-muted-foreground">
        <p className="font-medium text-foreground">Nota para el sistema real</p>
        <p className="mt-1">
          En la implementación final, cada plantilla de reporte disparará una consulta al backend (PostgreSQL) usando los filtros seleccionados y generará el archivo PDF/Excel con los datos agregados de
          consumo, viajes y rendimiento.
        </p>
      </div>
    </div>
  );
};

export default ReportsPage;
