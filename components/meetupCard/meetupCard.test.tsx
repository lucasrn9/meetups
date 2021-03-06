import { render, screen } from '@testing-library/react';
import MeetupCard from './MeetupCard';

describe('MeetupCard', () => {
  it('should render the image passed as props', () => {
    render(
      <MeetupCard
        id={1}
        name="meetup test"
        street="test street"
        city="test city"
        imageSrc="/testSrc"
        imageAlt="testAlt"
      />
    );
    const image = screen.getByAltText('testAlt');
    expect(image).toHaveAttribute('src', '/testSrc');
  });

  it('should render a heading with the meetup name, and should render the street and city passed as props', () => {
    render(
      <MeetupCard
        id={1}
        name="meetup test"
        street="test street"
        city="test city"
        imageSrc="/testSrc"
        imageAlt="testAlt"
      />
    );
    const name = screen.getByRole('heading', { name: 'meetup test' });
    const street = screen.getByText(/test street/);
    const city = screen.getByText(/test city/);
    expect(name).toBeVisible();
    expect(street).toBeVisible();
    expect(city).toBeVisible();
  });
});
