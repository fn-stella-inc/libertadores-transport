'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Navigation, MapPin, Truck, User, CalendarClock, Gauge, ChevronLeft } from 'lucide-react';

type TripStatus = 'Programado' | 'En Progreso' | 'Completado' | 'Cancelado';

type Trip = {
  id: number;
  code: string;
  routeCode: string;
  origin: string;
  destination: string;
  vehiclePlate: string;
  driverName: string;
  plannedDeparture: string; // ISO o string
  realDeparture?: string;
  plannedArrival?: string;
  realArrival?: string;
  status: TripStatus;
  distanceKm: number;
  fuelUsedLiters?: number;
};

const MOCK_TRIPS: Trip[] = [
  {
    id: 1,
    code: 'T-1001',
    routeCode: 'R-001',
    origin: 'Lima',
    destination: 'Ica',
    vehiclePlate: 'ABC-123',
    driverName: 'Juan Pérez',
    plannedDeparture: '2025-12-10T08:00:00',
    realDeparture: '2025-12-10T08:15:00',
    plannedArrival: '2025-12-10T12:30:00',
    realArrival: undefined,
    status: 'En Progreso',
    distanceKm: 300,
    fuelUsedLiters: 120,
  },
  {
    id: 2,
    code: 'T-1002',
    routeCode: 'R-002',
    origin: 'Arequipa',
    destination: 'Cusco',
    vehiclePlate: 'DEF-456',
    driverName: 'Roberto Díaz',
    plannedDeparture: '2025-12-11T06:00:00',
    realDeparture: undefined,
    plannedArrival: '2025-12-11T14:00:00',
    realArrival: undefined,
    status: 'Programado',
    distanceKm: 500,
    fuelUsedLiters: undefined,
  },
  {
    id: 3,
    code: 'T-0998',
    routeCode: 'R-001',
    origin: 'Lima',
    destination: 'Ica',
    vehiclePlate: 'ABC-123',
    driverName: 'Juan Pérez',
    plannedDeparture: '2025-12-05T08:00:00',
    realDeparture: '2025-12-05T08:05:00',
    plannedArrival: '2025-12-05T12:30:00',
    realArrival: '2025-12-05T12:20:00',
    status: 'Completado',
    distanceKm: 300,
    fuelUsedLiters: 112,
  },
];

const StatusBadge = ({ status }: { status: TripStatus }) => {
  const variants: Record<TripStatus, string> = {
    Programado: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-200',
    'En Progreso': 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-200',
    Completado: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200',
    Cancelado: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-200',
  };

  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${variants[status]}`}>{status}</span>;
};

const formatDateTime = (value?: string) => {
  if (typeof window === 'undefined') return ''; // <-- evitar formato SSR
  if (!value) return '—';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const calcEfficiency = (trip: Trip) => {
  if (!trip.fuelUsedLiters || !trip.distanceKm) return null;
  return trip.distanceKm / trip.fuelUsedLiters;
};

const TripsPage = () => {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  // Vista detalle
  if (selectedTrip) {
    const efficiency = calcEfficiency(selectedTrip);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setSelectedTrip(null)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold">Viaje {selectedTrip.code}</h1>
              <p className="text-xs text-muted-foreground">
                Ruta {selectedTrip.routeCode} · {selectedTrip.origin} → {selectedTrip.destination}
              </p>
            </div>
          </div>
          <StatusBadge status={selectedTrip.status} />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Tiempos */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <CalendarClock className="h-4 w-4" />
              </div>
              <h2 className="text-sm font-semibold">Horario</h2>
            </div>
            <dl className="space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between gap-2">
                <dt className="font-medium text-foreground">Salida programada</dt>
                <dd>{formatDateTime(selectedTrip.plannedDeparture)}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="font-medium text-foreground">Salida real</dt>
                <dd>{formatDateTime(selectedTrip.realDeparture)}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="font-medium text-foreground">Llegada programada</dt>
                <dd>{formatDateTime(selectedTrip.plannedArrival)}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="font-medium text-foreground">Llegada real</dt>
                <dd>{formatDateTime(selectedTrip.realArrival)}</dd>
              </div>
            </dl>
          </div>

          {/* Vehículo */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Truck className="h-4 w-4" />
              </div>
              <h2 className="text-sm font-semibold">Vehículo</h2>
            </div>
            <p className="text-sm font-semibold">{selectedTrip.vehiclePlate}</p>
            <p className="mt-1 text-xs text-muted-foreground">Placa del vehículo asignado al viaje.</p>
          </div>

          {/* Conductor */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
              <h2 className="text-sm font-semibold">Conductor</h2>
            </div>
            <p className="text-sm font-semibold">{selectedTrip.driverName}</p>
            <p className="mt-1 text-xs text-muted-foreground">Conductor responsable de la ruta.</p>
          </div>

          {/* Distancia / combustible */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Navigation className="h-4 w-4" />
              </div>
              <h2 className="text-sm font-semibold">Distancia y consumo</h2>
            </div>
            <dl className="space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between gap-2">
                <dt className="font-medium text-foreground">Distancia</dt>
                <dd>{selectedTrip.distanceKm} km</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="font-medium text-foreground">Combustible usado</dt>
                <dd>{selectedTrip.fuelUsedLiters ? `${selectedTrip.fuelUsedLiters} L` : 'Pendiente de registrar'}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="font-medium text-foreground">Rendimiento</dt>
                <dd>{efficiency ? `${efficiency.toFixed(2)} km/L` : '—'}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Placeholders para histórico y alertas */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-dashed border-border bg-muted/40 p-4 text-xs text-muted-foreground">
            <p className="font-medium text-foreground">Eventos y observaciones del viaje</p>
            <p className="mt-1">Registra incidentes, retrasos, desvíos o comentarios del conductor y del área de despacho.</p>
          </div>
          <div className="rounded-xl border border-dashed border-border bg-muted/40 p-4 text-xs text-muted-foreground">
            <p className="font-medium text-foreground">Alertas de consumo / rendimiento</p>
            <p className="mt-1">Aquí podrás mostrar alertas automáticas cuando el consumo de combustible supere el rango esperado para la ruta.</p>
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
          <h1 className="text-xl font-semibold">Viajes</h1>
          <p className="text-xs text-muted-foreground">Listado de viajes programados, en curso y completados.</p>
        </div>
        <Button size="sm">
          <Navigation className="mr-2 h-4 w-4" />
          Programar viaje
        </Button>
      </div>

      {/* Desktop: tabla */}
      <div className="hidden overflow-x-auto rounded-xl border border-border bg-card md:block">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/60 text-xs text-muted-foreground">
            <tr>
              <th className="px-4 py-2 text-left font-medium">Código</th>
              <th className="px-4 py-2 text-left font-medium">Ruta</th>
              <th className="px-4 py-2 text-left font-medium">Origen</th>
              <th className="px-4 py-2 text-left font-medium">Destino</th>
              <th className="px-4 py-2 text-left font-medium">Vehículo</th>
              <th className="px-4 py-2 text-left font-medium">Conductor</th>
              <th className="px-4 py-2 text-left font-medium">Salida prog.</th>
              <th className="px-4 py-2 text-left font-medium">Estado</th>
              <th className="px-4 py-2 text-right font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_TRIPS.map((t) => (
              <tr key={t.id} className="border-t border-border/60 cursor-pointer hover:bg-muted/40" onClick={() => setSelectedTrip(t)}>
                <td className="px-4 py-2 font-medium">{t.code}</td>
                <td className="px-4 py-2">{t.routeCode}</td>
                <td className="px-4 py-2">{t.origin}</td>
                <td className="px-4 py-2">{t.destination}</td>
                <td className="px-4 py-2">{t.vehiclePlate}</td>
                <td className="px-4 py-2">{t.driverName}</td>
                <td className="px-4 py-2">{formatDateTime(t.plannedDeparture)}</td>
                <td className="px-4 py-2">
                  <StatusBadge status={t.status} />
                </td>
                <td className="px-4 py-2 text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTrip(t);
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
        {MOCK_TRIPS.map((t) => (
          <button key={t.id} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-left shadow-sm hover:bg-muted/40" onClick={() => setSelectedTrip(t)}>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Navigation className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.code}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {t.origin} → {t.destination}
                  </p>
                </div>
              </div>
              <StatusBadge status={t.status} />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
              <span>
                <span className="font-medium text-foreground">Vehículo:</span> {t.vehiclePlate}
              </span>
              <span>
                <span className="font-medium text-foreground">Conductor:</span> {t.driverName}
              </span>
              <span className="col-span-2">
                <span className="font-medium text-foreground">Salida prog.:</span> {formatDateTime(t.plannedDeparture)}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TripsPage;
