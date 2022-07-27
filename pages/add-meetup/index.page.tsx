import axios, { AxiosError, AxiosResponse } from 'axios';
import Head from 'next/head';
import { ValidationError } from 'yup';
import { NewMeetupForm } from '../../components';
import meetupSchema from '../../schemas/meetup';
import NewMeetupFormData from '../../types/NewMeetupFormData';
import styles from './addMeetup.module.scss';

const AddNewMeetupPage = () => {
  const submitHandler = async (formData: NewMeetupFormData) => {
    let validatedData;
    try {
      validatedData = await meetupSchema.validate(formData);
    } catch (err) {
      return { error: err as ValidationError };
    }

    try {
      await axios.post('/api/new-meetup', validatedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return {
        message: 'Your New Meetup Was Created',
      };
    } catch (err) {
      const error = err as AxiosError;
      const response = error.response as AxiosResponse;
      if (response.status === 429) {
        return {
          message:
            'You have created too many meetups, please try again in a few hours',
        };
      }
      return {
        message: 'Error On Creating a New Meetup, Please Try Again Later',
      };
    }
  };

  return (
    <>
      <Head>
        <title>Add Meetup</title>
        <meta name="description" content="Add a new meetup" />
      </Head>
      <main className={styles.main}>
        <div className={styles.newMeetupFormWrapper}>
          <NewMeetupForm submitHandler={submitHandler} />
        </div>
      </main>
    </>
  );
};

export default AddNewMeetupPage;
