'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Droplet, Truck, MapPin, CalendarClock, ChevronLeft } from 'lucide-react';

type FuelType = 'Diesel' | 'Gasolina' | 'GNV' | 'GLP';

type FuelRecord = {
  id: number;
  date: string; // ISO o string
  vehiclePlate: string;
  routeCode?: string;
  fuelType: FuelType;
  liters: number;
  pricePerLiter: number;
  odometerKm: number;
  stationName: string;
  city?: string;
};

const MOCK_FUEL: FuelRecord[] = [
  {
    id: 1,
    date: '2025-12-09T08:30:00',
    vehiclePlate: 'ABC-123',
    routeCode: 'R-001',
    fuelType: 'Diesel',
    liters: 150,
    pricePerLiter: 4.5,
    odometerKm: 120_000,
    stationName: 'Repsol Norte',
    city: 'Lima',
  },
  {
    id: 2,
    date: '2025-12-10T11:15:00',
    vehiclePlate: 'XYZ-789',
    routeCode: 'R-002',
    fuelType: 'Gasolina',
    liters: 40,
    pricePerLiter: 4.8,
    odometerKm: 44_800,
    stationName: 'Primax Sur',
    city: 'Ica',
  },
  {
    id: 3,
    date: '2025-12-10T18:50:00',
    vehiclePlate: 'DEF-456',
    routeCode: undefined,
    fuelType: 'Diesel',
    liters: 200,
    pricePerLiter: 4.4,
    odometerKm: 210_500,
    stationName: 'PetroPerú Vía Panamericana',
    city: 'Chincha',
  },
];

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

const formatMoney = (amount: number) =>
  `S/ ${amount.toLocaleString('es-PE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const formatKm = (value: number) => value.toLocaleString('es-PE', { maximumFractionDigits: 0 }) + ' km';

const FuelPage = () => {
  const [selectedRecord, setSelectedRecord] = useState<FuelRecord | null>(null);

  // Vista detalle
  if (selectedRecord) {
    const total = selectedRecord.liters * selectedRecord.pricePerLiter;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setSelectedRecord(null)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold">Abastecimiento · {selectedRecord.vehiclePlate}</h1>
              <p className="text-xs text-muted-foreground">
                {formatDateTime(selectedRecord.date)} · {selectedRecord.fuelType}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Detalle de carga */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Droplet className="h-4 w-4" />
              </div>
              <h2 className="text-sm font-semibold">Detalle de carga</h2>
            </div>
            <dl className="space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between gap-2">
                <dt className="font-medium text-foreground">Combustible</dt>
                <dd>{selectedRecord.fuelType}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="font-medium text-foreground">Litros</dt>
                <dd>{selectedRecord.liters.toFixed(2)} L</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="font-medium text-foreground">Precio por litro</dt>
                <dd>{formatMoney(selectedRecord.pricePerLiter)}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="font-medium text-foreground">Total</dt>
                <dd className="font-semibold text-foreground">{formatMoney(total)}</dd>
              </div>
            </dl>
          </div>

          {/* Vehículo / odómetro */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Truck className="h-4 w-4" />
              </div>
              <h2 className="text-sm font-semibold">Vehículo</h2>
            </div>
            <dl className="space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between gap-2">
                <dt className="font-medium text-foreground">Placa</dt>
                <dd>{selectedRecord.vehiclePlate}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="font-medium text-foreground">Odómetro al cargar</dt>
                <dd>{formatKm(selectedRecord.odometerKm)}</dd>
              </div>
              {selectedRecord.routeCode && (
                <div className="flex justify-between gap-2">
                  <dt className="font-medium text-foreground">Ruta</dt>
                  <dd>{selectedRecord.routeCode}</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Estación */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </div>
              <h2 className="text-sm font-semibold">Estación</h2>
            </div>
            <p className="text-sm font-semibold">{selectedRecord.stationName}</p>
            <p className="mt-1 text-xs text-muted-foreground">{selectedRecord.city ?? 'Ubicación no registrada'}</p>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <CalendarClock className="h-3 w-3" />
              {formatDateTime(selectedRecord.date)}
            </p>
          </div>
        </div>

        {/* Placeholders para análisis futuros */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-dashed border-border bg-muted/40 p-4 text-xs text-muted-foreground">
            <p className="font-medium text-foreground">Relación con viaje / ruta</p>
            <p className="mt-1">Aquí podrás vincular este abastecimiento a un viaje específico y calcular el consumo real por trayecto.</p>
          </div>
          <div className="rounded-xl border border-dashed border-border bg-muted/40 p-4 text-xs text-muted-foreground">
            <p className="font-medium text-foreground">Alertas de consumo y presupuesto</p>
            <p className="mt-1">Muestra alertas automáticas cuando el costo por km o los litros por ruta se salgan del rango esperado.</p>
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
          <h1 className="text-xl font-semibold">Abastecimiento de combustible</h1>
          <p className="text-xs text-muted-foreground">Registros de cargas de combustible por vehículo y ruta.</p>
        </div>
        <Button size="sm">
          <Droplet className="mr-2 h-4 w-4" />
          Registrar abastecimiento
        </Button>
      </div>

      {/* Desktop: tabla */}
      <div className="hidden overflow-x-auto rounded-xl border border-border bg-card md:block">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/60 text-xs text-muted-foreground">
            <tr>
              <th className="px-4 py-2 text-left font-medium">Fecha</th>
              <th className="px-4 py-2 text-left font-medium">Vehículo</th>
              <th className="px-4 py-2 text-left font-medium">Ruta</th>
              <th className="px-4 py-2 text-left font-medium">Combustible</th>
              <th className="px-4 py-2 text-left font-medium">Litros</th>
              <th className="px-4 py-2 text-left font-medium">Precio/L</th>
              <th className="px-4 py-2 text-left font-medium">Total</th>
              <th className="px-4 py-2 text-left font-medium">Odómetro</th>
              <th className="px-4 py-2 text-left font-medium">Estación</th>
              <th className="px-4 py-2 text-right font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_FUEL.map((f) => {
              const total = f.liters * f.pricePerLiter;
              return (
                <tr key={f.id} className="border-t border-border/60 cursor-pointer hover:bg-muted/40" onClick={() => setSelectedRecord(f)}>
                  <td className="px-4 py-2">{formatDateTime(f.date)}</td>
                  <td className="px-4 py-2 font-medium">{f.vehiclePlate}</td>
                  <td className="px-4 py-2">{f.routeCode ?? '—'}</td>
                  <td className="px-4 py-2">{f.fuelType}</td>
                  <td className="px-4 py-2">{f.liters.toFixed(2)} L</td>
                  <td className="px-4 py-2">{formatMoney(f.pricePerLiter)}</td>
                  <td className="px-4 py-2">{formatMoney(total)}</td>
                  <td className="px-4 py-2">{formatKm(f.odometerKm)}</td>
                  <td className="px-4 py-2">{f.stationName}</td>
                  <td className="px-4 py-2 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRecord(f);
                      }}
                    >
                      Ver detalle
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile: cards */}
      <div className="space-y-3 md:hidden">
        {MOCK_FUEL.map((f) => {
          const total = f.liters * f.pricePerLiter;
          return (
            <button key={f.id} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-left shadow-sm hover:bg-muted/40" onClick={() => setSelectedRecord(f)}>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Droplet className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{f.vehiclePlate}</p>
                    <p className="text-[11px] text-muted-foreground">{formatDateTime(f.date)}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                <span>
                  <span className="font-medium text-foreground">Comb.:</span> {f.fuelType}
                </span>
                <span>
                  <span className="font-medium text-foreground">Litros:</span> {f.liters.toFixed(2)} L
                </span>
                <span>
                  <span className="font-medium text-foreground">Total:</span> {formatMoney(total)}
                </span>
                <span>
                  <span className="font-medium text-foreground">Odóm.:</span> {formatKm(f.odometerKm)}
                </span>
                <span className="col-span-2">
                  <span className="font-medium text-foreground">Estación:</span> {f.stationName}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FuelPage;
