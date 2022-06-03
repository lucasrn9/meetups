import NewMeetupForm from '../../components/NewMeetupForm/NewMeetupForm';
import NewMeetupFormData from '../../types/props/NewMeetupFormData';
import styles from './addMeetup.module.scss';

const AddNewMeetupPage = () => {
  const submitHandler = (
    formData: NewMeetupFormData,
    setStatusmessage: (value: string | PromiseLike<string>) => void
  ) => {
    setTimeout(() => {
      try {
        console.log(formData);
        setStatusmessage('Your New Meetup Was Created');
      } catch {
        setStatusmessage(
          'Error On Creating a New Meetup, Please Try Again Later'
        );
      }
    }, 5000);
  };

  return (
    <main className={styles.main}>
      <div className={styles.newMeetupFormWrapper}>
        <NewMeetupForm submitHandler={submitHandler} />
      </div>
    </main>
  );
};

export default AddNewMeetupPage;
