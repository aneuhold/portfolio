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
