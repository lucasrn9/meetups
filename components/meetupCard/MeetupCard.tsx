import Link from 'next/link';
import { MeetupCardProps } from '../../types/props';
import styles from './meetupCard.module.scss';

const MeetupCard = ({
  id,
  name,
  street,
  city,
  imageSrc,
  imageAlt,
}: MeetupCardProps) => {
  return (
    <div className={styles.meetupCard}>
      <div className={styles.meetupImageWrapper}>
        <img className={styles.meetupImage} src={imageSrc} alt={imageAlt} />
      </div>
      <div className={styles.meetupDetails}>
        <h2 className={styles.meetupTitle}>{name}</h2>
        <span className={styles.meetupLocation}>
          {street}, {city}
        </span>
      </div>
      <Link href={`/meetup-details/${id}`}>
        <button className={styles.detailsButton} type="button">
          Show Details
        </button>
      </Link>
    </div>
  );
};
export default MeetupCard;
