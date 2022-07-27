import Meetup from '../Meetup';

export default interface HomeProps {
  meetups:
    | { meetupsArray: Meetup[]; error?: string }
    | { meetupsArray?: Meetup[]; error: string };
}
