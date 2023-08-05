import { fireEvent, screen, waitFor } from '@testing-library/react';
import renderTestApp from '../../providers/renderTestApp';

describe('routing', () => {
  it('handle routing beetween pages', async () => {
    renderTestApp({ initialRoute: '/products' });

    const [toMainButton] = screen.getAllByRole('button');

    const productsHeading = await screen.findByText('Products');
    expect(productsHeading).toBeInTheDocument();

    await waitFor(() => fireEvent.click(toMainButton));
    expect(productsHeading).not.toBeInTheDocument();

    expect(screen.getByText('MainPage')).toBeInTheDocument();
    // screen.debug(undefined, Infinity);
  });
});
