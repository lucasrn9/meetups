import { ChangeEvent, FormEvent, useState } from 'react';
import { NewMeetupFormProps } from '../../types/props';
import styles from './newMeetupForm.module.scss';

const NewMeetupForm = ({ submitHandler }: NewMeetupFormProps) => {
  const [formData, setFormData] = useState({
    meetupTitle: '',
    meetupImage: '',
    city: '',
    street: '',
    number: '',
    description: '',
  });

  const formDataHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [isSubmitInProgress, setIsSubmitInProgress] = useState(false);

  const [submitStatusMessage, setSubmitStatusMessage] = useState<string>();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitInProgress(true);
    const submit = await submitHandler(formData);
    if (submit.error) {
      setSubmitStatusMessage(submit.error.errors[0]);
      setIsSubmitInProgress(false);
    }
    if (submit.message) {
      setSubmitStatusMessage(submit.message);
      setIsSubmitInProgress(false);
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        onSubmit(e);
      }}
    >
      <label htmlFor="meetupTitle">
        Meetup Title
        <input
          type="text"
          name="meetupTitle"
          id="meetupTitle"
          required
          value={formData.meetupTitle}
          onChange={(e) => formDataHandler(e)}
        />
      </label>

      <label htmlFor="meetupImage">
        Meetup Image
        <input
          type="text"
          name="meetupImage"
          id="meetupImage"
          required
          value={formData.meetupImage}
          onChange={(e) => formDataHandler(e)}
        />
      </label>

      <label htmlFor="city">
        City
        <input
          type="text"
          name="city"
          id="city"
          required
          value={formData.city}
          onChange={(e) => formDataHandler(e)}
        />
      </label>

      <label htmlFor="street">
        Street
        <input
          type="text"
          name="street"
          id="street"
          required
          value={formData.street}
          onChange={(e) => formDataHandler(e)}
        />
      </label>

      <label htmlFor="number">
        Number
        <input
          type="text"
          name="number"
          id="number"
          required
          value={formData.number}
          onChange={(e) => formDataHandler(e)}
        />
      </label>

      <label htmlFor="description">
        Description
        <textarea
          name="description"
          id="description"
          required
          value={formData.description}
          onChange={(e) => formDataHandler(e)}
        />
      </label>
      {!submitStatusMessage ? null : <span>{submitStatusMessage}</span>}
      <button className={styles.addMeetupButton} type="submit">
        {isSubmitInProgress ? <div className={styles.spinner} /> : 'Add Meetup'}
      </button>
    </form>
  );
};

export default NewMeetupForm;
