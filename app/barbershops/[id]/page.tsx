import { getBarbershopById } from "@/data/barbershops";
import { Button } from "@/components/ui/button";
import {
  PageContainer,
  PageSectionContent,
  PageSectionTitle,
} from "@/components/ui/page";
import ServiceItem from "@/components/service-item";
import BackButton from "@/components/back-button";
import BarbershopDetails from "@/components/barbershop-details";
import Image from "next/image";
import CopyPhoneButton from "@/components/copy-phone-button";
import { Smartphone } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

const BarbershopPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const barbershop = await getBarbershopById(id);

  if (!barbershop) {
    return <div>Barbearia não encontrada</div>;
  }

  return (
    <div>
      {/* Banner */}
      <div className="relative h-64 w-full">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
      </div>

      <PageContainer>
        {/* Barbershop Info */}
        <BarbershopDetails barbershop={barbershop} />

        {/* Services */}
        <div className="mt-6">
          <PageSectionTitle>Serviços</PageSectionTitle>
          <PageSectionContent>
            <div className="mt-3 grid grid-cols-1 gap-3">
              {barbershop.services.map((service) => (
                <ServiceItem key={service.id} service={service} />
              ))}
            </div>
          </PageSectionContent>
        </div>
              <hr className="-ml-5 w-97.5"/>
        <PageSectionTitle>Contato</PageSectionTitle>
        <div className="flex items-center gap-2">
          <Smartphone />
          {barbershop.phones?.[0]}

          <div className="ml-29">
            <CopyPhoneButton phone={barbershop.phones?.[0] || ""} />
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default BarbershopPage;
