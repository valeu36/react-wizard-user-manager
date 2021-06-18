import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const ButtonVariants = ['primary', 'cancel', 'success'];

const FlatButton = ({ variant, children, className, title, ...props }) => (
  <button className={`${styles.button} ${styles[variant]} ${className}`} {...props}>
    {title || children}
  </button>
);

FlatButton.propTypes = {
  children: PropTypes.string,
  variant: PropTypes.oneOf(ButtonVariants),
  className: PropTypes.string,
  title: PropTypes.string,
};

FlatButton.defaultProps = {
  children: '',
  title: '',
  variant: 'primary',
  className: '',
};

export default FlatButton;
