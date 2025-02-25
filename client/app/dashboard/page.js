"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSideBar from "@/components/RightSideBar";
import Sidebar from "@/components/Sidebar";
import MobileNavbar from "@/components/MobileNavbar";
import Image from "next/image";

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const loggedIn = { firstName: "Kunal", lastName: "Asude", email: "Kunal@gmail.com" };

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);

    if (!token) {
      router.replace("/login");
    } else {
      setUser({ name: "User" }); // Placeholder user data
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  return (
    <ProtectedRoute>
      {/* Mobile Navigation Section */}
      <div className="root-layout md:hidden">
        <Image
          src="/icons/logo2.svg"
          alt="logo"
          width={40}
          height={40}
        />
        <div>
          <MobileNavbar user={loggedIn} />
        </div>
      </div>

      {/* Main Dashboard Layout */}
      <section className="home flex">
        {/* Sidebar (Visible on larger screens) */}
        <Sidebar user={loggedIn} />

        {/* Main Content */}
        <div className="home-content flex-1">
          <header className="home-header">
            <HeaderBox
              type="greeting"
              title="Welcome"
              user={loggedIn?.firstName || "Guest"}
              subtext="Secure and reliable banking system for seamless financial management and transactions. Experience advanced security, efficient processing, and trustworthy financial solutions."
            />
            <TotalBalanceBox
              accounts={[]}
              totalCurrentBalance={12500.45}
              totalBanks={1}
            />
          </header>
          Recent Transactions
        </div>

        {/* Right Sidebar */}
        <RightSideBar
          user={loggedIn}
          transactions={[]}
          banks={[{ currentBalance: 1000 }, { currentBalance: 2000 }]}
        />
      </section>
    </ProtectedRoute>
  );
};

export default Dashboard;