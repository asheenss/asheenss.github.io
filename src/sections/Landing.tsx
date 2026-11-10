import { motion, useReducedMotion } from 'framer-motion';
import Sparkles from '../components/Sparkles';
import RomanticButton from '../components/RomanticButton';
import { HEART_D } from '../components/common/HeartShape';
import { landing } from '../data/messages';

const STAR = 'M0,-10 Q1.5,-1.5 10,0 Q1.5,1.5 0,10 Q-1.5,1.5 -10,0 Q-1.5,-1.5 0,-10Z';
const BLOSSOMS = [0, 45, 90, 135, 180, 225, 270, 315];

/** Hero illustration: a glowing heart inside a slowly turning wreath of blossoms. */
function HeartWreath() {
  return (
    <div className="relative mx-auto h-56 w-56 sm:h-72 sm:w-72">
      <div
        aria-hidden
        className="animate-glow absolute inset-[-18%] rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(255,105,180,.45), rgba(255,105,180,0))' }}
      />
      <svg aria-hidden viewBox="-110 -110 220 220" className="animate-spin-slow absolute inset-0 h-full w-full">
        <circle r="92" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="2 9" strokeLinecap="round" opacity=".9" />
        {BLOSSOMS.map((a, i) => (
          <g key={a} transform={`rotate(${a}) translate(0 -92)`}>
            <path d="M-13 3 C-9 -6 -3 -6 0 0 C-3 5 -9 6 -13 3Z" fill="#9FD3A8" />
            <path d="M13 3 C9 -6 3 -6 0 0 C3 5 9 6 13 3Z" fill="#9FD3A8" />
            <g transform={`scale(${i % 2 ? 0.8 : 1.05})`}>
              {[0, 72, 144, 216, 288].map((p) => (
                <ellipse key={p} cx="0" cy="-6.5" rx="4.6" ry="6.5" fill={i % 2 ? '#E6D6FF' : '#FFFFFF'} stroke="#FFC0CB" strokeWidth=".6" transform={`rotate(${p})`} />
              ))}
              <circle r="3" fill="#FFD98A" />
            </g>
          </g>
        ))}
      </svg>
      <svg aria-hidden viewBox="-110 -110 220 220" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="hero-heart" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FF9CC9" />
            <stop offset=".55" stopColor="#FF69B4" />
            <stop offset="1" stopColor="#E75480" />
          </linearGradient>
        </defs>
        <g className="animate-heartbeat" style={{ transformOrigin: 'center', transformBox: 'fill-box' }}>
          <g transform="translate(-66 -66) scale(5.5)" style={{ filter: 'drop-shadow(0 1.5px 2.5px rgba(139,30,80,.35))' }}>
            <path d={HEART_D} fill="url(#hero-heart)" />
            <path d="M5.2 8.6c.3-1.6 1.5-2.5 2.9-2.3" stroke="#FFFFFF" strokeWidth=".9" strokeLinecap="round" fill="none" opacity=".75" />
          </g>
        </g>
        <path d={STAR} fill="#FFFFFF" transform="translate(-74 -62) scale(.9)" />
        <path d={STAR} fill="#FFF1D6" transform="translate(78 -40) scale(.6)" />
        <path d={STAR} fill="#FFFFFF" transform="translate(64 66) scale(.75)" />
        <path d={STAR} fill="#FFF1D6" transform="translate(-70 58) scale(.5)" />
      </svg>
    </div>
  );
}

interface Props {
  entered: boolean;
  /** Called synchronously from the click so audio may start under a user gesture. */
  onEnter: () => void;
}

export default function Landing({ entered, onEnter }: Props) {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 py-16 text-center">
      <Sparkles count={22} />
      <div className="relative z-10 flex max-w-2xl flex-col items-center">
        <motion.div {...(reduce ? {} : { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] as const } })}>
          <HeartWreath />
        </motion.div>
        <motion.h1 {...rise(0.5)} className="mt-8 text-balance font-script text-[2.9rem] leading-[1.05] text-rose-deep sm:text-7xl">
          {landing.heading}
        </motion.h1>
        <motion.p {...rise(0.9)} className="mt-4 max-w-md text-balance font-display text-lg italic text-burgundy/85 sm:text-xl">
          {landing.sub}
        </motion.p>
        <motion.div {...rise(1.3)} className="mt-9">
          <RomanticButton onClick={onEnter}>{entered ? 'Continue Our Journey ❤️' : landing.cta}</RomanticButton>
        </motion.div>
      </div>
    </section>
  );
}
