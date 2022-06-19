import { render } from '@testing-library/svelte';
import index from './index.svelte';

it('it works at a basic level', async () => {
  const { getByText } = render(index);

  const titleText = getByText('Anton (Tony) Neuhold');
  expect(titleText).toBeDefined();
});
