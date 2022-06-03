import NewMeetupFormData from '../NewMeetupFormData';

export default interface NewMeetupFormProps {
  submitHandler: (formData: NewMeetupFormData) =>
    | {
        message: string;
      }
    | Promise<{
        message: string;
      }>;
}
