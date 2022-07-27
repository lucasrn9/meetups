import { render, screen } from '@testing-library/react';
import MeetupDetailsCard from './MeetupDetailsCard';

describe('MeetupDetailsCard', () => {
  it('should render a card with meetup title,city,street,number,description and image', () => {
    render(
      <MeetupDetailsCard
        city="testCity"
        street="testStreet"
        number="123"
        title="testTitle"
        description="testDescription"
        image="testImage"
      />
    );
    const city = screen.getByText(/testCity/);
    const street = screen.getByText(/testStreet/);
    const number = screen.getByText(/123/);
    const title = screen.getByText('testTitle');
    const description = screen.getByText('testDescription');
    const image = screen.getByAltText('testTitle');
    expect(city).toBeVisible();
    expect(street).toBeVisible();
    expect(number).toBeVisible();
    expect(title).toBeVisible();
    expect(description).toBeVisible();
    expect(image).toHaveAttribute('src', 'testImage');
  });
});
