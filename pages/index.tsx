import type { NextPage } from 'next';
import MeetupCard from '../components/meetupCard/MeetupCard';
import styles from './Home.module.css';

const Home: NextPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.meetupsList}>
        <MeetupCard
          name="test meetup"
          street="test street"
          city="test city"
          imageSrc="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-688899881-1519413300.jpg"
          imageAlt="testAlt"
        />
      </div>
    </main>
  );
};

export default Home;
