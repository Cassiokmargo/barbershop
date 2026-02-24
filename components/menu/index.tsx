"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MenuIcon,
  Scissors,
  User,
  Sparkles,
  Eye,
  Footprints,
  Wand2,
  CalendarCheck,
  House,
  X,
  LogIn,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const categories = [
  { name: "Cabelo", icon: Scissors, search: "cabelo" },
  { name: "Barba", icon: User, search: "barba" },
  { name: "Acabamento", icon: Sparkles, search: "acabamento" },
  { name: "Sobrancelha", icon: Eye, search: "sobrancelha" },
  { name: "Pezinho", icon: Footprints, search: "pezinho" },
  { name: "Progressiva", icon: Wand2, search: "progressiva" },
];

export function Menu() {
  const { data: session } = authClient.useSession()
  const handleLogin = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
    });
    if (error) {
      toast.error(error.message);
      return;
    }
  };

  const handleLogout = async () => {

  }
  const isLoggedIn  = !!session?.user

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <MenuIcon className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-90 sm:w-100">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <hr />
        <div className="flex flex-col gap-6">
          {/* User Section */}
          {isLoggedIn ? (
            <div className="flex items-center gap-3 p-5">
              <Avatar size="lg">
                <AvatarImage src={session.user.image ?? ""} alt={session.user.name} />
                <AvatarFallback>{session.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{session.user.name}</p>
                <p className="text-muted-foreground text-sm">{session.user.email}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between p-5">
              <span className="font-bold">Olá. Faça seu login!</span>
              <Button className="rounded-full text-xs" onClick={handleLogin}>
                Login <LogIn />
              </Button>
            </div>
          )}

          {/* Bookings */}
          <div className="space-y-3 px-2">
            <div className="grid-cols grid gap-3">
              <Link href="/">
                <Button variant="ghost" className="w-full justify-start">
                  <House />
                  Início
                </Button>
              </Link>
              <Link href="/bookings">
                <Button variant="ghost" className="w-full justify-start">
                  <CalendarCheck />
                  Agendamentos
                </Button>
              </Link>
            </div>
          </div>
          <hr />
          {/* Categories */}
          <div className="space-y-3 px-2">
            <div className="grid-cols grid gap-3">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={`/barbershops?search=${category.search}`}
                >
                  <Button variant="ghost" className="w-full justify-start">
                    <category.icon className="mr-2 h-4 w-4" />
                    {category.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
          <hr />
         {isLoggedIn && (
          <div className="pl-3">
            <Button variant="ghost" className="text-gray-500" onClick={handleLogout}>
              <LogOut />
              Sair da conta
            </Button>
          </div>
         )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
