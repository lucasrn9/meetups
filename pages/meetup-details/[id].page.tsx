import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { MeetupDetailsCard } from '../../components';
import styles from './meetupDetails.module.scss';
import { MeetupDetailsProps } from '../../types/props/MeetupDetailsProps';
import createConnectionPromise from '../../functions/createConnectionPromise';

const MeetupDetails = ({ meetups }: MeetupDetailsProps) => {
  const router = useRouter();
  if (router.isFallback) return <h1>Loading...</h1>;
  if (meetups[0].error) return <h1>404</h1>;
  const meetup = meetups[0];

  return (
    <>
      <Head>
        <title>{meetup.title}</title>
        <meta name="description" content={meetup.description} />
      </Head>
      <main className={styles.main}>
        <MeetupDetailsCard
          title={meetup.title as string}
          image={meetup.image_url as string}
          city={meetup.city as string}
          street={meetup.street as string}
          number={meetup.number as string}
          description={meetup.description as string}
        />
      </main>
    </>
  );
};

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: '23' } },
      { params: { id: '24' } },
      { params: { id: '25' } },
    ],
    fallback: true,
  };
};
export const getStaticProps: GetStaticProps = async (context) => {
  const meetupId = context.params!.id;
  const connectionPromise = createConnectionPromise();
  const sqlQuery =
    'SELECT title,image_url,street,city,number,description FROM meetup WHERE id = ?';
  try {
    const result = await connectionPromise.query(sqlQuery, meetupId);
    if (result[0].toLocaleString().length === 0) {
      connectionPromise.end();
      return {
        props: {
          meetups: [{ error: 'No results found for this id' }],
        },
      };
    }
    connectionPromise.end();
    return {
      props: {
        meetups: result[0],
      },
    };
  } catch {
    connectionPromise.end();
    return {
      props: {
        meetups: [{ error: 'something in your request went wrong' }],
      },
    };
  }
};

export default MeetupDetails;

// export const getStaticProps: GetStaticProps = async (context) => {
//   const meetupId = context.params!.id;
//   try {
//     const res = await axios.get(
//       `http://localhost:3000/api/meetups/${meetupId}`
//     );
//     const meetup = res.data.results[0];
//     return {
//       props: {
//         meetup,
//       },
//     };
//   } catch {
//     return {
//       props: {
//         meetup: { error: 'error' },
//       },
//     };
//   }
// };
