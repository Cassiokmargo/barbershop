"use server"; // don't forget to add this!

import { z } from "zod";
import { returnValidationErrors } from "next-safe-action";
import { actionClient } from "@/lib/action-client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

// This schema is used to validate input from client.
const inputSchema = z.object({
  serviceId: z.uuid(),
  date: z.date(),
});

export const createBooking = actionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput: { serviceId, date } }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    // Usuário esta logado?
    if (!session?.user) {
      returnValidationErrors(inputSchema, {
        _errors: ["Não autorizado. Faça o login para continuar"],
      });
    }

    const service = await prisma.barbershopService.findUnique({
      where: {
        id: serviceId,
      },
    });
    // O serviço existe?
    if (!service) {
      returnValidationErrors(inputSchema, {
        _errors: ["Serviço não encontrado. Por favor selecione outro serviço."],
      });
    }

    // JA POSSUI AGENDAMENTO NESSE HORARIO?
    const existingBooking = await prisma.booking.findFirst({
      where: {
        barbershopId: service.barbershopId,
        date,
      },
    });
    if (existingBooking) {
      returnValidationErrors(inputSchema, {
        _errors: ["Data e hora selecionadas já estão agendadas."],
      });
    }

    const booking = await prisma.booking.create({
      data: {
        serviceId,
        date: date.toISOString(),
        userId: session.user.id,
        barbershopId: service.barbershopId,
      },
    });
    return booking;
  });
