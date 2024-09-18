"server only";

import { IUser } from "@/types";
import { BarChartHorizontalIcon } from "lucide-react";

export const checkIfAuthorized = async (): Promise<boolean> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_BACKEND}/apiv/checkauth`,
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch authorization data");
    }

    const data: IUser = await response.json();

    return !!data;
  } catch (err) {
    console.error("Authorization check failed:", err);
    return false;
  }
};
