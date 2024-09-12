'use client'

import { Nav } from '@/components/nav'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function Page() {
  return (
    <>
      <Nav />
      <div className="mt-8">
        <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Message Box</CardTitle>
            <CardDescription>Send a message to the team</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Input id="message" placeholder="Type your message here..." />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Send Message</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}