import { NewMeetupForm } from '../../components';
import NewMeetupFormData from '../../types/NewMeetupFormData';
import styles from './addMeetup.module.scss';

const AddNewMeetupPage = () => {
  const submitHandler = async (formData: NewMeetupFormData) => {
    try {
      console.log(formData);
      await fetch('https://jsonplaceholder.typicode.com/todos/1');
      return {
        message: 'Your New Meetup Was Created',
      };
    } catch {
      return {
        message: 'Error On Creating a New Meetup, Please Try Again Later',
      };
    }
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
