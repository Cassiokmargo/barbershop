import { prisma } from "@/lib/prisma";

export const getBarbershops = async () => {
  try {
    const barbershops = await prisma.barbershop.findMany();
    return barbershops;
  } catch (error) {
    console.error("Error fetching barbershops: ", error);
    return [];
  }
};

export const getPopularBarbershops = async () => {
  try {
    const popularBarbershops = await prisma.barbershop.findMany({
      orderBy: {
        name: "asc"
      },
    });
    return popularBarbershops;
  } catch (error) {
    console.error("Error fetching popularBarbershops: ", error);
    return [];
  }
};
