import { render, screen } from '@testing-library/react';
import MeetupList from './MeetupList';
import meetupsList from '../../mocks/meetupsList';

describe('MeetupList', () => {
  it('should render a MeetupCard for every meetup in the array received in props', () => {
    render(<MeetupList meetupsArray={meetupsList} />);
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
});
