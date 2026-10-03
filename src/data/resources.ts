/**
 * The resources page. Every number and address below is read off the
 * organization's own site (checked October 1, 2026, by search listing, since
 * this sandbox cannot open the pages directly; re-check each one in a browser
 * before launch, it is on the README checklist). Nothing on this list is
 * invented, and nothing is here that could not be linked.
 */
export type Line = {
  name: string;
  who: string;
  how: { label: string; value: string; href?: string }[];
  url: string;
};

/** Emergency and crisis lines first, in the order a scared person needs them. */
export const lines: Line[] = [
  {
    name: "Emergency",
    who: "Someone is hurt, unconscious, in danger, or cannot be woken up.",
    how: [{ label: "Call", value: "911", href: "tel:911" }],
    url: "",
  },
  {
    name: "National Sexual Assault Hotline",
    who: "Run by RAINN. Free, confidential, 24/7, English and Spanish. For survivors and for the people trying to help one.",
    how: [
      { label: "Call", value: "800-656-4673", href: "tel:+18006564673" },
      { label: "Chat", value: "online.rainn.org", href: "https://online.rainn.org" },
    ],
    url: "https://rainn.org/help-and-healing/hotline/",
  },
  {
    name: "988 Suicide and Crisis Lifeline",
    who: "Free, confidential, 24/7. You do not have to be suicidal to call.",
    how: [
      { label: "Call or text", value: "988", href: "tel:988" },
      { label: "Chat", value: "988lifeline.org/chat", href: "https://988lifeline.org/chat/" },
    ],
    url: "https://988lifeline.org/",
  },
  {
    name: "Crisis Text Line",
    who: "Text with a trained crisis counselor. Free, 24/7.",
    how: [{ label: "Text", value: "HOME to 741741", href: "sms:741741?&body=HOME" }],
    url: "https://www.crisistextline.org/",
  },
  {
    name: "love is respect",
    who: "For ages 14 to 24, about dating and relationships. A program of the National Domestic Violence Hotline. 24/7.",
    how: [
      { label: "Call", value: "866-331-9474", href: "tel:+18663319474" },
      { label: "Text", value: "LOVEIS to 22522", href: "sms:22522?&body=LOVEIS" },
      { label: "Chat", value: "loveisrespect.org", href: "https://www.loveisrespect.org/" },
    ],
    url: "https://www.loveisrespect.org/",
  },
  {
    name: "National Domestic Violence Hotline",
    who: "Free, confidential, 24/7, in over 200 languages.",
    how: [
      { label: "Call", value: "800-799-7233", href: "tel:+18007997233" },
      { label: "Text", value: "START to 88788", href: "sms:88788?&body=START" },
      { label: "Chat", value: "thehotline.org", href: "https://www.thehotline.org/" },
    ],
    url: "https://www.thehotline.org/",
  },
];

export type Org = { name: string; what: string; url: string; forWho: string };

/** The organizations doing this work already, so nobody has to start from zero. */
export const orgs: Org[] = [
  {
    name: "It's On Us",
    forWho: "College students and campus chapters",
    what: "The largest nonprofit program for college sexual assault prevention, with student-led chapters on more than 500 campuses teaching consent, bystander intervention and survivor support. Started in 2014 out of the White House task force on campus sexual assault.",
    url: "https://itsonus.org/",
  },
  {
    name: "Coaching Boys Into Men",
    forWho: "Coaches and athletic programs",
    what: "A program from Futures Without Violence: twelve fifteen-minute talks a coach has with his team over a season about respect, relationships and stepping in. Evaluated in a CDC-funded study and recommended by the CDC. Coaches get a free card series.",
    url: "https://coachescorner.org/",
  },
  {
    name: "Green Dot",
    forWho: "Schools, colleges and communities",
    what: "The bystander program that gave everyone the three ways to step in: do it yourself, get somebody else, or break the moment. Run by Alteristic.",
    /* The root, not a Green Dot page: /services/green-dot/ answered 404 on
       2026-10-03 and the sandbox cannot open the site to find the new path.
       Re-point when someone finds it in a browser (README checklist). */
    url: "https://alteristic.org/",
  },
  {
    name: "A Call to Men",
    forWho: "Anyone raising, coaching or leading boys",
    what: "Training and material on healthy, respectful manhood. They coined the Man Box, the set of rules boys are handed about what a man is allowed to be, and they have worked with the NFL, the NBA, MLB and the military.",
    url: "https://www.acalltomen.org/",
  },
  {
    name: "MCSR (Men Can Stop Rape)",
    forWho: "Youth programs and trainers",
    what: "Since 1997, programs for young men built around healthy masculinity and the idea that strength is for protecting people.",
    url: "https://mcsr.org/",
  },
  {
    name: "RAINN",
    forWho: "Everyone",
    what: "The nation's largest anti-sexual-violence organization. Plain explanations of consent, the law state by state, and what to do after an assault.",
    url: "https://rainn.org/",
  },
];
