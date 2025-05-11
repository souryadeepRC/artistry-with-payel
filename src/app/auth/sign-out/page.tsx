"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TrivaModal } from "triva-ui";

export default function test() {
  const route = useRouter();
  return (
    <TrivaModal
      size="sm"
      title="Sign Out"
      isOpen={true}
      onClose={() => route.back()}
    >
      <div>
        <h2>Do you really want to sign out?</h2>
        <button
          onClick={() =>
            signOut({
              redirect: true,
              callbackUrl: "/",
            })
          }
        >
          Yes
        </button>
      </div>
    </TrivaModal>
  );
}
