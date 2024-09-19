import { setUser } from "./features/userSlice";
import { setIsAuthorized } from "./features/auth/authSlice";
import { ILoginResponse, IUser } from "@/types";
import { userDto } from "@/lib/dto";

export async function getUser(
  arg: any,
  { dispatch, queryFulfilled }: { dispatch: any; queryFulfilled: any }
) {
  try {
    const { data } = await queryFulfilled;

    await dispatch(setUser(filterUserInfo(data)));
    await dispatch(setIsAuthorized(!!data));
  } catch (err) {
    console.log(err);
    await dispatch(setIsAuthorized(false));
  }
}

const filterUserInfo = (data: ILoginResponse) => {
  if (!data.hasOwnProperty("token")) {
    return data;
  }

  return new userDto(data.user);
};
