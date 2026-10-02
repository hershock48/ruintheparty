import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Message sent",
  description: "Your message to Ruin the Party was sent.",
  robots: { index: false },
};

/** Landing page for the no-JS form path. The JS path confirms inline instead. */
export default function ThanksPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-start justify-center px-4 py-24 sm:px-6">
      <h1 className="display text-5xl text-white">Got it.</h1>
      <p className="mt-4 text-lg text-chalk">
        We read every one, and you will hear back from a person. Need something sooner? Email{" "}
        <a href={`mailto:${site.email}`} className="link">
          {site.email}
        </a>
        .
      </p>
      <Link href="/" className="btn btn-teal mt-8">
        Back to the start
      </Link>
    </div>
  );
}
