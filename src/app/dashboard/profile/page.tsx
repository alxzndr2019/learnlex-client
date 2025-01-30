"use client";

import Image from "next/image";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-lg font-bold mb-6">{children}</h2>
);

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
          className="absolute -bottom-1 -right-1 bg-[#8811f0] text-white p-2 rounded-full hover:bg-[#7700d6] transition-colors"
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
        <h3 className="font-medium mb-1">Profile Picture</h3>
        <p className="text-sm text-gray-500">
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
          <h3 className="font-medium mb-1">Email Address</h3>
          <p className="text-sm text-gray-500">alex@example.com</p>
        </div>
        <button className="text-[#8811f0] hover:text-[#7700d6] text-sm font-medium">
          Change
        </button>
      </div>
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="marketing"
          className="rounded text-[#8811f0]"
        />
        <label htmlFor="marketing" className="text-sm text-gray-600">
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
        <label htmlFor="current" className="block text-sm font-medium mb-1">
          Current Password
        </label>
        <input
          type="password"
          id="current"
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#8811f0] focus:ring-2 focus:ring-[#8811f0]/20 outline-none transition-colors"
        />
      </div>
      <div>
        <label htmlFor="new" className="block text-sm font-medium mb-1">
          New Password
        </label>
        <input
          type="password"
          id="new"
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#8811f0] focus:ring-2 focus:ring-[#8811f0]/20 outline-none transition-colors"
        />
      </div>
      <button className="bg-[#8811f0] text-white px-4 py-2 rounded-lg hover:bg-[#7700d6] transition-colors">
        Update Password
      </button>
    </form>
  );
};

const CurrentPlanCard = () => {
  return (
    <div className="bg-[#8811f0]/5 p-6 rounded-xl">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg mb-1">Pro Plan</h3>
          <p className="text-gray-600">$29/month</p>
        </div>
        <span className="px-3 py-1 bg-[#8811f0] text-white text-sm rounded-full">
          Current
        </span>
      </div>
      <ul className="space-y-2 mb-6">
        <li className="flex items-center gap-2 text-sm text-gray-600">
          <svg
            className="w-5 h-5 text-green-500"
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
        <li className="flex items-center gap-2 text-sm text-gray-600">
          <svg
            className="w-5 h-5 text-green-500"
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
      <button className="text-[#8811f0] hover:text-[#7700d6] text-sm font-medium">
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
          <div className="bg-gray-100 p-2 rounded">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
          </div>
          <div>
            <p className="font-medium">•••• 4242</p>
            <p className="text-sm text-gray-500">Expires 12/24</p>
          </div>
        </div>
        <button className="text-red-500 hover:text-red-600 text-sm font-medium">
          Remove
        </button>
      </div>
      <button className="text-[#8811f0] hover:text-[#7700d6] text-sm font-medium">
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
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {transaction.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {transaction.amount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {transaction.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
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
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-8">Account Settings</h1>

        {/* Account Settings */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <SectionTitle>Profile</SectionTitle>
          <div className="space-y-8">
            <AvatarUpload />
            <EmailPreferences />
            <PasswordUpdate />
          </div>
        </div>

        {/* Billing Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <SectionTitle>Billing</SectionTitle>
          <div className="space-y-8">
            <CurrentPlanCard />
            <div>
              <h3 className="font-medium mb-4">Payment Methods</h3>
              <PaymentMethods />
            </div>
            <div>
              <h3 className="font-medium mb-4">Purchase History</h3>
              <PurchaseHistory />
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <SectionTitle>Danger Zone</SectionTitle>
          <div className="border border-red-200 rounded-lg p-6 bg-red-50">
            <h3 className="text-red-600 font-medium mb-2">Delete Account</h3>
            <p className="text-sm text-red-600 mb-4">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
