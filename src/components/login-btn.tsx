"use client";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToggle } from "triva-ui";
import LoginModal from "./LoginModal";
const ProviderModal = ({ provider }: any) => {
  const { providerKey, url } = provider;
  const handleProviderClick = async () => {
    console.log({ providerKey, url });

    if (providerKey === "credentials") {
      await signIn(providerKey, {
        username: "deep@mail.com",
        password: "Test@1234" /* ,
        callbackUrl: url, */,
      });
    } else {
      await signIn(
        providerKey /* , {
        callbackUrl: url,
      } */
      );
    }
  };
  return (
    <div>
      {providerKey}

      <button onClick={handleProviderClick}>sign In</button>
    </div>
  );
};
export default function Authentication() {
  const route = useRouter();
  const param = useParams();
  const { data: session, status }: any = useSession();
  console.log({ session, status });
  const [showAuth, toggleAuth] = useToggle(false);
  const [providerKey, setProviderKey] = useState<any>();
  const [providers, setProviders] = useState<any>();

  useEffect(() => {
    getProviders()
      .then((providers) => {
        setProviders(providers);
      })
      .catch((err) => setProviders(err));
  }, []);

  console.log(providers);

  return (
    <>
      Not signed in <br />
      {!showAuth && <button onClick={toggleAuth}>Sign in</button>}
      {showAuth && providers && (
        <LoginModal providers={providers} onClose={toggleAuth} />
      )}
      {showAuth && <button onClick={toggleAuth}>Close</button>}
      <button onClick={() => signIn()}>Next Auth</button>
      {providerKey?.url && <ProviderModal provider={providerKey} />}
    </>
  );
}
