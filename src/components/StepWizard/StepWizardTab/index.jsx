import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

const StepWizardTab = ({ className, isActive, title, ...rest }) => (
  <Link className={`${styles.tab} ${isActive ? styles.tabActive : ''} ${className}`} {...rest}>
    {title}
  </Link>
);

StepWizardTab.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

StepWizardTab.defaultProps = {
  title: '',
  className: '',
};

export default StepWizardTab;
