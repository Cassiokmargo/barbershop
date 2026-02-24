import Image from "next/image";
import { Menu } from "../menu";

const Header = () => {
  return (
    <header className="bg-background flex items-center justify-between px-5 py-6">
      <Image src="/logo.svg" alt="Logo" width={91} height={24} />
      <Menu />
    </header>
  );
};

export default Header;
