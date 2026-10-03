/**
 * For Parents. The topics are the client's list from the brief, in their
 * order. Each one is a way to start, not a script: parents do not need
 * another pamphlet, they need a first sentence they can say in a car.
 */
export type Topic = { key: string; title: string; why: string; start: string[] };

export const topics: Topic[] = [
  {
    key: "consent",
    title: "Consent",
    why: "He will hear a version of this from friends and the internet first. Make sure yours gets there too.",
    start: [
      "“No is a complete sentence. If she says it, or stops saying yes, you stop. Even if you're halfway through.”",
      "“If she's drunk enough that you'd take her keys, she's too intoxicated for anything else.”",
    ],
  },
  {
    key: "respect",
    title: "Respect",
    why: "How he talks about girls when they are not in the room is the thing to listen for.",
    start: [
      "“How do the guys on the team talk about girls? What do you say when it goes too far?”",
      "“You don't have to like someone to be decent to them.”",
    ],
  },
  {
    key: "sex",
    title: "The talk",
    why: "Awkward for about ninety seconds. Then it is a conversation you have both had, and the next one is easier.",
    start: [
      "“I'm not going to ask what you're doing. I'm going to tell you what I expect, and then you can ask me anything.”",
      "“Both people should want it. Not go along with it. Want it. If you're not sure, that's your answer.”",
    ],
  },
  {
    key: "porn",
    title: "Pornography and expectations",
    why: "Most boys see it before anybody talks to them about it. It is teaching him something whether you bring it up or not.",
    start: [
      "“What you've seen online is a performance. Nobody is checking in, nobody is nervous, and nobody says no. Real people do all three.”",
      "“If it's shaping what you think a girl is supposed to do, say so. We can talk about it.”",
    ],
  },
  {
    key: "alcohol",
    title: "Alcohol",
    why: "The one thing in nearly every story. Not because drinking causes it, because it is the excuse.",
    start: [
      "“Being drunk is never a reason. Not for him, not for you.”",
      "“If a friend is too far gone, you get him home. If a girl is too far gone, you get her to her friends. You never leave either one with a stranger.”",
    ],
  },
  {
    key: "pressure",
    title: "Peer pressure",
    why: "He already knows right from wrong. What he does not know yet is what it costs to say so in front of his friends.",
    start: [
      "“Has there been a night where you knew something was wrong and didn't say anything? What stopped you?”",
      "“Being called a buzzkill is the cheapest thing that will ever happen to you.”",
    ],
  },
  {
    key: "relationships",
    title: "Relationships",
    why: "His first one will set the pattern. Checking a phone, keeping score and getting angry when she has plans are not love.",
    start: [
      "“How does she feel when she's around you? That's the whole question.”",
      "“Jealousy isn't a compliment. It's a warning.”",
    ],
  },
  {
    key: "masculinity",
    title: "Masculinity",
    why: "Boys get handed a list of what a man is not allowed to be. Most of what goes wrong later is on that list.",
    start: [
      "“Strength is what you use to protect people. Anything else is just being big.”",
      "“The guys you admire. What do they do when nobody's watching?”",
    ],
  },
  {
    key: "speaking-up",
    title: "Speaking up when friends cross boundaries",
    why: "This is the whole movement. Raising a boy who would not hurt anyone is half the job. The other half is a boy who stops his friend.",
    start: [
      "“You're going to be in the room when a friend does something he shouldn't. What are you going to do?”",
      "“If you ever have to ruin the party, I'll back you. Every time.”",
    ],
  },
];
