import type { Metadata } from "next";
import Link from "next/link";
import { PREORDER } from "@/data/shop";

export const metadata: Metadata = {
  title: "Order placed",
  description: "Your Ruin the Party order went through.",
  robots: { index: false },
};

/** Where Stripe Checkout returns a paid customer. */
export default function OrderThanksPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-start justify-center px-4 py-24 sm:px-6">
      <p className="kicker text-teal">Order placed</p>
      <h1 className="display mt-3 text-5xl text-white">You&rsquo;re in.</h1>
      <p className="mt-4 text-lg text-chalk">
        {PREORDER.on
          ? `Thank you for being part of the first run. We have emailed you a receipt. Your order ships ${PREORDER.ships}, and we will email you again the day it goes out.`
          : "Thank you. We have emailed you a receipt, and we will email you again the day your order goes out."}
      </p>
      <p className="mt-3 text-chalk">Wear it somewhere it will get asked about.</p>
      <Link href="/be-the-guy" className="btn btn-teal mt-8">
        Now read this
      </Link>
    </div>
  );
}
