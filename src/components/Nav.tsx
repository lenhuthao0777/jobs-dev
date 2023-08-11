import React from "react";
import Logo from "./Logo";
import Avatar from "./Avatar";
import Link from "next/link";
import { LayoutDashboard, Home, Briefcase } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SignOut from "./SignOut";
import { TUser } from "@/types/globalType";

const Nav = async () => {
  const session: { user: TUser } | null = await getServerSession(authOptions);

  const url = session?.user.avatar.url;

  const list = [
    {
      id: 1,
      title: "Home",
      path: "/",
      icon: <Home width={24} height={24} />,
    },
    {
      id: 2,
      title: "Jobs",
      path: "/jobs",
      icon: <Briefcase width={24} height={24} />,
    },
    {
      id: 3,
      title: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard width={24} height={24} />,
    },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 w-[244px] h-full max-lg:w-full max-lg:h-20 bg-white shadow z-10">
      <div className="h-full flex flex-col p-5 justify-between max-lg:px-5 max-lg:flex-row max-lg:items-center">
        <div className="flex flex-col space-y-5 max-lg:space-y-0">
          <div className="border-b py-5 max-lg:p-0 max-lg:border-0">
            <Logo />
          </div>

          <ul className="flex flex-col max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:w-full max-lg:h-20 max-lg:flex-row max-lg:items-center max-lg:justify-evenly max-lg:shadow-inner max-lg:bg-white">
            {list.map((item, index) => (
              <>
                {item.path.includes("dashboard") ? (
                  <>
                    {session?.user?.role === 2 ? (
                      <li
                        key={item.id}
                        className="list-none py-4 px-1 font-semibold overflow-hidden rounded-md transition-all ease-in cursor-pointer hover:text-gray-500"
                      >
                        <Link href={item.path} className="flex items-center">
                          {item.icon}
                          <span className="ml-2 text-sm max-lg:hidden">{item.title}</span>
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
                      <span className="ml-2 text-sm max-lg:hidden">{item.title}</span>
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
                  <Avatar src={url} />
                  <span className="text-sm font-semibold ml-2 max-lg:hidden">Profile</span>
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
