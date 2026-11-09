import { Reveal } from '@/components/Reveal'
import type { HeadingParts } from '@/types'

type Props = { number: string; label: string; heading: HeadingParts }

export function SectionHeading({ number, label, heading }: Props) {
  return (
    <Reveal className="sec-head">
      <div className="label">
        {number} — {label}
      </div>
      <h2>
        {heading.text}
        {heading.emphasis && (
          <>
            {' '}
            <em>{heading.emphasis}</em>
          </>
        )}
      </h2>
    </Reveal>
  )
}
