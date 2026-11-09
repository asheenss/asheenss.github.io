export interface Memory {
  /** File inside public/images/ */
  file: string;
  /** Optional caption shown under the photo. Leave '' for none. */
  caption: string;
  /** Alt text for accessibility. */
  alt: string;
}

/**
 * To add your own photos: drop files into public/images/ and list them here.
 * Photos that are missing show an elegant placeholder instead.
 * Add as many entries as you like.
 */
export const memories: Memory[] = [
  { file: 'memory-1.jpg', caption: '', alt: 'A memory with you' },
  { file: 'memory-2.jpg', caption: '', alt: 'A memory with you' },
  { file: 'memory-3.jpg', caption: '', alt: 'A memory with you' },
  { file: 'memory-4.jpg', caption: '', alt: 'A memory with you' },
  { file: 'memory-5.jpg', caption: '', alt: 'A memory with you' },
  { file: 'memory-6.jpg', caption: '', alt: 'A memory with you' },
  { file: 'memory-7.jpg', caption: '', alt: 'A memory with you' },
  { file: 'memory-8.jpg', caption: '', alt: 'A memory with you' },
  { file: 'memory-9.jpg', caption: '', alt: 'A memory with you' },
  { file: 'memory-10.jpg', caption: '', alt: 'A memory with you' },
  { file: 'memory-11.jpg', caption: '', alt: 'A memory with you' },
  { file: 'memory-12.jpg', caption: '', alt: 'A memory with you' },
];
