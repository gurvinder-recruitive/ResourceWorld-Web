"use client";   
import React, { useState } from "react";
import Logo from "@/assets/logo.svg";
import LogoMobile from "@/assets/m-logo.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Bell, Building2, LogOut, Menu,  Sparkles, UserRound, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";    
const Header = () => {
  const [isloggedIn, setIsLoggedIn] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
 const router = useRouter();    
  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  }

  return (
    <section className="w-full bg-white z-12 top-0 left-0  fixed py-4 2xl:py-5 shadow-[0px_1px_2px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto px-4">
        <nav className="flex items-center">
          <div className="logo shrink-1">
            <Link href="/" className="hidden md:block">
              <Image src={Logo} alt="Logo" />
            </Link>
            <Link href="/" className="md:hidden">
              <Image src={LogoMobile} alt="Logo" />
            </Link>
          </div>
          <div className="grow-1 min-w-0 flex justify-end gap-6 items-center">
            <ul className={`flex gap-2.5 md:gap-8 p-4 md:p-0 text-base 2xl:text-lg  md:flex flex-col md:flex-row fixed bg-white w-full md:w-auto md:bg-transparent md:static top-[60px] left-0 md:top-unset md:left-unset ${showMenu ? "flex" : "hidden"} `}>
              <li>
                <Link
                  href="/search"
                  onClick={()=> setShowMenu(false)}
                  className="text-gray-600 hover:text-primary"
                >
                  Search
                </Link>
              </li>

              <li>
                <Link
                  href="javascript:void(0)"
                   onClick={()=> setShowMenu(false)}
                  className="text-gray-600 hover:text-primary"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                   onClick={()=> setShowMenu(false)}
                  className="text-gray-600 hover:text-primary"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                href="/" 
                onClick={()=> setShowMenu(false)}
                className="text-gray-600  hover:text-primary">
                  Blog
                </Link>
              </li>
              <li className="md:hidden">
                <Link href="/login" 
                onClick={()=> setShowMenu(false)}
                className="text-gray-600 hover:text-primary">
                  Login
                </Link>
              </li>
              <li className="md:hidden">
                <Link href="/signup" 
                onClick={()=> setShowMenu(false)}
                className="text-gray-600 hover:text-primary">
                  Sign Up
                </Link>
              </li>
            </ul>
            <div className="shrink-0 flex gap-2.5">
              {isloggedIn ? (
                <ul className="flex gap-2.5 items-center">
                  <li>
                    <Bell className="text-gray-600 hover:text-gray-400 cursor-pointer" />
                  </li>
                  <li>
                    
                    <DropdownMenu>
                <DropdownMenuTrigger asChild className="!w-10 !h-10 shrink-0">
                <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                        
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
              
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-70 sm:w-50" align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuItem><UserRound /> Profile  </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><Building2 /> Create Company Page  </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><Sparkles /> My Ratings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><LogOut /> Logout  </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
                  </li>
                </ul>
              ) : (
                <>
                  <div className="hidden md:flex gap-2.5">
                    <Button variant="blackOutline" onClick={() => router.push("/login")}>
                      Login
                    </Button>
                    <Button onClick={() => router.push("/signup")}>
                      Sign Up
                    </Button>
                  </div>
                </>
              )}
              <div className="md:hidden self-center">
                {showMenu ? <X className="text-gray-600 hover:text-gray-400 cursor-pointer" onClick={toggleMenu} /> : <Menu className="text-gray-600 hover:text-gray-400 cursor-pointer" onClick={toggleMenu} />}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Header;
