import NewMeetupFormData from './NewMeetupFormData';

export default interface NewMeetupFormProps {
  submitHandler: (formData: NewMeetupFormData) => void;
  isSubmitInProgress: boolean;
  submitStatusMessage?: string;
}
