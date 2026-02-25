import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookings = await prisma.booking.findMany({
      where: {
        userId: session.user.id,
        status: { not: "CANCELLED" },
      },
      include: {
        service: true,
        barbershop: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      serviceId,
      barbershopId,
      date,
      time,
    }: {
      serviceId: string;
      barbershopId: string;
      date: string;
      time: string;
    } = await request.json();

    if (!serviceId || !barbershopId || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Check for existing booking at same time
    const existingBooking = await prisma.booking.findFirst({
      where: {
        serviceId,
        date: new Date(date),
        time,
        status: { not: "CANCELLED" },
      },
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: "Time slot already booked" },
        { status: 409 },
      );
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId: session.user.id,
        serviceId,
        barbershopId,
        date: new Date(date),
        time,
      },
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
