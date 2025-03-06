"use client"

import Link from "next/link"
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/data";


export default function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="h-full">
      <ul className="flex flex-col justify-between h-full">
        <li className="flex flex-col gap-7">
          {navLinks.map((link) => (
            <Link
              href={link.to}
              key={link.to}
              className={`flex items-center gap-3 hover:bg-blue-600/90 hover:text-white rounded-md py-2 px-4 transition-all ease-in-out duration-150 ${pathname === link.to ? "border border-l-4 border-blue-600/90" : ""}`}
            >
              <link.icon size={25} />
              <div className="text-[14px] flex justify-between items-center w-full">
                {link.name}
              </div>
            </Link>
          ))}
        </li>

        <div className="flex flex-col gap-7">
          <Link
            href="/settings"
            className={`flex items-center gap-3 hover:bg-blue-600/90 hover:text-white rounded-md py-2 px-4 transition-all ease-in-out duration-150 ${pathname === "/settings" ? "border border-l-4 border-blue-600/90" : ""}`}
          >
            <HiOutlineCog6Tooth size={25} />
            <div className="text-[14px] flex justify-between items-center w-full">
              Settings
            </div>
          </Link>

          {/* <Button buttonText="Project" /> */}
        </div>

      </ul>
    </nav>
  );
}
