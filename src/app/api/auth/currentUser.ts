import { cache } from "react";
import { getUserFromSession } from "./session";
import { cookies } from "next/headers";

const getCurrentUser = cache(async () => {
  return await getUserFromSession(await cookies());
});
export default getCurrentUser;
