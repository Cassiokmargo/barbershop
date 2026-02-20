import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div>
        <Button>BOTAO</Button>
        <Input placeholder="Campo teste" />
      </div>
    </div>
  );
}
