'use client';

import { type CSSProperties, type ReactNode, useEffect, useRef } from 'react';
import { timelineLiftService } from 'shared';

/**
 * The section a timeline is drawn in, with the lift attached once it is on the page. Its contents
 * are passed in as children, which keeps them Server Components whose code is not sent to the
 * browser.
 */
export default function TimelineAnimationWrapper({
  className,
  style,
  children
}: {
  className: string;
  style: CSSProperties;
  children: ReactNode;
}) {
  const timelineElement = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!timelineElement.current) {
      return;
    }
    return timelineLiftService.attach(timelineElement.current);
  }, []);

  return (
    <section className={className} style={style} ref={timelineElement}>
      {children}
    </section>
  );
}
