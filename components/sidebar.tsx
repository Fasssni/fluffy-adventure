import React from "react";
import { Button } from "./ui/button";
import {
  Book,
  Bot,
  Code2,
  LifeBuoy,
  SquareTerminal,
  SquareUser,
  Triangle,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { usePathname, useRouter } from "next/navigation";

type MenuType = {
  id: number;
  title: string;
  icon: () => React.ReactNode;
  to: string;
};

export default function SideBar() {
  const router = useRouter();
  const path = usePathname();
  const menuArr: MenuType[] = [
    {
      id: 1,
      title: "Inbox",
      icon: () => <SquareTerminal className="size-5" />,
      to: "/inbox",
    },
    {
      id: 2,
      title: "Models",
      icon: () => <Bot className="size-5" />,
      to: "/dashboard",
    },
    {
      id: 3,
      title: "API",
      icon: () => <Code2 className="size-5" />,
      to: "/dashboard",
    },
    {
      id: 4,
      title: "Documentation",
      icon: () => <Book className="size-5" />,
      to: "/dashboard",
    },
  ];
  return (
    <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
      <div className="border-b p-2">
        <Button variant="outline" size="icon" aria-label="Home">
          <Triangle className="size-5 fill-foreground" />
        </Button>
      </div>
      <nav className="grid gap-1 p-2">
        <TooltipProvider>
          {menuArr.map(({ id, title, icon, to }) => (
            <Tooltip key={id}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-lg bg-muted ${
                    path.startsWith(to) && "bg-black text-white"
                  }`}
                  aria-label={title}
                  onClick={() => router.push(to)}
                >
                  {icon()}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                {title}
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
      <nav className="mt-auto grid gap-1 p-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mt-auto rounded-lg"
                aria-label="Help"
              >
                <LifeBuoy className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Help
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mt-auto rounded-lg"
                aria-label="Account"
              >
                <SquareUser className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Account
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
}
