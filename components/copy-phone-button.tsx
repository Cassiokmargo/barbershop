"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CopyPhoneButtonProps {
  phone: string;
}

const CopyPhoneButton = ({ phone }: CopyPhoneButtonProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(phone);
    toast.success("Telefone copiado!");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="cursor-pointer rounded-full font-bold"
      onClick={handleCopy}
    >
      Copiar
    </Button>
  );
};

export default CopyPhoneButton;
