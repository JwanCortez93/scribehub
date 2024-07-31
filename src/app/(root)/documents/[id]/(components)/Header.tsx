import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const Header = ({ children }: HeaderProps) => {
  return (
    <div className="header">
      <Link href="/" className="md:flex-1 my-2">
        <Image
          src="/logo/png/logo-no-slogan.png"
          alt="Logo"
          width={120}
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
