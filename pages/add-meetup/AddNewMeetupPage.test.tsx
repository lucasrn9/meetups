import { render, screen } from '@testing-library/react';
import AddNewMeetupPage from './index.page';

describe('AddNewMeetupPage', () => {
  it('should render the component NewMeetupForm', () => {
    render(<AddNewMeetupPage />);
    const meetupTitle = screen.getByText('Meetup Title');
    const meetupImage = screen.getByText('Meetup Image');
    const city = screen.getByText('City');
    const street = screen.getByText('Street');
    const number = screen.getByText('Number');
    const description = screen.getByText('Description');
    const addMeetupButton = screen.getByRole('button', { name: 'Add Meetup' });
    expect(meetupTitle).toBeVisible();
    expect(meetupImage).toBeVisible();
    expect(city).toBeVisible();
    expect(street).toBeVisible();
    expect(number).toBeVisible();
    expect(description).toBeVisible();
    expect(addMeetupButton).toBeVisible();
  });
});
