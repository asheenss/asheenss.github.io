import { useEffect, useState } from 'react'

function format(timeZone: string): string {
  return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone }).format(
    new Date(),
  )
}

/** Live local time for a given IANA timezone, e.g. "Asia/Dubai". */
export function useClock(timeZone: string): string {
  const [time, setTime] = useState(() => format(timeZone))
  useEffect(() => {
    const id = window.setInterval(() => setTime(format(timeZone)), 15_000)
    return () => window.clearInterval(id)
  }, [timeZone])
  return time
}
