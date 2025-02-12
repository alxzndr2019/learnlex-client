"use client";

import Image from "next/image";
import Section from "../_components/Section";

const AvatarUpload = () => {
  return (
    <div className="flex items-center gap-6">
      <div className="relative">
        <Image
          src="/useravater.jpg"
          alt="Profile"
          width={80}
          height={80}
          className="rounded-full"
        />
        <button
          className="absolute -bottom-1 -right-1 bg-[#ff6b00] text-white p-2 rounded-full hover:bg-[#ff8533] transition-colors"
          aria-label="Change avatar"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
      </div>
      <div>
        <h3 className="font-medium text-white mb-1">Profile Picture</h3>
        <p className="text-sm text-white/70">
          JPG, GIF or PNG. Max size of 800K
        </p>
      </div>
    </div>
  );
};

const EmailPreferences = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-white mb-1">Email Address</h3>
          <p className="text-sm text-white/70">alex@example.com</p>
        </div>
        <button className="text-[#ff6b00] hover:text-[#ff8533] text-sm font-medium">
          Change
        </button>
      </div>
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="marketing"
          className="rounded text-[#ff6b00] bg-black/30 border-white/10"
        />
        <label htmlFor="marketing" className="text-sm text-white/70">
          Receive updates about new features and learning resources
        </label>
      </div>
    </div>
  );
};

const PasswordUpdate = () => {
  return (
    <form className="space-y-4">
      <div>
        <label
          htmlFor="current"
          className="block text-sm font-medium text-white/70 mb-1"
        >
          Current Password
        </label>
        <input
          type="password"
          id="current"
          className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#ff6b00] focus:border-transparent"
        />
      </div>
      <div>
        <label
          htmlFor="new"
          className="block text-sm font-medium text-white/70 mb-1"
        >
          New Password
        </label>
        <input
          type="password"
          id="new"
          className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#ff6b00] focus:border-transparent"
        />
      </div>
      <button className="bg-[#ff6b00] text-white px-4 py-2 rounded-lg hover:bg-[#ff8533] transition-colors">
        Update Password
      </button>
    </form>
  );
};

const CurrentPlanCard = () => {
  return (
    <div className="bg-[#ff6b00]/10 p-6 rounded-xl border border-[#ff6b00]/20">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg text-white mb-1">Pro Plan</h3>
          <p className="text-white/70">$29/month</p>
        </div>
        <span className="px-3 py-1 bg-[#ff6b00] text-white text-sm rounded-full">
          Current
        </span>
      </div>
      <ul className="space-y-2 mb-6">
        <li className="flex items-center gap-2 text-sm text-white/70">
          <svg
            className="w-5 h-5 text-[#ff6b00]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          Unlimited video conversions
        </li>
        <li className="flex items-center gap-2 text-sm text-white/70">
          <svg
            className="w-5 h-5 text-[#ff6b00]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          Priority support
        </li>
      </ul>
      <button className="text-[#ff6b00] hover:text-[#ff8533] text-sm font-medium">
        Change Plan
      </button>
    </div>
  );
};

const PaymentMethods = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-black/30 p-2 rounded">
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-white">•••• 4242</p>
            <p className="text-sm text-white/70">Expires 12/24</p>
          </div>
        </div>
        <button className="text-red-400 hover:text-red-300 text-sm font-medium">
          Remove
        </button>
      </div>
      <button className="text-[#ff6b00] hover:text-[#ff8533] text-sm font-medium">
        + Add new payment method
      </button>
    </div>
  );
};

const PurchaseHistory = () => {
  const transactions = [
    {
      date: "Mar 15, 2024",
      amount: "$29.00",
      description: "Pro Plan - Monthly",
      status: "Completed",
    },
    {
      date: "Feb 15, 2024",
      amount: "$29.00",
      description: "Pro Plan - Monthly",
      status: "Completed",
    },
  ];

  return (
    <div className="overflow-hidden rounded-lg border border-white/10">
      <table className="w-full">
        <thead className="bg-black/30">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {transactions.map((transaction, index) => (
            <tr key={index} className="bg-black/20">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">
                {transaction.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                {transaction.amount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">
                {transaction.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-400/20 text-green-400">
                  {transaction.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function Profile() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-white mb-8">Account Settings</h1>

      {/* Account Settings */}
      <Section title="Profile">
        <div className="space-y-8">
          <AvatarUpload />
          <EmailPreferences />
          <PasswordUpdate />
        </div>
      </Section>

      {/* Billing Section */}
      <Section title="Billing">
        <div className="space-y-8">
          <CurrentPlanCard />
          <div>
            <h3 className="font-medium text-white mb-4">Payment Methods</h3>
            <PaymentMethods />
          </div>
          <div>
            <h3 className="font-medium text-white mb-4">Purchase History</h3>
            <PurchaseHistory />
          </div>
        </div>
      </Section>

      {/* Danger Zone */}
      <Section title="Danger Zone">
        <div className="border border-red-500/20 rounded-lg p-6 bg-red-500/5">
          <h3 className="text-red-400 font-medium mb-2">Delete Account</h3>
          <p className="text-sm text-red-400/70 mb-4">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
            Delete Account
          </button>
        </div>
      </Section>
    </div>
  );
}
