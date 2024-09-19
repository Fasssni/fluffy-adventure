import { useAppSelector } from "@/store/store";

export const useAuth = (): boolean => {
  return useAppSelector((state) => state.auth).isAuthorized;
};
