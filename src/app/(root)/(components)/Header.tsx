import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const Header = ({ children, className }: HeaderProps) => {
  return (
    <div className={cn("header", className)}>
      <Link href="/" className="md:flex-1 my-2">
        <Image
          src="/logo/png/logo-no-slogan.png"
          alt="Logo"
          width={100}
          height={32}
          className="hidden md:block "
        />
        <Image
          src="/logo/png/logo-only-icon.png"
          alt="Logo"
          width={75}
          height={32}
          className="md:hidden"
        />
      </Link>
      {children}
    </div>
  );
};

export default Header;
