export type GameId = 'catch' | 'match' | 'unlock' | 'pop' | 'garden';

export interface GameMeta {
  id: GameId;
  title: string;
  tagline: string;
  emoji: string;
}

export const games: GameMeta[] = [
  { id: 'catch', title: 'Catch My Love', tagline: 'Hearts are falling. Catch as many as you can.', emoji: '🧺' },
  { id: 'match', title: 'Find the Matching Hearts', tagline: 'Flip the cards and find every pair.', emoji: '💞' },
  { id: 'unlock', title: 'Unlock My Love Letter', tagline: 'Three little questions open something special.', emoji: '🔐' },
  { id: 'pop', title: 'Pop the Hearts', tagline: 'Thirty seconds. Pop every heart you see.', emoji: '🎈' },
  { id: 'garden', title: 'Build Our Love Garden', tagline: 'Plant flowers and watch our garden bloom.', emoji: '🌷' },
];

export const catchGame = {
  /** Hearts to catch to win. */
  target: 20,
  /** Seconds on the clock. */
  duration: 45,
  how: 'Drag the basket with your finger or mouse, or use the ← → keys. Golden hearts are worth more.',
  winMessage: 'You collected 20 hearts, but I have an unlimited supply of love for you!',
  timeUpMessage: 'Every heart you caught is yours to keep, and there are always more waiting for you.',
};

export const matchGame = {
  /** One pair per symbol. */
  symbols: ['💖', '🌹', '💌', '🦋', '💍', '🌸', '🍓', '✨'],
  how: 'Tap two cards to flip them. Find all the matching pairs.',
  winMessage: 'Just like these hearts, we belong together. ❤️',
};

export interface UnlockQuestion {
  prompt: string;
  /** Suggested answers. She can also type her own; every answer is welcome. */
  options: string[];
  /** Loving reply shown whatever she answers. */
  reply: string;
}

export const unlockGame: { how: string; questions: UnlockQuestion[]; finalMessage: string } = {
  how: 'Choose an answer or write your own. There are no wrong answers here.',
  questions: [
    {
      prompt: 'What is my favourite thing about you?',
      options: ['My smile', 'My heart', 'The way I care', 'Everything about me'],
      reply: 'Yes. And honestly, every other answer too. I love all of you.',
    },
    {
      prompt: 'What do I want most in our future?',
      options: ['More time together', 'More laughter', 'A peaceful, happy home', 'All of it, with you'],
      reply: 'Exactly that. Whatever the future holds, I want it with you.',
    },
    {
      prompt: 'What is the most important thing I want you to know?',
      options: ['That I am loved', 'That I matter to you', 'That you are sorry', 'That you will always choose me'],
      reply: 'Yes. You are loved, you matter, and I will always choose you.',
    },
  ],
  finalMessage: 'You unlocked something special: My heart belongs to you.',
};

export const popGame = {
  duration: 30,
  how: 'Tap or click the hearts before they float away. They get quicker!',
  winMessage: 'Every little heart you popped represents another reason I love you.',
};

export const gardenGame = {
  colors: ['#FF69B4', '#E75480', '#FFC0CB', '#C9A7FF', '#FFD58A', '#FFFFFF'],
  how: 'Pick something to plant, then tap anywhere in the garden.',
  /** One is revealed for each flower planted, in order, then it repeats. */
  messages: [
    'Thank you for being in my life.',
    'You make ordinary days special.',
    'I choose you, every single day.',
    'My world is softer because of you.',
    'You are the best part of every day.',
    'With you, everything blooms.',
    'I am so proud to be yours.',
    'Home is wherever you are.',
  ],
  finaleMessage: 'Look what grew from a little love. Our garden is beautiful because of you.',
  maxItems: 40,
};
