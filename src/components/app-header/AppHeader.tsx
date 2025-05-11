// styles
import classes from "./AppHeader.module.scss";
/* import { useSession } from "next-auth/react"; */
import Image from "next/image";
import { TrivaOptionMenu } from "triva-ui";
import getCurrentUser from "app/api/auth/currentUser";
import NavLink from "./NavLink";
import { cookies } from "next/headers";

const AppHeader: React.FC = async () => {
  //const { data: session }: any = useSession();
  const cks = await cookies();
  console.log(cks);

  const user: any = await getCurrentUser();

  console.log("AppHeader", user);

  return (
    <header className={classes.app_header__container}>
      <div className={classes.header__content}>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src="/app_logo.jpg"
            alt="Application logo"
            width={30}
            height={30}
            style={{ borderRadius: "50%" }}
          />
          <NavLink href="/">
            <h1>Artistry with payel</h1>
          </NavLink>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink href="/">Home</NavLink>
            </li>
            <li>
              <NavLink href="/services">Services</NavLink>
            </li>
            <li>
              {user?.name ? (
                <p>{user.name}</p>
              ) : (
                <NavLink href="/auth/sign-in">Log In</NavLink>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default AppHeader;
