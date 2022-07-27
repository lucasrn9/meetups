import NewMeetupFormData from '../NewMeetupFormData';

export default interface NewMeetupFormProps {
  submitHandler: (
    formData: NewMeetupFormData
  ) => Promise<
    | { error: ValidationError; message?: undefined }
    | { message: string; error?: undefined }
  >;
}
