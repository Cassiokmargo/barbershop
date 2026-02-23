import type { BarbershopModel } from "@/generated/prisma/models";
import Image from "next/image";
import { PageSectionTitle } from "../ui/page";

interface BarbershopDetailsProps {
  barbershop: BarbershopModel;
}

const BarbershopDetails = ({ barbershop }: BarbershopDetailsProps) => {
  return (
    <div className="relative space-y-3">
      <h1 className="flex items-center gap-2 text-xl font-bold">
        <Image
          className="h-10 rounded-full"
          src={barbershop.imageUrl}
          width={40}
          height={40}
          alt={barbershop.name}
        />
        {barbershop.name}
      </h1>
      <p className="text-muted-foreground mb-8 text-sm">{barbershop.address}</p>
      <hr className="-ml-5 w-97.5"/>
      <div className="my-6">
        <PageSectionTitle>Sobre nós</PageSectionTitle>
        <p className="text-sm">{barbershop.description}</p>
      </div>
       <hr className="-ml-5 w-97.5"/>
    </div>
  );
};

export default BarbershopDetails;
