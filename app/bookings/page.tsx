"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Booking {
  id: string;
  date: string;
  time: string;
  status: string;
  service: {
    name: string;
    priceInCents: number;
  };
  barbershop: {
    name: string;
  };
}

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (session?.user) {
      fetch("/api/bookings")
        .then((res) => res.json())
        .then((data) => {
          setBookings(data.bookings || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [session]);

  if (loading) {
    return (
      <div className="container mx-auto px-5 py-6">
        <h1 className="text-2xl font-bold">Agendamentos</h1>
        <p>Carregando...</p>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="container mx-auto px-5 py-6">
        <h1 className="text-2xl font-bold">Agendamentos</h1>
        <p>Faça login para ver seus agendamentos.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-5 py-6">
      <h1 className="text-2xl font-bold">Agendamentos</h1>
      {bookings.length === 0 ? (
        <p>Você não tem agendamentos.</p>
      ) : (
        <div className="mt-6 grid gap-4">
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {booking.service.name}
                  <Badge
                    variant={
                      booking.status === "CONFIRMED" ? "default" : "secondary"
                    }
                  >
                    {booking.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  {booking.barbershop.name}
                </p>
                <p className="text-sm">
                  {format(new Date(booking.date), "dd/MM/yyyy", {
                    locale: ptBR,
                  })}{" "}
                  às {booking.time}
                </p>
                <p className="mt-2 text-sm font-bold">
                  R$ {(booking.service.priceInCents / 100).toFixed(2)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
