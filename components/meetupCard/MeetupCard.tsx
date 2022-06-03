import Image from 'next/image';
import Link from 'next/link';
import { MeetupCardProps } from '../../types/props';
import styles from './meetupCard.module.scss';

const MeetupCard = ({
  name,
  street,
  city,
  imageSrc,
  imageAlt,
}: MeetupCardProps) => {
  const meetupUrl = name.trim().toLowerCase().replace(/ /g, '-');
  return (
    <div className={styles.meetupCard}>
      <div className={styles.meetupImageWrapper}>
        <Image
          className={styles.meetupImage}
          src={imageSrc}
          alt={imageAlt}
          width={650}
          height={400}
        />
      </div>
      <div className={styles.meetupDetails}>
        <h2 className={styles.meetupTitle}>{name}</h2>
        <span className={styles.meetupLocation}>
          {street}, {city}
        </span>
      </div>
      <Link href={`/meetup-details/${meetupUrl}`}>
        <button className={styles.detailsButton} type="button">
          Show Details
        </button>
      </Link>
    </div>
  );
};
export default MeetupCard;
