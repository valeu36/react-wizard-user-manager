import PropTypes from 'prop-types';

import StepWizardTab from '../StepWizardTab';

import styles from './styles.module.scss';

const StepWizardHeader = ({ steps }) => (
  <div className={styles.headerWrapper}>
    {steps.map(({ isActive, isDisabled, title, path, key }) => (
      <StepWizardTab isActive={isActive} disabled={isDisabled} to={path} key={key} title={title} />
    ))}
  </div>
);

StepWizardHeader.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      isActive: PropTypes.bool.isRequired,
      isDisabled: PropTypes.bool.isRequired,
      path: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default StepWizardHeader;
