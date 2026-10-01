import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Get involved",
  description: "Bring Ruin the Party to your team, your school, your fraternity or your house. Or just ask a question.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero kicker="Get involved" title="Bring it to your people." lead="A team, a school, a fraternity, a youth program, a house. Tell us who you are and what you need, and a person will answer." />
      <section className="bg-black">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20">
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
