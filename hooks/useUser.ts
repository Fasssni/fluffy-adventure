import { useAppSelector } from "@/store/store";
import { IUser } from "@/types";

export const useUser = (): IUser => {
  const user = useAppSelector((state) => state.user);

  return user;
};
