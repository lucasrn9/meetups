import NewMeetupFormData from '../NewMeetupFormData';

export default interface NewMeetupFormProps {
  submitHandler: (
    formData: NewMeetupFormData,
    setStatusmessage: (value: string | PromiseLike<string>) => void
  ) => void;
}
