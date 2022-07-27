import { render, screen } from '@testing-library/react';
import Home from './index.page';
import meetupsHomeMock from '../mocks/meetupsHome';

describe('Home', () => {
  it('should render the MeetupList component', () => {
    render(<Home meetups={{ meetupsArray: meetupsHomeMock }} />);
    const nameCardOne = screen.getByText('card 1 title');
    const streetCardOne = screen.getByText(/card 1 street/);
    const cityCardOne = screen.getByText(/card 1 city/);
    const imageCardOne = screen.getByAltText('card 1 title');
    expect(nameCardOne).toBeVisible();
    expect(streetCardOne).toBeVisible();
    expect(cityCardOne).toBeVisible();
    expect(imageCardOne).toHaveAttribute('src', 'card 1 image');
    const nameCardTwo = screen.getByText('card 2 title');
    const streetCardTwo = screen.getByText(/card 2 street/);
    const cityCardTwo = screen.getByText(/card 2 city/);
    const imageCardTwo = screen.getByAltText('card 2 title');
    expect(nameCardTwo).toBeVisible();
    expect(streetCardTwo).toBeVisible();
    expect(cityCardTwo).toBeVisible();
    expect(imageCardTwo).toHaveAttribute('src', 'card 2 image');
  });

  it('should render an error message when meetups fetch fails', () => {
    render(<Home meetups={{ error: 'Internal Error' }} />);
    const errorMessage = screen.getByText(
      /Meetups couldn't be loaded, try again later/
    );
    expect(errorMessage).toBeVisible();
  });
});
