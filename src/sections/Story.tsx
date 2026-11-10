import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import HeartShape from '../components/common/HeartShape';
import SectionHeading from '../components/common/SectionHeading';
import { story, type StoryEntry } from '../data/story';

function Entry({ entry, index }: { entry: StoryEntry; index: number }) {
  const reduce = useReducedMotion();
  const [photoOk, setPhotoOk] = useState(true);
  const fromLeft = index % 2 === 0;

  return (
    <li className="relative pb-10 pl-12 last:pb-0 md:grid md:grid-cols-2 md:gap-16 md:pl-0">
      {/* Node on the line */}
      <motion.span
        aria-hidden
        initial={reduce ? false : { scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-12% 0px' }}
        transition={{ type: 'spring', stiffness: 260, damping: 16 }}
        className="absolute left-0 top-5 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-rose to-rose-deep text-white shadow-lg shadow-rose/40 md:left-1/2 md:-translate-x-1/2"
      >
        <HeartShape size={15} />
      </motion.span>

      <motion.article
        initial={reduce ? false : { opacity: 0, x: fromLeft ? -40 : 40, y: 16 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: '-12% 0px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`card-soft rounded-3xl p-6 sm:p-7 ${fromLeft ? 'md:col-start-1 md:text-right' : 'md:col-start-2'}`}
      >
        <p className="font-script text-3xl leading-none text-rose-deep">{entry.date}</p>
        <h3 className="mt-2 font-display text-2xl text-burgundy">{entry.title}</h3>
        <p className="mt-3 leading-relaxed text-plum/85">{entry.description}</p>
        {entry.photo && photoOk && (
          <figure className="mt-5">
            <img
              src={`${import.meta.env.BASE_URL}images/${entry.photo}`}
              alt={entry.caption || entry.title}
              loading="lazy"
              onError={() => setPhotoOk(false)}
              className="max-h-80 w-full rounded-2xl border-4 border-white object-cover shadow-lg shadow-rose/25"
            />
            {entry.caption && <figcaption className="mt-2 text-center font-script text-2xl text-rose-deep">{entry.caption}</figcaption>}
          </figure>
        )}
      </motion.article>
    </li>
  );
}

export default function Story() {
  return (
    <section id="story" className="bg-veil relative px-4 py-24 sm:py-32">
      <SectionHeading eyebrow="Our Story" title="Every Love Story Is Special. Ours Is My Favourite." />
      <ol className="relative mx-auto max-w-4xl">
        <span aria-hidden className="absolute bottom-2 left-[17px] top-2 w-0.5 rounded bg-gradient-to-b from-rose-soft via-rose to-lavender md:left-1/2 md:-translate-x-1/2" />
        {story.map((entry, i) => (
          <Entry key={`${entry.title}-${i}`} entry={entry} index={i} />
        ))}
      </ol>
    </section>
  );
}
