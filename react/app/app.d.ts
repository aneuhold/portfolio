// `CSSProperties` in `@types/react` has no index signature, so a `style` prop that sets a custom
// property, such as `{ '--row': 1 }`, fails to type check. Its doc comment says "You're able to use
// type assertion or module augmentation to add properties or an index signature of your own", and
// links https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors, which adds the
// index signature by augmenting `csstype`.
import 'react';

declare module 'react' {
  interface CSSProperties {
    [customProperty: `--${string}`]: string | number;
  }
}
