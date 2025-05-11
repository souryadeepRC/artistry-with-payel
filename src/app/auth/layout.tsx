import classes from "./auth.module.scss";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={classes.auth__layout}>{children}</div>;
}
