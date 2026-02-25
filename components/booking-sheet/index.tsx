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
import { formatCurrency } from "@/lib/utils";
import { createBooking } from "@/actions/create-booking";
import { useAction } from "next-safe-action/hooks";
import { Loader2 } from "lucide-react";

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
  const { executeAsync: executeCreateBooking, isPending: isCreatingBooking } =
    useAction(createBooking);

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

  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime) {
      return;
    }

    const splittedTime = selectedTime.split(":");
    const hours = Number(splittedTime[0]);
    const minutes = Number(splittedTime[1]);
    const date = new Date(selectedDate);
    date.setHours(hours, minutes);

    const result = await executeCreateBooking({
      date,
      serviceId: service.id,
    });
    if (result.validationErrors) {
      return toast.error(result.validationErrors._errors?.[0]);
    }
    if (result.serverError) {
      return toast.error(
        "Erro ao criar agendamento! Por favor tente novamente.",
      );
    }
    toast.success("Agendamento criado com sucesso!");
    setSelectedDate(undefined);
    setSelectedTime(undefined);
    setSheetOpen(false);
  };

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="w-90 sm:w-100">
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
            <div>
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
              <hr className="my-6" />
            </div>
          )}
          {selectedDate && selectedTime && (
            <div className="px-5 py-6">
              <Card>
                <CardHeader className="flex w-full justify-between">
                  <h4 className="font-semibold">{service.name}</h4>
                  <p className="mt-2 text-sm font-bold">
                    {formatCurrency(service.priceInCents)}
                  </p>
                </CardHeader>
                <CardContent className="flex flex-col gap-5 p-3 py-0">
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground text-sm">Data</p>
                    <p className="text-muted-background">
                      {format(selectedDate, "d 'de' MMMM", { locale: ptBR })}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground text-sm">Horário</p>
                    <p className="text-muted-background">{selectedTime}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground flex justify-between text-sm">
                      Barbearia
                    </p>
                    <p className="text-muted-background">{barbershopName}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <div className="flex px-5">
            <Button
              className="w-full rounded-full"
              disabled={!selectedDate || !selectedTime || isCreatingBooking}
              onClick={handleConfirmBooking}
            >
              {isCreatingBooking ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Confirmar Reserva"
              )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingSheet;
