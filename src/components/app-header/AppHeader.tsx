"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
// styles
import classes from "./AppHeader.module.scss";

const AppHeader: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className={classes.app_header__container}>
      <h1>Artistry with payel</h1>
      <nav>
        <ul>
          <li>
            <Link className={pathname === "/" ? classes.active : ""} href="/">
              Home
            </Link>
          </li>
          <li>
            <Link
              className={pathname === "/services" ? classes.active : ""}
              href="/services"
            >
              Services
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default AppHeader;
