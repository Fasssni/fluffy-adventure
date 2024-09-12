<<<<<<< HEAD
"use client";
import { useForm, SubmitHandler } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ILogin } from "@/types";
import { useLoginMutation } from "@/store/api/authApi";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/store";
import { setUser } from "@/store/features/userSlice";
import { setIsAuthorized } from "@/store/features/auth/authSlice";

export function LoginForm() {
  const { register, handleSubmit } = useForm<ILogin>();
  const [login, { isLoading, isError }] = useLoginMutation();

  const router = useRouter();

  async function onSubmit(data: ILogin) {
    const res = await login(data);
    if (!isError && res) {
      router.push("/dashboard");
    }
  }
=======
'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function LoginForm() {
>>>>>>> b6d8b87 (first commit)
  return (
    <>
      <Card className="w-[350px] mx-auto mt-8">
        <CardHeader>
          <CardTitle>Login</CardTitle>
<<<<<<< HEAD
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4 mb-10">
              <div className="flex flex-col space-y-1.5">
                <Input
                  {...register("email")}
                  id="email"
                  placeholder="Email"
                  type="email"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  {...register("password")}
                  id="password"
                  placeholder="Password"
                  type="password"
                />
              </div>
            </div>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button type="submit">Login</Button>
            </CardFooter>
          </form>
          {isLoading && <p>...loading</p>}
        </CardContent>
      </Card>
    </>
  );
}
=======
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input id="email" placeholder="Email" type="email" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input id="password" placeholder="Password" type="password" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Login</Button>
        </CardFooter>
      </Card>
    </>
  )
}
>>>>>>> b6d8b87 (first commit)
