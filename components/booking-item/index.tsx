import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

const BookingItem = () => {
  return (
    <Card className="flex h-full w-full cursor-pointer flex-row items-center justify-between p-0">
      {/*ESQUERDA*/}
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Badge>Confirmado</Badge>
        <div className="flex flex-col gap-2">
          <p className="font-bold">Corte de Cabelo</p>
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
                <AvatarImage src="https://utfs.io/f/45331760-899c-4b4b-910e-e00babb6ed81-16q.png" />
            </Avatar>
            <p className="text-sm font-medium">Barbearia do João</p>
          </div>
        </div>
      </div>

      {/* DIREITA */}
      <div className="flex h-full flex-col items-center justify-center border-l py-3 w-26.5">
        <p className="text-xs capitalize">Fevereiro</p>
        <p className="text-2xl">20</p>
        <p className="text-xs">09:30</p>
      </div>
    </Card>
  );
};

export default BookingItem;
