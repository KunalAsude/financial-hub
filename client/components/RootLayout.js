"use client";

import Sidebar from "@/components/Sidebar";
import MobileNavbar from "@/components/MobileNavbar";
import Image from "next/image";

const RootLayout = ({ children }) => {
  const loggedIn = { firstName: "Kunal", lastName: "Asude", email: "Kunal@gmail.com" };

  return (
    <div className="flex flex-col md:flex-row min-h-screen overflow-hidden">
      {/* Sidebar (Hidden on Mobile, Visible on Larger Screens) */}
      <div className="hidden md:block">
        <Sidebar user={loggedIn} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Navbar (Visible on Small Screens) */}
        <div className="md:hidden p-4 flex items-center justify-between">
          
        {/* Mobile Navigation Section */}
      <div className="w-full root-layout md:hidden">
        <Image
          src="/icons/logo2.svg"
          alt="logo"
          width={40}
          height={40}
        />
        <h1 className="text-xl font-semibold">Financial Hub</h1>
        <div>
        <MobileNavbar user={loggedIn} />
        </div>
      </div>
          
        </div>

        {/* Page-Specific Content */}
        <main className="overflow-y-auto remove-scrollbar">{children}</main>
      </div>
    </div>
  );
};

export default RootLayout;
