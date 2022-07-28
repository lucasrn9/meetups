import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { MeetupList } from '../components';
import styles from './Home.module.scss';
import HomeProps from '../types/props/Home';
import Meetup from '../types/Meetup';
import createConnectionPromise from '../functions/createConnectionPromise';

const Home: NextPage<HomeProps> = ({ meetups }) => {
  return (
    <>
      <Head>
        <title>Fake Meetups</title>
        <meta name="description" content="A website to create fake meetups" />
      </Head>
      {meetups.error ? (
        <h1>Meetups couldn&apos;t be loaded, try again later</h1>
      ) : (
        <main className={styles.main}>
          <div className={styles.meetupsList}>
            <MeetupList meetupsArray={meetups.meetupsArray as Meetup[]} />
          </div>
        </main>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const connectionPromise = createConnectionPromise();
  const sqlQuery =
    'SELECT id,title,image_url,street,city,number,description FROM meetup';
  try {
    const result = await connectionPromise.query(sqlQuery);
    connectionPromise.end();
    return {
      props: {
        meetups: { meetupsArray: result[0] },
      },
    };
  } catch {
    connectionPromise.end();
    return {
      props: {
        meetups: { error: 'Internal Error' },
      },
    };
  }
};

// export const getStaticProps: GetStaticProps = async () => {
//   try {
//     const res = await axios.get<MeetupsApiGetResponse>(
//       'http://localhost:3000/api/meetups'
//     );
//     const meetups = res.data.results;
//     return {
//       props: {
//         meetups,
//       },
//       // revalidate: 10 ISR
//     };
//   } catch {
//     return {
//       props: {
//         meetups: ['error'],
//       },
//     };
//   }
// };

// export const getServerSideProps: GetServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
// const req = context.req
// const res = context.res
//   return {
//     props: {
//       // props...
//     },
//   };
// };

export default Home;
