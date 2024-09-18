// lib/withAuth.tsx
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from "next";
import { IUser } from "@/types";

// Type for the component with server-side props
interface WithAuthProps {
  user: IUser;
}

// Higher-order function that takes a page component and returns a new component with authentication logic
export default function withAuth<T>(
  PageComponent: NextPage<T & WithAuthProps>
): NextPage<T> {
  const AuthenticatedPage: NextPage<T> = (props) => {
    return <PageComponent {...(props as T & WithAuthProps)} />;
  };
  console.log("it's worked");

  // Wrap getServerSideProps to include authentication
  AuthenticatedPage.getServerSideProps = async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<T & WithAuthProps>> => {
    const token = context.req.cookies.jwt;

    if (!token) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    // Call to Node.js backend to check authorization
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_BACKEND}/apiv/checkauth`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    const user = await response.json();

    return {
      props: { user },
    };
  };
}
