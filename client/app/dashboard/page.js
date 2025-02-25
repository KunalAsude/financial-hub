"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Sidebar } from "@/components/Sidebar";
import { StatCard } from "@/components/StatCard";
import { BarChart } from "@/components/BarChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, CreditCard, Activity } from 'lucide-react';

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

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
      <div className="min-h-screen">
        <Sidebar />
        <div className="p-4 sm:ml-4 lg:ml-0">
          <header className="mb-6 mt-16 lg:mt-0">
            <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
          </header>
          <main>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard title="Total Revenue" value="$45,231.89" icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} />
              <StatCard title="Active Users" value="2,345" icon={<Users className="h-4 w-4 text-muted-foreground" />} />
              <StatCard title="New Accounts" value="+12.5%" icon={<CreditCard className="h-4 w-4 text-muted-foreground" />} />
              <StatCard title="Transactions" value="1,234" icon={<Activity className="h-4 w-4 text-muted-foreground" />} />
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 bg-blue-500">
                <CardHeader>
                  <CardTitle>Monthly Revenue</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <BarChart />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Add a table or list of recent transactions here */}
                </CardContent>
              </Card>
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={handleLogout} variant="destructive">
                Logout
              </Button>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
