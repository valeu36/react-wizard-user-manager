import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Icon from '../../Icon';

import styles from './styles.module.scss';

const LinkButton = ({ icon, className, children, width, height, ...rest }) => (
  <NavLink className={`${styles.button} ${className}`} {...rest}>
    {icon && <Icon icon={icon} className={styles.buttonIcon} width={width} height={height} />}
    {children}
  </NavLink>
);

LinkButton.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.string,
};

LinkButton.defaultProps = {
  children: 'Link Button',
  className: '',
  icon: '',
};

export default LinkButton;
