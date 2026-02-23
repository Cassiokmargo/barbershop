import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import type { BarbershopServiceModel } from "@/generated/prisma/models";
import { Button } from "../ui/button";

interface ServiceItemProps {
  service: BarbershopServiceModel;
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <Card className="py-0">
      <CardContent className="p-3">
        <div className="flex gap-3">
          <Image
            src={service.imageUrl}
            alt={service.name}
            width={120}
            height={120}
            className="h-32 w-32 shrink-0 rounded-xl object-cover"
          />
          <div className="flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-bold">{service.name}</h3>
              <p className="text-muted-foreground text-sm">
                {service.description}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <span className="w-fit font-bold">
                R$ {(service.priceInCents / 100).toFixed(2)}
              </span>
              {/* Reserve Button */}
              <Button className="w-fit rounded-full">Reservar</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
