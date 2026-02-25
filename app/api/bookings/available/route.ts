import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const serviceId = searchParams.get("serviceId");

    if (!date || !serviceId) {
      return NextResponse.json(
        { error: "Missing date or serviceId" },
        { status: 400 },
      );
    }

    const bookings = await prisma.booking.findMany({
      where: {
        serviceId,
        date: new Date(date),
        status: { not: "CANCELLED" },
      },
      select: {
        time: true,
      },
    });

    const unavailableTimes = bookings.map((b) => b.time);

    return NextResponse.json({ unavailableTimes });
  } catch (error) {
    console.error("Error fetching available times:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
