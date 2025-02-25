import { formatAmount } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BankCard = ({ account, userName, showBalance }) => {
  return (
    <div className="flex flex-col">
      <Link href="/" className="bank-card">
        <div className="bank-card_content">
          <div>
            <h1 className="text-16 font-semibold text-white">
              {account.name || userName}
            </h1>
            <p className="font-ibm-plex-serif font-black text-white">
              {account.currentBalance}
            </p>
          </div>
          <article className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="text-12 font-semibold text-white">{userName}</h1>
              <h2 className="text-12 font-semibold text-white">●● / ●●</h2>
            </div>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●● 
              <span className="text-16">1234</span>
            </p>
          </article>
        </div>
        <div className="bank-card_icon">
          <Image
            src="/icons/Paypass.svg"
            width={20}
            height={24}
            alt="pay"
          />
          <Image
            src="/icons/mastercard.svg"
            width={45}
            height={32}
            alt="mastercard"
          />
        </div>
        <Image 
          src="/icons/lines.svg"
          width={316}
          height={190}
          alt="link"
          className='absolute top-0 left-0'
        />
      </Link>
      {/* COPY */}
      {showBalance && (
        <div className="bank-card_balance">
          <p className="text-12 font-semibold text-white">
            Balance: {formatAmount(account.currentBalance)}
          </p>
        </div>
      )}
    </div>
  );
};

export default BankCard;
