import yup, { object, string } from 'yup';
import {
  number,
  numberMessage,
  alphabeticCharacter,
  alphabeticCharacterMessage,
} from './regex';

const meetupSchema = object({
  meetupTitle: string()
    .matches(alphabeticCharacter, `Meetup Title ${alphabeticCharacterMessage}`)
    .required()
    .min(2)
    .max(100),
  meetupImage: string().url().required().min(9).max(300),
  street: string()
    .matches(alphabeticCharacter, `Street ${alphabeticCharacterMessage}`)
    .required()
    .max(40),
  city: string()
    .matches(alphabeticCharacter, `City ${alphabeticCharacterMessage}`)
    .required()
    .min(2)
    .max(40),
  number: string().matches(number, `Number ${numberMessage}`).required().max(8),
  description: string().required().min(7).max(200),
});

export default meetupSchema;

export type MeetupSchemaType = yup.InferType<typeof meetupSchema>;
