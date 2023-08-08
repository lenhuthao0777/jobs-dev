import React from "react";
import Logo from "./Logo";
import Avatar from "./Avatar";
import Link from "next/link";
import { LayoutDashboard, Home, Briefcase, Building2 } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SignOut from "./SignOut";
import { TUser } from "@/types/globalType";

const Nav = async () => {
  const session: { user: TUser } | null = await getServerSession(authOptions);

  const list = [
    {
      id: 1,
      title: "Home",
      path: "/",
      icon: <Home className="w-6 h-6" />,
    },
    {
      id: 2,
      title: "Jobs",
      path: "/jobs",
      icon: <Briefcase className="w-6 h-6" />,
    },
    {
      id: 3,
      title: "Company",
      path: "/company",
      icon: <Building2 className="w-6 h-6" />,
    },
    {
      id: 4,
      title: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="w-6 h-6" />,
    },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 w-[244px] h-full bg-white shadow z-10 max-lg:hidden">
      <div className="h-full flex flex-col p-5 justify-between">
        <div className="flex flex-col space-y-5">
          <div className="border-b py-5">
            <Logo />
          </div>

          <ul className="flex flex-col">
            {list.map((item, index) => (
              <>
                {item.path.includes("dashboard") ? (
                  <>
                    {session?.user.role.type !== 1 ? (
                      <li
                        key={item.id}
                        className="list-none py-4 px-1 font-semibold overflow-hidden rounded-md transition-all ease-in cursor-pointer hover:text-gray-500"
                      >
                        <Link href={item.path} className="flex items-center">
                          {item.icon}
                          <span className="ml-2">{item.title}</span>
                        </Link>
                      </li>
                    ) : null}
                  </>
                ) : (
                  <li
                    key={item.id}
                    className="list-none py-4 px-1 font-semibold overflow-hidden rounded-md transition-all ease-in cursor-pointer hover:text-gray-500"
                  >
                    <Link href={item.path} className="flex items-center">
                      {item.icon}
                      <span className="ml-2">{item.title}</span>
                    </Link>
                  </li>
                )}
              </>
            ))}
            <li className="flex items-center list-none py-4 px-1 font-semibold overflow-hidden rounded-md transition-all ease-in cursor-pointer hover:text-gray-500">
              {session?.user ? (
                <Link
                  href={`/profile/${session.user.id}`}
                  className="flex items-center"
                >
                  <Avatar />
                  <span className="text-sm font-semibold ml-2">Profile</span>
                </Link>
              ) : null}
            </li>
          </ul>
        </div>

        <SignOut session={session?.user} />
      </div>
    </div>
  );
};

export default Nav;
