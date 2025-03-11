"use server";
import { signIn } from "@/auth";

export async function authenticate(email: string, password: string) {
  try {
    const r = await signIn("credentials", {
      email: email,
      password: password,
      //   callbackUrl: "/",
      redirect: false,
    });
    return r;
  } catch (error: unknown) {
    const err = error as { name?: string; type?: string };
    if (err.name === "InvalidEmailPasswordError") {
      return { error: err.type, code: 1 };
    } else if (err.name === "InActiveAccountError") {
      return { error: err.type, code: 2 };
    } else {
      return { error: "Internal server error", code: 0 };
    }
  }
}
