'use client';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useServerInsertedHTML } from 'next/navigation';
import React from 'react';
import theme from '../theme';

type Props = {
  children: React.ReactNode;
};

export default function ThemeRegistry({ children }: Props): React.JSX.Element {
  const [{ cache, flush }] = React.useState(() => {
    const cache = createCache({ key: 'mui', prepend: true });
    cache.compat = true;

    const prevInsert = cache.insert as unknown as (
      selector: string,
      serialized: { name: string; styles: string },
      sheet: unknown,
      shouldCache: boolean
    ) => string;
    let inserted: string[] = [];
    cache.insert = (
      selector: string,
      serialized: { name: string; styles: string },
      sheet: unknown,
      shouldCache: boolean
    ) => {
      if (!cache.inserted[serialized.name]) {
        inserted.push(serialized.name);
      }
      return prevInsert(selector, serialized, sheet, shouldCache);
    };

    const flush = () => {
      const prev = inserted;
      inserted = [];
      return prev;
    };
    return { cache, flush } as const;
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;
    return (
      <style
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: names.map((name) => (cache.inserted as Record<string, string>)[name]).join(' ')
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
