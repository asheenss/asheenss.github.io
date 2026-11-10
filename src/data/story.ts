export interface StoryEntry {
  /** Shown above the title, e.g. '14 February 2020'. Any text works. */
  date: string;
  title: string;
  description: string;
  /** Optional file inside public/images/, e.g. 'memory-3.jpg'. */
  photo?: string;
  /** Optional caption shown under the photo. */
  caption?: string;
}

/**
 * OUR STORY TIMELINE
 *
 * These are placeholders. Replace each entry with your real dates and memories,
 * and add or remove entries as you like. Example:
 *
 *   {
 *     date: '14 February 2020',
 *     title: 'Our First Coffee',
 *     description: 'You laughed at my terrible joke and I knew I was in trouble.',
 *     photo: 'memory-3.jpg',
 *     caption: 'That little café',
 *   },
 */
export const story: StoryEntry[] = [
  {
    date: 'Once upon a time',
    title: 'Where It All Began',
    description: 'This page is waiting for the story of the day our paths first crossed.',
  },
  {
    date: 'A little later',
    title: 'The Moment I Knew',
    description: 'This page is waiting for the moment I realised it was always going to be you.',
  },
  {
    date: 'A day to remember',
    title: 'The Day You Became My Wife',
    description: 'This page is waiting for the memory of the happiest promise I have ever made.',
  },
  {
    date: 'Today, and every day',
    title: 'Still Choosing You',
    description: 'Our story is still being written, and my favourite chapters are the ones yet to come.',
  },
];
