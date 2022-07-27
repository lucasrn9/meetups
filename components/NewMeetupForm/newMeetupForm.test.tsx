import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ValidationError } from 'yup';
import NewMeetupForm from './NewMeetupForm';
import meetupSchema from '../../schemas/meetup';

afterEach(() => {
  cleanup();
});

const submitHandlerValidation = jest.fn(async (formdata) => {
  try {
    await meetupSchema.validate(formdata);
  } catch (err) {
    return Promise.resolve({
      error: err as ValidationError,
    });
  }
  return Promise.resolve({
    message: 'Your New Meetup Was Created',
  });
});

const submitHandlerRequestFails = jest.fn(async (formdata) => {
  try {
    await meetupSchema.validate(formdata);
  } catch (err) {
    return Promise.resolve({
      error: err as ValidationError,
    });
  }
  try {
    // post
    throw new Error();
  } catch {
    return Promise.resolve({
      message: 'Error On Creating a New Meetup, Please Try Again Later',
    });
  }
  return Promise.resolve({
    message: 'Your New Meetup Was Created',
  });
});

describe('NewMeetupForm', () => {
  it('should have the following labels visible: Meetup Title, Meetup Image, City, Street, Number and Description', () => {
    const submitHandler = jest.fn();
    render(<NewMeetupForm submitHandler={submitHandler} />);
    const meetupTitle = screen.getByText('Meetup Title');
    const meetupImage = screen.getByText('Meetup Image');
    const city = screen.getByText('City');
    const street = screen.getByText('Street');
    const number = screen.getByText('Number');
    const description = screen.getByText('Description');
    expect(meetupTitle).toBeVisible();
    expect(meetupImage).toBeVisible();
    expect(city).toBeVisible();
    expect(street).toBeVisible();
    expect(number).toBeVisible();
    expect(description).toBeVisible();
  });

  it('should have an "Add Meetup" button', () => {
    const submitHandler = jest.fn();
    render(<NewMeetupForm submitHandler={submitHandler} />);
    const addMeetupButton = screen.getByRole('button', { name: 'Add Meetup' });
    expect(addMeetupButton).toBeVisible();
  });

  it('should calls the submitHandler function with the NewMeetupForm data when the "Add Meetup" button is clicked', async () => {
    render(<NewMeetupForm submitHandler={submitHandlerValidation} />);
    const user = userEvent.setup();
    const addMeetupButton = screen.getByRole('button', { name: 'Add Meetup' });
    const meetupTitle = screen.getByText('Meetup Title');
    const meetupImage = screen.getByText('Meetup Image');
    const city = screen.getByText('City');
    const street = screen.getByText('Street');
    const number = screen.getByText('Number');
    const description = screen.getByText('Description');
    await user.type(meetupTitle, 'Title test');
    await user.type(meetupImage, 'https://www.google.com');
    await user.type(city, 'City test');
    await user.type(street, 'Street test');
    await user.type(number, '123');
    await user.type(description, 'Desciption test');
    await user.click(addMeetupButton);
    const message = await screen.findByText('Your New Meetup Was Created');
    expect(message).toBeVisible();
    expect(submitHandlerValidation).toHaveBeenCalledTimes(1);
    expect(submitHandlerValidation).toHaveBeenCalledWith({
      meetupTitle: 'Title test',
      meetupImage: 'https://www.google.com',
      city: 'City test',
      street: 'Street test',
      number: '123',
      description: 'Desciption test',
    });
  });

  it('should throw yup errors when you click the Add Meetup button and the form validation fails', async () => {
    render(<NewMeetupForm submitHandler={submitHandlerValidation} />);
    const user = userEvent.setup();
    const addMeetupButton = screen.getByRole('button', { name: 'Add Meetup' });
    const meetupTitle = screen.getByText('Meetup Title');
    const meetupImage = screen.getByText('Meetup Image');
    const city = screen.getByText('City');
    const street = screen.getByText('Street');
    const number = screen.getByText('Number');
    const description = screen.getByText('Description');
    await user.type(meetupTitle, 'T');
    await user.type(meetupImage, 'https://www.google.com');
    await user.type(city, 'City test');
    await user.type(street, 'Street test');
    await user.type(number, '123');
    await user.type(description, 'D');
    await user.click(addMeetupButton);
    const descriptionMessage = await screen.findByText(
      'description must be at least 7 characters'
    );
    expect(descriptionMessage).toBeVisible();
    await user.type(description, 'escription test');
    await user.click(addMeetupButton);
    const titleMessage = await screen.findByText(
      'meetupTitle must be at least 2 characters'
    );
    expect(titleMessage).toBeVisible();
    await user.type(meetupTitle, 'est title');
    await user.click(addMeetupButton);
    const successMessage = await screen.findByText(
      'Your New Meetup Was Created'
    );
    expect(successMessage).toBeVisible();
  });

  it('should throw an error when request fails', async () => {
    render(<NewMeetupForm submitHandler={submitHandlerRequestFails} />);
    const user = userEvent.setup();
    const addMeetupButton = screen.getByRole('button', { name: 'Add Meetup' });
    const meetupTitle = screen.getByText('Meetup Title');
    const meetupImage = screen.getByText('Meetup Image');
    const city = screen.getByText('City');
    const street = screen.getByText('Street');
    const number = screen.getByText('Number');
    const description = screen.getByText('Description');
    await user.type(meetupTitle, 'Title test');
    await user.type(meetupImage, 'https://www.google.com');
    await user.type(city, 'City test');
    await user.type(street, 'Street test');
    await user.type(number, '123');
    await user.type(description, 'Description test');
    await user.click(addMeetupButton);
    const requestErrorMessage = await screen.findByText(
      'Error On Creating a New Meetup, Please Try Again Later'
    );
    expect(requestErrorMessage).toBeVisible();
  });
});
