import { render } from '@testing-library/svelte';
import { expect, it } from 'vitest';
import IndexPage from './+page.svelte';

it('works at a basic level', () => {
  render(IndexPage);

  const headers = document.body.querySelectorAll('h1');
  expect(headers.length).toBeGreaterThan(0);
  expect(
    headers.values().some((header) => header.textContent.includes('Anton (Tony) Neuhold'))
  ).toBe(true);
});

it('adds the canonical link and JSON-LD graph to the head', () => {
  render(IndexPage);

  const canonical = document.head.querySelector('link[rel="canonical"]');
  expect(canonical?.getAttribute('href')).toBe('https://tonyneuhold.com/');

  const jsonLd = document.head.querySelector('script[type="application/ld+json"]');
  const graph: unknown = JSON.parse(jsonLd?.textContent ?? '{}');
  expect(graph).toMatchObject({
    '@graph': expect.arrayContaining([expect.objectContaining({ '@type': 'ProfilePage' })])
  });
});
