/* eslint-disable global-require */
import { render, screen } from '@testing-library/react';
import meetupDetailsMock from '../../mocks/meetupDetails';
import MeetupDetails from './[id].page';

describe('MeetupDetails', () => {
  it('should render the MeetupDetailsCard', () => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');

    useRouter.mockImplementation(() => ({
      isFallback: false,
    }));

    render(<MeetupDetails meetups={meetupDetailsMock} />);
    const city = screen.getByText(/test city/);
    const street = screen.getByText(/test street/);
    const number = screen.getByText(/123/);
    const title = screen.getByText('test title');
    const description = screen.getByText('test description');
    const image = screen.getByAltText('test title');
    expect(city).toBeVisible();
    expect(street).toBeVisible();
    expect(number).toBeVisible();
    expect(title).toBeVisible();
    expect(description).toBeVisible();
    expect(image).toHaveAttribute('src', 'test image');
  });

  it('should render a 404 error message when meetups fetch fails', () => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');

    useRouter.mockImplementation(() => ({
      isFallback: false,
    }));
    render(
      <MeetupDetails meetups={[{ error: 'No results found for this id' }]} />
    );
    const message = screen.getByText('404');
    expect(message).toBeVisible();
  });

  it('should render loading when the page is a fallback', () => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');

    useRouter.mockImplementation(() => ({
      isFallback: true,
    }));
    render(<MeetupDetails meetups={meetupDetailsMock} />);
    const message = screen.getByText('Loading...');
    expect(message).toBeVisible();
  });
});
