"use client";

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { BarbershopServiceModel } from "@/generated/prisma/models";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BookingSheetProps {
  service: BarbershopServiceModel;
  barbershopId: string;
  barbershopName: string;
  children: React.ReactNode;
}

const BookingSheet = ({
  service,
  barbershopId,
  barbershopName,
  children,
}: BookingSheetProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [unavailableTimes, setUnavailableTimes] = useState<string[]>([]);
  const [sheetOpen, setSheetOpen] = useState(false);

  const generateTimes = () => {
    const times = [];
    for (let hour = 8; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 18 && minute === 30) break;
        const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
        times.push(time);
      }
    }
    return times;
  };

  const availableTimes = generateTimes().filter(
    (time) => !unavailableTimes.includes(time),
  );

  useEffect(() => {
    if (selectedDate) {
      fetch(
        `/api/bookings/available?date=${selectedDate.toISOString().split("T")[0]}&serviceId=${service.id}`,
      )
        .then((res) => res.json())
        .then((data) => setUnavailableTimes(data.unavailableTimes || []))
        .catch(() => setUnavailableTimes([]));
    } else {
      setUnavailableTimes([]);
    }
    setSelectedTime(undefined);
  }, [selectedDate, service.id]);

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime) return;

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: service.id,
          barbershopId,
          date: selectedDate.toISOString().split("T")[0],
          time: selectedTime,
        }),
      });

      if (res.ok) {
        toast.success("Reserva criada com sucesso!");
        setSheetOpen(false);
        setSelectedDate(undefined);
        setSelectedTime(undefined);
      } else {
        const error = await res.json();
        toast.error(error.error || "Erro ao criar reserva");
      }
    } catch {
      toast.error("Erro ao criar reserva");
    }
  };

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="min-h-dvh w-90 sm:w-100">
        <SheetHeader>
          <SheetTitle>Fazer Reserva</SheetTitle>
        </SheetHeader>
        <hr />
        <div className="mt-5">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            locale={ptBR}
            disabled={(date) => date < new Date()}
            className="px-5"
          />
          <hr className="my-5" />
          {selectedDate && (
            <div className="mt-6 px-5">
              <h3 className="mb-3 text-sm font-bold">Horários Disponíveis</h3>
              <div className="flex gap-2 overflow-x-auto pb-3">
                {availableTimes.map((time) => (
                  <Button
                    key={time}
                    className="rounded-full"
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}
          <hr className="my-6" />
          {selectedDate && selectedTime && (
            <div className="py-6 px-5">
              <Card>
                <CardHeader className="flex w-full justify-between">
                  <h4 className="font-semibold">{service.name}</h4>
                  <p className="mt-2 text-sm font-bold">
                    R$ {(service.priceInCents / 100).toFixed(2)}
                  </p>
                </CardHeader>
                <CardContent className="flex flex-col gap-5 p-3 py-0">
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground text-sm">
                      Data
                    </p>
                      <p className="text-muted-background ">
                        {format(selectedDate, "d 'de' MMMM", { locale: ptBR })}
                      </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground text-sm">
                      Horário
                    </p>
                      <p className="text-muted-background">{selectedTime}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground flex justify-between text-sm">
                      Barbearia
                    </p>
                      <p className="text-muted-background ">{barbershopName}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <div className="flex px-5">
            <Button
              className="mt-6 w-full rounded-full"
              disabled={!selectedDate || !selectedTime}
              onClick={handleConfirm}
            >
              Confirmar Reserva
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingSheet;
