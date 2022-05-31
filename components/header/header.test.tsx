import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it("should have a navbar with 'All Meetups' and 'Add New Meetup'", () => {
    render(<Header />);
    const allMeetups = screen.getByText('All Meetups');
    const addNewMeetups = screen.getByText('Add New Meetup');
    expect(allMeetups).toBeVisible();
    expect(addNewMeetups).toBeVisible();
  });
});
