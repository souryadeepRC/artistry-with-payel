"use client";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TrivaModal } from "triva-ui";

const LoginModal = () => {
  const searchParams = useSearchParams();
  const errorValue = searchParams.get("Error");
  console.log({errorValue});

  const route = useRouter();
  const { data: session, status }: any = useSession();
  const [providers, setProviders] = useState<any>();
  const handleProviderClick = async (providerKey: string, url: string) => {
    console.log({ providerKey, url });
    if (providerKey === "credentials") {
      console.log("IF");
      await signIn(providerKey, {
        email: "deepe@mail.com",
        password: "Test@1234",
        redirect: true,
        callbackUrl: url,
      });
    } else {
      console.log("IF", url);
    }
  };
  useEffect(() => {
    getProviders()
      .then((providers) => {
        setProviders(providers);
      })
      .catch((err) => setProviders(err));
  }, []);

  console.log(providers);
  const onClose = () => {
    route.push("/");
  };
  return (
    <TrivaModal isOpen size="md" onClose={onClose} title="Sign In">
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            margin: "12px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input type="text" placeholder="email" />
          <input type="password" placeholder="Password" />
          <button onClick={() => handleProviderClick("credentials", "")}>
            Sign In
          </button>
        </div>
        <hr />
        <div
          style={{
            display: "flex",
            gap: "10px",
            margin: "12px",
            justifyContent: "center",
          }}
        >
          {Object.keys(providers || {})?.map((providerKey) => {
            if (providerKey === "credentials") return null;
            console.log(providers[providerKey]);

            return (
              <button
                key={providerKey}
                style={{ padding: "2px" }}
                onClick={async () => {
                  await signIn(providerKey);
                }}
              >
                {providers[providerKey].name}
              </button>
            );
          })}
        </div>
      </>
    </TrivaModal>
  );
};
export default LoginModal;
