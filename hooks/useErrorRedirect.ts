import { useEffect } from "react";

import { useAppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import { setIsAuthorized } from "@/store/features/auth/authSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export const useErrorRedirect = (
  error: FetchBaseQueryError | SerializedError | undefined
) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    if (!error) {
      return;
    }
    if (error?.status === 403) {
      dispatch(setIsAuthorized(false));
      router.push("/login");
    }
  }, [error]);
};
