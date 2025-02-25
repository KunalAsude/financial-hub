"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import BankCard from "@/components/BankCard"; // Assuming you have a BankCard component

const MyBanks = ({ user, banks }) => {
  return (
    <div className="my-banks">
      <div className="header flex items-center justify-between">
        <h2 className="header-2">My Banks</h2>
        <Link href="/add-bank" className="flex gap-2 items-center">
          <Image
            src="/icons/plus.svg"
            alt="Add Bank"
            width={20}
            height={20}
          />
          <h2 className="text-14 font-semibold text-gray-600">Add Bank</h2>
        </Link>
      </div>

      {banks?.length > 0 ? (
        <div className="relative flex flex-col items-center justify-center gap-5">
          {/* Display the first bank account */}
          <div className="relative z-10 w-full">
            <BankCard
              key={banks[0].$id}
              account={banks[0]}
              userName={`${user.firstName} ${user.lastName}`}
              showBalance={true}
            />
          </div>

          {/* Display the second bank account (if it exists) */}
          {banks[1] && (
            <div className="absolute right-0 top-8 z-0 w-[90%]">
              <BankCard
                key={banks[1].$id}
                account={banks[1]}
                userName={`${user.firstName} ${user.lastName}`}
                showBalance={true}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <Image
            src="/icons/bank.svg"
            alt="No Banks"
            width={100}
            height={100}
          />
          <p className="text-16 font-semibold text-gray-600">
            You have no bank accounts linked.
          </p>
          <Link
            href="/add-bank"
            className="text-14 font-semibold text-blue-600 hover:text-blue-700"
          >
            Add a Bank Account
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyBanks;