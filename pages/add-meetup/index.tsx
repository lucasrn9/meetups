import { useState } from 'react';
import NewMeetupForm from '../../components/NewMeetupForm/NewMeetupForm';
import NewMeetupFormData from '../../types/props/NewMeetupFormData';
import styles from './addMeetup.module.scss';

const AddNewMeetupPage = () => {
  const [isSubmitInProgress, setIsSubmitInProgress] = useState(false);
  const [submitStatusMessage, setSubmitStatusMessage] = useState<string>();

  const submitHandler = (formData: NewMeetupFormData) => {
    setIsSubmitInProgress(true);

    setTimeout(() => {
      try {
        console.log(formData);
        throw new Error();
        setIsSubmitInProgress(false);
        setSubmitStatusMessage('Your New Meetup Was Created');
      } catch {
        setSubmitStatusMessage(
          'Error On Creating a New Meetup, Please Try Again Later'
        );
        setIsSubmitInProgress(false);
      }
    }, 5000);
  };

  return (
    <main className={styles.main}>
      <div className={styles.newMeetupFormWrapper}>
        <NewMeetupForm
          submitHandler={submitHandler}
          isSubmitInProgress={isSubmitInProgress}
          submitStatusMessage={submitStatusMessage}
        />
      </div>
    </main>
  );
};

export default AddNewMeetupPage;
