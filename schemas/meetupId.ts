import { string } from 'yup';
import { number } from './regex';

const meetupIdSchema = string().matches(number);

export default meetupIdSchema;
