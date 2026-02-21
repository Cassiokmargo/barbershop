import { PageSectionScroller } from "../ui/page";
import Link from "next/link";
import { Eye, Footprints, Scissors, Sparkles, User, Waves } from "lucide-react";

const QuickSearch = () => {
  return (
    <PageSectionScroller>
      <Link
        href="/barbershops?search=cabelo"
        className="border bg-card-background flex shrink-0 items-center justify-center gap-3 rounded-3xl px-4 py-2"
      >
        <Scissors className="size-4" />
        <span className="text-card-foreground text-sm font-medium">Cabelo</span>
      </Link>
      <Link
        href="/barbershops?search=cabelo"
        className="border bg-card-background flex shrink-0 items-center justify-center gap-3 rounded-3xl px-4 py-2"
      >
        <User className="size-4" />
        <span className="text-card-foreground text-sm font-medium">Barba</span>
      </Link>
      <Link
        href="/barbershops?search=cabelo"
        className="border bg-card-background flex shrink-0 items-center justify-center gap-3 rounded-3xl px-4 py-2"
      >
        <Sparkles className="size-4" />
        <span className="text-card-foreground text-sm font-medium">Acabamento</span>
      </Link>
      <Link
        href="/barbershops?search=cabelo"
        className="border bg-card-background flex shrink-0 items-center justify-center gap-3 rounded-3xl px-4 py-2"
      >
        <Eye className="size-4" />
        <span className="text-card-foreground text-sm font-medium">Sobrancelha</span>
      </Link>
      <Link
        href="/barbershops?search=cabelo"
        className="border bg-card-background flex shrink-0 items-center justify-center gap-3 rounded-3xl px-4 py-2"
      >
        <Footprints className="size-4" />
        <span className="text-card-foreground text-sm font-medium">Pezinho</span>
      </Link>
      <Link
        href="/barbershops?search=cabelo"
        className="border bg-card-background flex shrink-0 items-center justify-center gap-3 rounded-3xl px-4 py-2"
      >
        <Waves className="size-4" />
        <span className="text-card-foreground text-sm font-medium">Progressiva</span>
      </Link>
    </PageSectionScroller>
  );
};

export default QuickSearch;
