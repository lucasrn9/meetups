import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewMeetupForm from './NewMeetupForm';

describe('NewMeetupForm', () => {
  it('should have the following labels visible: Meetup Title, Meetup Image, City, Street, Description', () => {
    const submitHandler = jest.fn();
    render(<NewMeetupForm submitHandler={submitHandler} />);
    const meetupTitle = screen.getByText('Meetup Title');
    const meetupImage = screen.getByText('Meetup Image');
    const city = screen.getByText('City');
    const street = screen.getByText('Street');
    const description = screen.getByText('Description');
    expect(meetupTitle).toBeVisible();
    expect(meetupImage).toBeVisible();
    expect(city).toBeVisible();
    expect(street).toBeVisible();
    expect(description).toBeVisible();
  });

  it('should have a "Add Meetup" button', () => {
    const submitHandler = jest.fn();
    render(<NewMeetupForm submitHandler={submitHandler} />);
    const addMeetupButton = screen.getByRole('button', { name: 'Add Meetup' });
    expect(addMeetupButton).toBeVisible();
  });

  it('should calls the submitHandler function with the NewMeetupForm data when the "Add Meetup" button is clicked', async () => {
    const submitHandler = jest.fn();
    render(<NewMeetupForm submitHandler={submitHandler} />);
    const user = userEvent.setup();
    const addMeetupButton = screen.getByRole('button', { name: 'Add Meetup' });
    const meetupTitle = screen.getByText('Meetup Title');
    const meetupImage = screen.getByText('Meetup Image');
    const city = screen.getByText('City');
    const street = screen.getByText('Street');
    const description = screen.getByText('Description');
    await user.type(meetupTitle, 'Title test');
    await user.type(meetupImage, 'Image test');
    await user.type(city, 'City test');
    await user.type(street, 'Street test');
    await user.type(description, 'Desciption test');
    await user.click(addMeetupButton);
    expect(submitHandler).toHaveBeenCalledTimes(1);
    expect(submitHandler).toHaveBeenCalledWith({
      meetupTitle: 'Title test',
      meetupImage: 'Image test',
      city: 'City test',
      street: 'Street test',
      description: 'Desciption test',
    });
  });

  it('should show a success status message after the "Add Meetup" button is clicked and the request is successfully completed', async () => {
    const submitHandler = jest.fn(() => ({
      message: 'Your New Meetup Was Created',
    }));
    render(<NewMeetupForm submitHandler={submitHandler} />);
    const user = userEvent.setup();
    const addMeetupButton = screen.getByRole('button', { name: 'Add Meetup' });
    await user.click(addMeetupButton);
    const successStatusMessage = await screen.findByText(
      'Your New Meetup Was Created'
    );
    expect(successStatusMessage).toBeVisible();
  });

  it('should show an default error status message after the "Add Meetup" button is clicked and the request fails', async () => {
    const submitHandler = jest.fn(() => {
      throw new Error();
      return {
        message: 'Your New Meetup Was Created',
      };
    });
    render(<NewMeetupForm submitHandler={submitHandler} />);
    const user = userEvent.setup();
    const addMeetupButton = screen.getByRole('button', { name: 'Add Meetup' });
    await user.click(addMeetupButton);
    expect(submitHandler).toHaveBeenCalledTimes(1);
    const errorStatusMessage = await screen.findByText(
      'Error On Creating a New Meetup, Please Try Again Later'
    );
    expect(errorStatusMessage).toBeVisible();
  });
});
