import React from 'react';
import Meetup from '../../types/Meetup';
import MeetupListProps from '../../types/props/MeetupListProps';
import MeetupCard from '../meetupCard/MeetupCard';
import styles from './meetupList.module.scss';

const MeetupList = ({ meetupsArray }: MeetupListProps) => {
  const meetupsCards = meetupsArray.map((meetup: Meetup) => (
    <div key={meetup.id} className={styles.meetupCardWrapper}>
      <MeetupCard
        id={meetup.id}
        name={meetup.title}
        street={meetup.street}
        city={meetup.city}
        imageSrc={meetup.image_url}
        imageAlt={meetup.title}
      />
    </div>
  ));
  return <div>{meetupsCards}</div>;
};

export default MeetupList;
