// hooks/useCheckSession.ts
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { isAccessTokenExpired } from "@/lib/jwtDecode";

export const useCheckSession = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.access_token && isAccessTokenExpired(session.access_token)) {
      toast.warning("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      signOut({ callbackUrl: "/account/login" });
    }
  }, [session]);
};
