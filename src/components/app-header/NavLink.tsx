"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = (props: any) => {
  const { href, children } = props;
  const pathname = usePathname();
  return (
    <Link className={pathname === href ? "active" : ""} href={href}>
      {children}
    </Link>
  );
};
export default NavLink;
