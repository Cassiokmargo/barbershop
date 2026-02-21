import Header from "@/components/header";
import Image from "next/image";
import banner from "@/public/banner.png";
import BookingItem from "@/components/booking-item";
import { getBarbershops, getPopularBarbershops } from "@/data/barbershops";
import { BarbershopItem } from "@/components/barbershop-item";
import {
  PageContainer,
  PageSectionContent,
  PageSectionScroller,
  PageSectionTitle,
} from "@/components/ui/page";
import QuickSearch from "@/components/quick-search";

export default async function Home() {
  const barbershops = await getBarbershops();
  const popularBarbershops = await getPopularBarbershops();

  return (
    <div>
      <Header />
      <PageContainer>
        <QuickSearch />
        <Image
          src={banner}
          alt="Agende nos melhores"
          sizes="100vw"
          className="h-auto w-full"
        />

        <PageSectionContent>
          <PageSectionTitle>Agendamentos</PageSectionTitle>
          <BookingItem />
        </PageSectionContent>

        <PageSectionContent>
          <PageSectionTitle>Barbearias</PageSectionTitle>
          <PageSectionScroller>
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </PageSectionScroller>
        </PageSectionContent>

        <PageSectionContent>
          <PageSectionTitle>Barbearias Populares</PageSectionTitle>
          <PageSectionScroller>
            {popularBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </PageSectionScroller>
        </PageSectionContent>
      </PageContainer>
    </div>
  );
}
