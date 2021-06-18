import PropTypes from 'prop-types';

import { ReactComponent as UserPlaceholder } from '../../assets/icons/user-solid.svg';

import styles from './styles.module.scss';

const Avatar = ({ image, className }) => (
  <div className={`${styles.avatarWrapper} ${className}`}>
    {image ? (
      <img className={styles.avatar} src={image} alt="avatar" />
    ) : (
      <div className={`${styles.avatar} ${styles.avatarPlaceholder}`}>
        <UserPlaceholder />
      </div>
    )}
  </div>
);

Avatar.propTypes = {
  image: PropTypes.string,
  className: PropTypes.string,
};

Avatar.defaultProps = {
  image: null,
  className: '',
};

export default Avatar;
