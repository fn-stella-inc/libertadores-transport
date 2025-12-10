'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Map, Navigation, ChevronLeft } from 'lucide-react';

type RouteStatus = 'Activa' | 'Inactiva';

type RouteItem = {
  id: number;
  code: string;
  origin: string;
  destination: string;
  distanceKm: number;
  estimatedDurationMin: number;
  frequency: string; // e.g. "Diaria", "3 veces por semana"
  status: RouteStatus;
};

const MOCK_ROUTES: RouteItem[] = [
  {
    id: 1,
    code: 'R-001',
    origin: 'Lima',
    destination: 'Ica',
    distanceKm: 300,
    estimatedDurationMin: 270,
    frequency: 'Diaria',
    status: 'Activa',
  },
  {
    id: 2,
    code: 'R-002',
    origin: 'Arequipa',
    destination: 'Cusco',
    distanceKm: 500,
    estimatedDurationMin: 480,
    frequency: '3 veces por semana',
    status: 'Activa',
  },
  {
    id: 3,
    code: 'R-003',
    origin: 'Lima',
    destination: 'Ayacucho',
    distanceKm: 560,
    estimatedDurationMin: 540,
    frequency: '2 veces por semana',
    status: 'Inactiva',
  },
];

const StatusBadge = ({ status }: { status: RouteStatus }) => {
  const variants: Record<RouteStatus, string> = {
    Activa: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200',
    Inactiva: 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-200',
  };

  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${variants[status]}`}>{status}</span>;
};

const formatDuration = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m.toString().padStart(2, '0')}m`;
};

const RoutesPage = () => {
  const [selectedRoute, setSelectedRoute] = useState<RouteItem | null>(null);

  // Vista detalle
  if (selectedRoute) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setSelectedRoute(null)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold">Ruta {selectedRoute.code}</h1>
              <p className="text-xs text-muted-foreground">
                {selectedRoute.origin} → {selectedRoute.destination}
              </p>
            </div>
          </div>
          <StatusBadge status={selectedRoute.status} />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Resumen principal */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Map className="h-4 w-4" />
              </div>
              <h2 className="text-sm font-semibold">Información de la ruta</h2>
            </div>
            <dl className="space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between gap-2">
                <dt className="font-medium text-foreground">Código</dt>
                <dd>{selectedRoute.code}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="font-medium text-foreground">Origen</dt>
                <dd>{selectedRoute.origin}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="font-medium text-foreground">Destino</dt>
                <dd>{selectedRoute.destination}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="font-medium text-foreground">Distancia</dt>
                <dd>{selectedRoute.distanceKm} km</dd>
              </div>
            </dl>
          </div>

          {/* Tiempo estimado */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <Navigation className="h-4 w-4 text-muted-foreground" />
              </div>
              <h2 className="text-sm font-semibold">Duración estimada</h2>
            </div>
            <p className="text-2xl font-semibold">{formatDuration(selectedRoute.estimatedDurationMin)}</p>
            <p className="mt-1 text-xs text-muted-foreground">Tiempo promedio considerando condiciones normales de ruta.</p>
          </div>

          {/* Frecuencia */}
          <div className="rounded-xl border border-border bg-card p-4">
            <h2 className="mb-3 text-sm font-semibold">Frecuencia y operación</h2>
            <p className="text-sm font-medium">{selectedRoute.frequency || 'No especificado'}</p>
            <p className="mt-1 text-xs text-muted-foreground">Puedes registrar aquí la cantidad de salidas por día o por semana para esta ruta.</p>
          </div>
        </div>

        {/* Placeholders para secciones futuras */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-dashed border-border bg-muted/40 p-4 text-xs text-muted-foreground">
            <p className="font-medium text-foreground">Rendimiento de combustible por ruta</p>
            <p className="mt-1">Aquí podrás mostrar el consumo promedio de combustible para los viajes realizados en esta ruta (L/100km, km/L, costo por km).</p>
          </div>
          <div className="rounded-xl border border-dashed border-border bg-muted/40 p-4 text-xs text-muted-foreground">
            <p className="font-medium text-foreground">Historial de viajes en la ruta</p>
            <p className="mt-1">Detalla los viajes recientes, conductores asignados, horarios y tiempos reales vs. estimados.</p>
          </div>
        </div>
      </div>
    );
  }

  // Vista listado
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Rutas</h1>
          <p className="text-xs text-muted-foreground">Rutas interprovinciales configuradas para la operación.</p>
        </div>
        <Button size="sm">
          <Map className="mr-2 h-4 w-4" />
          Registrar ruta
        </Button>
      </div>

      {/* Desktop: tabla */}
      <div className="hidden overflow-x-auto rounded-xl border border-border bg-card md:block">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/60 text-xs text-muted-foreground">
            <tr>
              <th className="px-4 py-2 text-left font-medium">Código</th>
              <th className="px-4 py-2 text-left font-medium">Origen</th>
              <th className="px-4 py-2 text-left font-medium">Destino</th>
              <th className="px-4 py-2 text-left font-medium">Distancia (km)</th>
              <th className="px-4 py-2 text-left font-medium">Duración est.</th>
              <th className="px-4 py-2 text-left font-medium">Frecuencia</th>
              <th className="px-4 py-2 text-left font-medium">Estado</th>
              <th className="px-4 py-2 text-right font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ROUTES.map((r) => (
              <tr key={r.id} className="border-t border-border/60 cursor-pointer hover:bg-muted/40" onClick={() => setSelectedRoute(r)}>
                <td className="px-4 py-2 font-medium">{r.code}</td>
                <td className="px-4 py-2">{r.origin}</td>
                <td className="px-4 py-2">{r.destination}</td>
                <td className="px-4 py-2">{r.distanceKm}</td>
                <td className="px-4 py-2">{formatDuration(r.estimatedDurationMin)}</td>
                <td className="px-4 py-2">{r.frequency}</td>
                <td className="px-4 py-2">
                  <StatusBadge status={r.status} />
                </td>
                <td className="px-4 py-2 text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRoute(r);
                    }}
                  >
                    Ver detalle
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: cards */}
      <div className="space-y-3 md:hidden">
        {MOCK_ROUTES.map((r) => (
          <button key={r.id} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-left shadow-sm hover:bg-muted/40" onClick={() => setSelectedRoute(r)}>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Map className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{r.code}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {r.origin} → {r.destination}
                  </p>
                </div>
              </div>
              <StatusBadge status={r.status} />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
              <span>
                <span className="font-medium text-foreground">Distancia:</span> {r.distanceKm} km
              </span>
              <span>
                <span className="font-medium text-foreground">Duración:</span> {formatDuration(r.estimatedDurationMin)}
              </span>
              <span className="col-span-2">
                <span className="font-medium text-foreground">Frecuencia:</span> {r.frequency}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoutesPage;
