'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User, Truck, Calendar, ChevronLeft } from 'lucide-react';

type DriverStatus = 'Disponible' | 'En Ruta' | 'Inactivo' | 'Suspendido';

type Driver = {
  id: number;
  fullName: string;
  licenseNumber: string;
  licenseCategory: string;
  licenseExpiry: string; // ISO o string simple
  phone: string;
  status: DriverStatus;
  assignedVehicle?: string;
};

const MOCK_DRIVERS: Driver[] = [
  {
    id: 1,
    fullName: 'Juan Pérez',
    licenseNumber: 'A-123456',
    licenseCategory: 'A3',
    licenseExpiry: '2025-06-12',
    phone: '999-111-222',
    status: 'En Ruta',
    assignedVehicle: 'ABC-123',
  },
  {
    id: 2,
    fullName: 'Roberto Díaz',
    licenseNumber: 'B-987654',
    licenseCategory: 'A3',
    licenseExpiry: '2024-12-01',
    phone: '999-333-444',
    status: 'Disponible',
    assignedVehicle: 'XYZ-789',
  },
  {
    id: 3,
    fullName: 'María Gómez',
    licenseNumber: 'C-456789',
    licenseCategory: 'A2',
    licenseExpiry: '2026-03-20',
    phone: '999-555-666',
    status: 'Inactivo',
    assignedVehicle: undefined,
  },
];

const StatusBadge = ({ status }: { status: DriverStatus }) => {
  const variants: Record<DriverStatus, string> = {
    Disponible: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200',
    'En Ruta': 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-200',
    Inactivo: 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-200',
    Suspendido: 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-200',
  };

  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${variants[status]}`}>{status}</span>;
};

const formatDate = (value: string) => {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('es-PE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

const DriversPage = () => {
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  // Vista detalle
  if (selectedDriver) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setSelectedDriver(null)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold">Conductor {selectedDriver.fullName}</h1>
              <p className="text-xs text-muted-foreground">Información y estado del conductor</p>
            </div>
          </div>
          <StatusBadge status={selectedDriver.status} />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Info personal */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User className="h-4 w-4" />
              </div>
              <h2 className="text-sm font-semibold">Datos personales</h2>
            </div>
            <dl className="space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between gap-2">
                <dt className="font-medium text-foreground">Nombre</dt>
                <dd>{selectedDriver.fullName}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="font-medium text-foreground">Teléfono</dt>
                <dd>{selectedDriver.phone}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="font-medium text-foreground">Estado</dt>
                <dd>
                  <StatusBadge status={selectedDriver.status} />
                </dd>
              </div>
            </dl>
          </div>

          {/* Licencia */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <h2 className="text-sm font-semibold">Licencia de conducir</h2>
            </div>
            <dl className="space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between gap-2">
                <dt className="font-medium text-foreground">Número</dt>
                <dd>{selectedDriver.licenseNumber}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="font-medium text-foreground">Categoría</dt>
                <dd>{selectedDriver.licenseCategory}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="font-medium text-foreground">Vencimiento</dt>
                <dd>{formatDate(selectedDriver.licenseExpiry)}</dd>
              </div>
            </dl>
          </div>

          {/* Vehículo asignado */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Truck className="h-4 w-4" />
              </div>
              <h2 className="text-sm font-semibold">Vehículo asignado</h2>
            </div>
            <p className="text-sm font-medium">{selectedDriver.assignedVehicle ?? 'Sin vehículo asignado'}</p>
            <p className="mt-1 text-xs text-muted-foreground">Relación conductor–vehículo para los viajes activos.</p>
          </div>
        </div>

        {/* Bloques placeholder para futuras secciones */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-dashed border-border bg-muted/40 p-4 text-xs text-muted-foreground">
            <p className="font-medium text-foreground">Historial de viajes del conductor</p>
            <p className="mt-1">Aquí podrás mostrar los viajes realizados, rutas, km recorridos y tiempos de conducción.</p>
          </div>
          <div className="rounded-xl border border-dashed border-border bg-muted/40 p-4 text-xs text-muted-foreground">
            <p className="font-medium text-foreground">Rendimiento de combustible por conductor</p>
            <p className="mt-1">Resumen de consumo de combustible asociado a los viajes de este conductor.</p>
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
          <h1 className="text-xl font-semibold">Conductores</h1>
          <p className="text-xs text-muted-foreground">Lista de conductores registrados en la empresa.</p>
        </div>
        <Button size="sm">
          <User className="mr-2 h-4 w-4" />
          Registrar conductor
        </Button>
      </div>

      {/* Desktop: tabla */}
      <div className="hidden overflow-x-auto rounded-xl border border-border bg-card md:block">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/60 text-xs text-muted-foreground">
            <tr>
              <th className="px-4 py-2 text-left font-medium">Nombre</th>
              <th className="px-4 py-2 text-left font-medium">Licencia</th>
              <th className="px-4 py-2 text-left font-medium">Categoría</th>
              <th className="px-4 py-2 text-left font-medium">Vencimiento</th>
              <th className="px-4 py-2 text-left font-medium">Teléfono</th>
              <th className="px-4 py-2 text-left font-medium">Estado</th>
              <th className="px-4 py-2 text-left font-medium">Vehículo asignado</th>
              <th className="px-4 py-2 text-right font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_DRIVERS.map((d) => (
              <tr key={d.id} className="border-t border-border/60 cursor-pointer hover:bg-muted/40" onClick={() => setSelectedDriver(d)}>
                <td className="px-4 py-2 font-medium">{d.fullName}</td>
                <td className="px-4 py-2">{d.licenseNumber}</td>
                <td className="px-4 py-2">{d.licenseCategory}</td>
                <td className="px-4 py-2">{formatDate(d.licenseExpiry)}</td>
                <td className="px-4 py-2">{d.phone}</td>
                <td className="px-4 py-2">
                  <StatusBadge status={d.status} />
                </td>
                <td className="px-4 py-2">{d.assignedVehicle ?? 'No asignado'}</td>
                <td className="px-4 py-2 text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDriver(d);
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
        {MOCK_DRIVERS.map((d) => (
          <button key={d.id} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-left shadow-sm hover:bg-muted/40" onClick={() => setSelectedDriver(d)}>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{d.fullName}</p>
                  <p className="text-[11px] text-muted-foreground">
                    Licencia {d.licenseNumber} · Cat. {d.licenseCategory}
                  </p>
                </div>
              </div>
              <StatusBadge status={d.status} />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
              <span>
                <span className="font-medium text-foreground">Tel.:</span> {d.phone}
              </span>
              <span>
                <span className="font-medium text-foreground">Vence:</span> {formatDate(d.licenseExpiry)}
              </span>
              <span className="col-span-2">
                <span className="font-medium text-foreground">Vehículo:</span> {d.assignedVehicle ?? 'No asignado'}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DriversPage;
