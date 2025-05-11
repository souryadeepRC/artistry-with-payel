"use client";
import { signIn } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function test() {
  const searchParams = useSearchParams();
  const providerKey = searchParams.get("providerKey");

  console.log({ searchParams, providerKey });
  useEffect(() => {
    if (!providerKey) return;
    const fetchData = async () => {
      try {
        await signIn(providerKey);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return <>Signning with {providerKey}</>;
}
