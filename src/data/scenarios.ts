/**
 * Be the Guy: the scenarios. Each one is a situation a young man actually
 * ends up in, then what he can say, what he can do, and when to hand it to
 * somebody with authority. The three ways in (do it yourself, pull somebody
 * else in, break the moment) are the Green Dot program's direct, delegate
 * and distract, credited on the page; the words are ours.
 *
 * Nothing here is legal or medical advice and the page says so. Every
 * scenario ends with the same two lines about emergencies and aftercare so
 * nobody reads one in isolation and misses them.
 */
export type Scenario = {
  slug: string;
  title: string;
  situation: string;
  say: string[];
  do: string[];
  escalate: string;
  after: string;
};

export const scenarios: Scenario[] = [
  {
    slug: "can-barely-stand",
    title: "Your friend is trying to take home someone who can barely stand.",
    situation:
      "She is slurring, leaning on him, eyes half closed. He is saying she is fine. Nobody else is doing anything.",
    say: [
      "“No. She's done for the night. Let's get her to her friends.”",
      "“I'm not letting this happen, man. Not tonight.”",
      "To her, not him: “Hey, who did you come with? Let's find them.”",
    ],
    do: [
      "Get between them. Physically. You do not have to be aggressive, you have to be there.",
      "Find her friends, her roommate, anyone she arrived with, and hand her to them in person.",
      "Take his keys or his attention. A drunk man with a mission needs a new mission: food, the walk home, the game on his phone.",
      "Do not leave until she is with people who will get her home.",
    ],
    escalate:
      "If she cannot stay awake, is vomiting and not responding, or you cannot wake her, that is a medical emergency. Call 911. Alcohol poisoning kills people who were “just drunk.”",
    after:
      "He will be angry. That is fine. The friend who stops you from doing the worst thing you will ever do is the only friend worth having. Say that to him tomorrow if he brings it up.",
  },
  {
    slug: "she-said-no",
    title: "Your friend keeps pushing after she said no.",
    situation:
      "She said no, or not tonight, or she pulled away. He is still at it. Joking, pleading, following her from room to room.",
    say: [
      "“She said no. That's the end of it.”",
      "“Bro. Come on. Walk with me.”",
      "To her: “You good? Want me to stick around?”",
    ],
    do: [
      "Pull him away from her, not her away from the party. She was not the problem.",
      "Give him something else to do and somewhere else to be. Then stay with him so he does not drift back.",
      "Check on her once he is gone. Do not make it a thing. One question is enough.",
    ],
    escalate:
      "If he will not stop, or he is blocking her way, get the host, a bouncer, an RA, a coach, anyone whose job it is to end it. If she is in danger, call 911.",
    after:
      "He may call you a buzzkill. The right answer is “yeah.” You are not there to win the argument.",
  },
  {
    slug: "stranger-leading-her-out",
    title: "A guy you don't know is leading a very drunk girl out the door.",
    situation:
      "You do not know either of them. She is barely upright. He has his arm around her and he is moving fast.",
    say: [
      "To her, loud and friendly: “Hey! There you are. Your friends are looking for you.”",
      "To him: “Where are you guys headed? I'll walk with you.”",
      "To the host or the bar: “The girl in the white top. Is she here with anyone?”",
    ],
    do: [
      "Make it awkward to leave. Attach yourself. Ask her name. Ask where her friends are. Keep asking.",
      "Get a second person. Two sober people asking questions ends most of these on the spot.",
      "If she has a phone, help her text whoever she came with. If she cannot, find the host.",
    ],
    escalate:
      "You do not need proof of anything to call security, a bouncer, an RA or the police and say “I think a very drunk person is being taken out of here by somebody she doesn't know.” That is the whole report.",
    after:
      "Maybe it was her boyfriend. Then you cost a couple two minutes. That trade is always worth it.",
  },
  {
    slug: "group-chat",
    title: "The group chat crosses a line.",
    situation:
      "A photo that should not have been shared. A joke about what somebody “would do” to her. A rating. Everyone else is reacting with laughing emojis.",
    say: [
      "“Delete that.”",
      "“Not funny. She'd see this and you know it.”",
      "“If that was your sister this chat would be over.”",
    ],
    do: [
      "Say it in the chat, not in a side text. Silence in the chat reads as agreement to everyone in it.",
      "Do not forward it, screenshot it for laughs, or keep it. Sharing an intimate image of someone without their consent is a crime in most states.",
      "If it is an image of a minor, that is not a gray area and not a group-chat problem. Tell an adult who can act.",
    ],
    escalate:
      "An image of someone under 18 is a matter for a parent, a coach, a school or the police, immediately. Do not pass it on to anyone else, including to “show them.”",
    after:
      "You might get kicked out of the chat. You were in a chat that shares that. Think about what you lost.",
  },
  {
    slug: "the-joke",
    title: "Someone makes the joke.",
    situation:
      "The rape joke. The “she was asking for it.” The thing about what girls who dress like that want. Everybody laughs or looks at their shoes.",
    say: [
      "“Nah.”",
      "“What's the punchline?”",
      "“You don't actually think that.”",
    ],
    do: [
      "Do not laugh. That is the whole move. The joke needs the room, and you are the room.",
      "You do not need a speech. A flat face and two words do more than a lecture.",
      "Say it once. If the room moves on, let it. You were heard.",
    ],
    escalate:
      "A joke is not an emergency. But the guy who tells them in front of you is telling you something about what he does when you are not there. Watch him at the next party.",
    after:
      "The first time is the hardest. The second time somebody else in the room says it with you.",
  },
  {
    slug: "they-call-you-dramatic",
    title: "Your friends mock you for speaking up.",
    situation:
      "You stepped in. Now you are the snitch, the buzzkill, the one who “made it weird.”",
    say: [
      "“Yeah. I did.”",
      "“I'd rather be the guy who made it weird than the guy who watched.”",
      "“Say what you want. I'd do it again.”",
    ],
    do: [
      "Do not argue the facts. You were there. They want you to back down, and backing down is the only way to lose.",
      "Find the one who nodded. There is almost always one. Next time he will go with you.",
      "If it costs you the group, it was a group that needed you to stay quiet to keep you. Those are not friends.",
    ],
    escalate:
      "If the mocking turns into threats or you are being pushed out of a team, a house or a program for stepping in, that is retaliation, and a coach, a dean or a Title IX office needs to hear it.",
    after:
      "Being called dramatic is the price. It is cheap. Ask anyone who has watched and wished they had not.",
  },
  {
    slug: "getting-her-out",
    title: "She asks you to help her get out of a situation.",
    situation:
      "A look, a text, a “can you come get me.” She is uncomfortable, maybe scared, and she picked you.",
    say: [
      "“On my way. Where are you exactly?”",
      "In front of whoever it is: “Hey, we have to go. Now.”",
      "“You don't have to explain anything to me. Let's just go.”",
    ],
    do: [
      "Go. Do not text back and forth about it. Do not make her justify it.",
      "Walk in with a reason ready, any reason, and leave with her. Keep it boring.",
      "Get her somewhere safe and ask what she wants next. Her call, not yours.",
    ],
    escalate:
      "If she cannot leave, is being held, or is hurt, call 911 from where you are. If she has been assaulted, the National Sexual Assault Hotline at 800-656-4673 will tell you both what the options are, any hour.",
    after:
      "Do not tell the story. It is hers. The one thing she needs from you afterward is that you were the guy who came and did not make it about himself.",
  },
  {
    slug: "afterward",
    title: "Someone tells you it happened to them.",
    situation:
      "Maybe last night. Maybe years ago. Maybe it was a guy you know. They are telling you, and you have no idea what to say.",
    say: [
      "“I believe you.”",
      "“This wasn't your fault.”",
      "“What do you want to do? I'll go with you, whatever it is.”",
    ],
    do: [
      "Listen. Do not interrogate. Do not ask what they were wearing, drinking or thinking.",
      "Do not go after the guy. It feels like loyalty. It takes the decision away from the person it happened to.",
      "Know the number. The National Sexual Assault Hotline, 800-656-4673, is free, confidential and open all day, every day. Offer to sit with them while they call.",
    ],
    escalate:
      "If they are hurt or in danger right now, 911. If they want a medical exam or to keep the option of reporting open, the hotline can explain how, and sooner matters.",
    after:
      "Check in a week later. Then a month. Most people stop asking after the first day. Be the one who does not.",
  },
];
