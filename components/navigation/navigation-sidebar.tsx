import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";

import { NavigationAction } from "./navigation-action";
import { NavigationItem } from "./navigation-item";


import {
  ChevronsLeft,
  MenuIcon,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Trash,
  MessageCircle,
  Video,
  CalendarDays,
  Github,
  Boxes,
  Home,
  GithubIcon
} from "lucide-react";

export const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  return (
    <div
      className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3"
    >
      <NavigationAction />
      <Separator
        className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto"
      />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>

      <div className="pb-1 mt-auto flex items-center flex-col gap-y-0">

      <a href="" target="_blank">
          <div className="flex flex-row scale-75 gap-x-1">
            <div>
              <PlusCircle></PlusCircle>
            </div>
            <div className="">
              New Document
            </div>
          </div>
        </a>

        <a href="" target="_blank">
          <div className="flex flex-row scale-75 gap-x-1">
            <div>
              <MessageCircle></MessageCircle>
            </div>
            <div className="">
              Start a new chat
            </div>
          </div>
        </a>

        <a href="" target="_blank">
          <div className="flex flex-row scale-75 gap-x-1">
            <div>
              <Video></Video>
            </div>
            <div className="">
              Start a new video call
            </div>
          </div>
        </a>

        <a href="" target="_blank">
          <div className="flex flex-row scale-75 gap-x-1">
            <div>
              <CalendarDays></CalendarDays>
            </div>
            <div className="">
              Your Calendar
            </div>
          </div>
        </a>

        <a href="https://dotpackages.netlify.app/" target="_blank">
          <div className="flex flex-row scale-75 gap-x-1">
            <div>
              <Boxes></Boxes>
            </div>
            <div className="">
              dotPackages Package Manager
            </div>
          </div>
        </a>

        <a href="https://dotread.netlify.app/" target="_blank">
          <div className="flex flex-row scale-75 gap-x-1">
            <div>
              <GithubIcon></GithubIcon>
            </div>
            <div className="">
              dotRead Code Explorer
            </div>
          </div>
        </a>
      </div>

      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]"
            }
          }}
        />
      </div>
    </div>
  )
}