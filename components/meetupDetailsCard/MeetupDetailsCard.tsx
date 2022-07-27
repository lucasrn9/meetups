import MeetupDetailsCardProps from '../../types/props/MeetupDetailsCardProps';
import styles from './meetupDetailsCard.module.scss';

const MeetupDetailsCard = ({
  title,
  image,
  city,
  street,
  number,
  description,
}: MeetupDetailsCardProps) => {
  return (
    <div className={styles.meetupDetailsCard}>
      <div className={styles.imgWrapper}>
        <img
          src={image}
          alt={title}
          className={styles.img}
          width="750"
          height="390"
        />
      </div>
      <div className={styles.infos}>
        <h1 className={styles.title}>{title}</h1>
        <span>
          {street}, {number} - {city}
        </span>
        <span className={styles.description}>{description}</span>
      </div>
    </div>
  );
};

export default MeetupDetailsCard;
