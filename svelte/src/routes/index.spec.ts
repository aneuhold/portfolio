import { render } from '@testing-library/svelte';
import index from './index.svelte';

it('it works', async () => {
  const { getByText } = render(index);

  const titleText = getByText('Anton');
  expect(titleText).toBeDefined();
});
