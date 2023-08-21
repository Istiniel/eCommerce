import { fireEvent, screen, waitFor } from '@testing-library/react';
import renderTestApp from '../../providers/renderTestApp';

describe('routing', () => {
  it('handle routing beetween pages', async () => {
    renderTestApp({ initialRoute: '/' });

    const aboutLink = screen.getByRole('link', {name: /About us/});

    const [heading] = screen.getAllByText(/Why choose us/);
    expect(heading).toBeInTheDocument();

    await waitFor(() => fireEvent.click(aboutLink));
    expect(heading).not.toBeInTheDocument();

    expect(screen.getByText(/Founder's/)).toBeInTheDocument();
    // screen.debug(undefined, Infinity);
  });
});
