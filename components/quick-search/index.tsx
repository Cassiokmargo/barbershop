import { PageSectionScroller } from "../ui/page";
import Link from "next/link";
import { Eye, Footprints, Scissors, SearchIcon, Sparkles, User, Waves } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const QuickSearch = () => {
  return (
    <>
    <div className="flex items-center gap-2">
      <Input className="border-border rounded-full" placeholder="Pesquisar" />
      <Button className="rounded-full" size="icon">
        <SearchIcon />
      </Button>

    </div>
      <PageSectionScroller>
        <Link
          href="/barbershops?search=cabelo"
          className="bg-card-background flex shrink-0 items-center justify-center gap-3 rounded-3xl border px-4 py-2"
        >
          <Scissors className="size-4" />
          <span className="text-card-foreground text-sm font-medium">
            Cabelo
          </span>
        </Link>
        <Link
          href="/barbershops?search=cabelo"
          className="bg-card-background flex shrink-0 items-center justify-center gap-3 rounded-3xl border px-4 py-2"
        >
          <User className="size-4" />
          <span className="text-card-foreground text-sm font-medium">
            Barba
          </span>
        </Link>
        <Link
          href="/barbershops?search=cabelo"
          className="bg-card-background flex shrink-0 items-center justify-center gap-3 rounded-3xl border px-4 py-2"
        >
          <Sparkles className="size-4" />
          <span className="text-card-foreground text-sm font-medium">
            Acabamento
          </span>
        </Link>
        <Link
          href="/barbershops?search=cabelo"
          className="bg-card-background flex shrink-0 items-center justify-center gap-3 rounded-3xl border px-4 py-2"
        >
          <Eye className="size-4" />
          <span className="text-card-foreground text-sm font-medium">
            Sobrancelha
          </span>
        </Link>
        <Link
          href="/barbershops?search=cabelo"
          className="bg-card-background flex shrink-0 items-center justify-center gap-3 rounded-3xl border px-4 py-2"
        >
          <Footprints className="size-4" />
          <span className="text-card-foreground text-sm font-medium">
            Pezinho
          </span>
        </Link>
        <Link
          href="/barbershops?search=cabelo"
          className="bg-card-background flex shrink-0 items-center justify-center gap-3 rounded-3xl border px-4 py-2"
        >
          <Waves className="size-4" />
          <span className="text-card-foreground text-sm font-medium">
            Progressiva
          </span>
        </Link>
      </PageSectionScroller>
    </>
  );
};

export default QuickSearch;
