import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Lifts one timeline item at a time. Every part drawn for an item carries the item's key as
 * `data-item`, and GSAP tweens custom properties on those parts while CSS draws from them:
 * `--hover` and `--hovering` for the hovered item, and `--arrive` and `--depart` for the item at
 * the focus line.
 */
class TimelineLiftService {
  /**
   * Starts the lift on a timeline, and returns the function that stops it and reverts every tween,
   * ScrollTrigger, listener, and inline style it added.
   *
   * @param timeline The element holding every part of every item.
   */
  attach(timeline: HTMLElement): () => void {
    const context = gsap.context((self) => {
      // Selector inside the context only matches within the timeline.
      const partsByItem = Map.groupBy(gsap.utils.toArray<HTMLElement>('[data-item]'), (part) =>
        part.getAttribute('data-item')
      );
      gsap.matchMedia().add('(width < 48rem)', () => this.#liftAtFocusLine(timeline, partsByItem));
      return this.#liftOnHover(timeline, partsByItem, self);
    }, timeline);

    return () => {
      context.revert();
    };
  }

  /**
   * Brings the hovered item forward and hands straight from one item to the next. Touch is left to
   * the focus line, since a tap only hovers for a moment.
   *
   * @param timeline The element holding every part of every item.
   * @param partsByItem Every part, grouped by item key.
   * @param context The context each hover's tweens are recorded in, so reverting it clears them.
   */
  #liftOnHover(timeline: HTMLElement, partsByItem: PartsByItem, context: gsap.Context): () => void {
    let hovered: string | null = null;

    const hover = ({ target, pointerType }: PointerEvent) => {
      const item =
        target instanceof Element
          ? (target.closest('[data-item]')?.getAttribute('data-item') ?? null)
          : null;
      if (pointerType === 'touch' || item === hovered) {
        return;
      }
      const [previous, next] = [partsByItem.get(hovered), partsByItem.get(item)];
      context.add(() => {
        if (previous) {
          gsap.to(previous, { '--hover': 0, duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
        }
        if (next) {
          gsap.to(next, { '--hover': 1, duration: 0.6, ease: 'power3.out', overwrite: 'auto' });
        }
        // Settling back starts slowly, so the pointer crossing the gap between two items barely
        // moves it, and the rest of the timeline doesn't flash back in between them.
        gsap.to(timeline, {
          '--hovering': next ? 1 : 0,
          duration: 0.6,
          ease: next ? 'power3.out' : 'power2.inOut',
          overwrite: 'auto'
        });
      });
      hovered = item;
    };

    timeline.addEventListener('pointerover', hover);
    timeline.addEventListener('pointerleave', hover);
    return () => {
      timeline.removeEventListener('pointerover', hover);
      timeline.removeEventListener('pointerleave', hover);
    };
  }

  /**
   * Hands the lift from one item to the next as each card reaches the focus line, scrubbed by
   * scroll. The focus line sits where a link to a card scrolls it, just under the pinned overview.
   * An item arrives as the card above it scrolls its lower half past the line, and has fully
   * arrived when its own card's top reaches it.
   *
   * @param timeline The element holding every part of every item.
   * @param partsByItem Every part, grouped by item key.
   */
  #liftAtFocusLine(timeline: HTMLElement, partsByItem: PartsByItem): () => void {
    // Cards come after every rail in the markup, so each item's last part is its card or dated row.
    const cards = [...partsByItem.values()].flatMap((parts) => parts.at(-1) ?? []);
    const lastCard = cards.at(-1);
    if (!lastCard) {
      return () => undefined;
    }
    const partsOf = (card: HTMLElement) => partsByItem.get(card.getAttribute('data-item')) ?? [];
    const focusLine = () => parseFloat(getComputedStyle(lastCard).scrollMarginBlockStart);
    const pageTop = (element: HTMLElement) => element.getBoundingClientRect().top + scrollY;
    // The scroll position that brings a point on the page up to the focus line. The last cards
    // can't scroll that far, so over the last stretch of scroll, as long as they fall short by,
    // the page passes the line twice as fast as it scrolls, and they still take their turns.
    const scrollFor = (pageY: number) => {
      const maxScroll = ScrollTrigger.maxScroll(window);
      const shortfall = pageTop(lastCard) - focusLine() - maxScroll;
      const squeezeFrom = maxScroll - shortfall;
      const scroll = pageY - focusLine();
      return shortfall > 0 && scroll > squeezeFrom
        ? squeezeFrom + (scroll - squeezeFrom) / 2
        : scroll;
    };
    const arrivals = new Map<Element, ScrollTrigger | undefined>();

    for (const [index, card] of cards.entries()) {
      if (index === 0) {
        gsap.set(partsOf(card), { '--arrive': 1 });
        continue;
      }
      const previous = cards[index - 1];
      const arrival = gsap
        .timeline({
          defaults: { ease: 'power1.inOut' },
          scrollTrigger: {
            start: () => scrollFor(pageTop(previous) + previous.offsetHeight / 2),
            end: () => scrollFor(pageTop(card)),
            scrub: true
          }
        })
        .fromTo(partsOf(card), { '--arrive': 0 }, { '--arrive': 1 })
        .fromTo(partsOf(previous), { '--depart': 0 }, { '--depart': 1 }, 0);
      arrivals.set(card, arrival.scrollTrigger);
    }

    // A link to a card scrolls the card's top to the focus line, where it has fully arrived. The
    // last cards can't scroll that far, so before the jump is painted, the page moves on to where
    // they have.
    const jump = ({ target }: MouseEvent) => {
      const link =
        target instanceof Element ? target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
      const card = link && document.getElementById(link.hash.slice(1));
      const end = card && arrivals.get(card)?.end;
      if (typeof end === 'number') {
        requestAnimationFrame(() => {
          scrollTo(0, end);
        });
      }
    };

    timeline.addEventListener('click', jump);
    return () => {
      timeline.removeEventListener('click', jump);
    };
  }
}

const timelineLiftService = new TimelineLiftService();

export { timelineLiftService };

/**
 * Every part drawn for the timeline, grouped by the item key in its `data-item`.
 */
type PartsByItem = Map<string | null, HTMLElement[]>;
