"use client";

import React, { useState } from "react";
import { Truck, User, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

type Vehicle = {
  id: number;
  plate: string;
  type: string;
  status: "En Ruta" | "Disponible" | "Mantenimiento";
  fuel: string;
  year: number;
  odometer: number;
  efficiency: string;
  driver?: string;
};

const MOCK_VEHICLES: Vehicle[] = [
  {
    id: 1,
    plate: "ABC-123",
    type: "Camión 5T",
    status: "En Ruta",
    fuel: "Diesel",
    year: 2020,
    odometer: 120_500,
    efficiency: "8.5 km/L",
    driver: "Juan Pérez",
  },
  {
    id: 2,
    plate: "XYZ-789",
    type: "Furgoneta",
    status: "Mantenimiento",
    fuel: "Gasolina",
    year: 2022,
    odometer: 45_000,
    efficiency: "10.2 km/L",
    driver: "—",
  },
  {
    id: 3,
    plate: "DEF-456",
    type: "Trailer",
    status: "Disponible",
    fuel: "Diesel",
    year: 2019,
    odometer: 210_000,
    efficiency: "6.1 km/L",
    driver: "No asignado",
  },
];

const StatusBadge = ({ status }: { status: Vehicle["status"] }) => {
  const variants: Record<Vehicle["status"], string> = {
    "En Ruta": "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-200",
    Disponible:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200",
    Mantenimiento:
      "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${variants[status]}`}
    >
      {status}
    </span>
  );
};

const formatKm = (value: number) =>
  value.toLocaleString("es-PE", { maximumFractionDigits: 0 }) + " km";

const VehiclesPage = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // Vista detalle
  if (selectedVehicle) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setSelectedVehicle(null)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold">
                Vehículo {selectedVehicle.plate}
              </h1>
              <p className="text-xs text-muted-foreground">
                Detalle y estado del vehículo
              </p>
            </div>
          </div>
          <StatusBadge status={selectedVehicle.status} />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Info básica */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Truck className="h-4 w-4" />
              </div>
              <h2 className="text-sm font-semibold">Información del vehículo</h2>
            </div>
            <dl className="space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between gap-2">
                <dt className="font-medium text-foreground">Placa</dt>
                <dd>{selectedVehicle.plate}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="font-medium text-foreground">Tipo</dt>
                <dd>{selectedVehicle.type}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="font-medium text-foreground">Año</dt>
                <dd>{selectedVehicle.year}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="font-medium text-foreground">Combustible</dt>
                <dd>{selectedVehicle.fuel}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="font-medium text-foreground">Rendimiento ref.</dt>
                <dd>{selectedVehicle.efficiency}</dd>
              </div>
            </dl>
          </div>

          {/* Odómetro */}
          <div className="rounded-xl border border-border bg-card p-4">
            <h2 className="mb-3 text-sm font-semibold">Kilometraje</h2>
            <p className="text-2xl font-semibold">
              {formatKm(selectedVehicle.odometer)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Kilometraje actual registrado.
            </p>
          </div>

          {/* Conductor */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
              <h2 className="text-sm font-semibold">Conductor asignado</h2>
            </div>
            <p className="text-sm font-medium">
              {selectedVehicle.driver ?? "No asignado"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Información básica del conductor responsable de este vehículo.
            </p>
          </div>
        </div>

        {/* Bloques placeholder para futuro */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-dashed border-border bg-muted/40 p-4 text-xs text-muted-foreground">
            <p className="font-medium text-foreground">
              Historial de mantenimiento
            </p>
            <p className="mt-1">
              Aquí podrás mostrar las órdenes de servicio, fechas de
              mantenimiento y talleres.
            </p>
          </div>
          <div className="rounded-xl border border-dashed border-border bg-muted/40 p-4 text-xs text-muted-foreground">
            <p className="font-medium text-foreground">
              Abastecimientos de combustible
            </p>
            <p className="mt-1">
              Resumen de cargas de combustible, litros y costo por viaje o por
              periodo.
            </p>
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
          <h1 className="text-xl font-semibold">Vehículos</h1>
          <p className="text-xs text-muted-foreground">
            Listado de vehículos registrados en la flota.
          </p>
        </div>
        <Button size="sm">
          <Truck className="mr-2 h-4 w-4" />
          Registrar vehículo
        </Button>
      </div>

      {/* Tabla responsive */}
      <div className="w-full">
        {/* Desktop */}
        <div className="hidden overflow-x-auto rounded-xl border border-border bg-card md:block">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/60 text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Placa</th>
                <th className="px-4 py-2 text-left font-medium">Tipo</th>
                <th className="px-4 py-2 text-left font-medium">Estado</th>
                <th className="px-4 py-2 text-left font-medium">Combustible</th>
                <th className="px-4 py-2 text-left font-medium">Año</th>
                <th className="px-4 py-2 text-left font-medium">Odómetro</th>
                <th className="px-4 py-2 text-left font-medium">
                  Rendimiento
                </th>
                <th className="px-4 py-2 text-right font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_VEHICLES.map((v) => (
                <tr
                  key={v.id}
                  className="border-t border-border/60 hover:bg-muted/40 cursor-pointer"
                  onClick={() => setSelectedVehicle(v)}
                >
                  <td className="px-4 py-2 font-semibold">{v.plate}</td>
                  <td className="px-4 py-2">{v.type}</td>
                  <td className="px-4 py-2">
                    <StatusBadge status={v.status} />
                  </td>
                  <td className="px-4 py-2">{v.fuel}</td>
                  <td className="px-4 py-2">{v.year}</td>
                  <td className="px-4 py-2">{formatKm(v.odometer)}</td>
                  <td className="px-4 py-2">{v.efficiency}</td>
                  <td className="px-4 py-2 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVehicle(v);
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
          {MOCK_VEHICLES.map((v) => (
            <button
              key={v.id}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-left shadow-sm hover:bg-muted/40"
              onClick={() => setSelectedVehicle(v)}
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Truck className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{v.plate}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {v.type}
                    </p>
                  </div>
                </div>
                <StatusBadge status={v.status} />
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                <span>
                  <span className="font-medium text-foreground">Comb:</span>{" "}
                  {v.fuel}
                </span>
                <span>
                  <span className="font-medium text-foreground">Año:</span>{" "}
                  {v.year}
                </span>
                <span>
                  <span className="font-medium text-foreground">Odóm.:</span>{" "}
                  {formatKm(v.odometer)}
                </span>
                <span>
                  <span className="font-medium text-foreground">Rend.:</span>{" "}
                  {v.efficiency}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehiclesPage;
