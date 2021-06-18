import FlatButton from '../../buttons/FlatButton';

import styles from './styles.module.scss';

const StepWizardNotification = ({ onLoadData = () => {}, onClearData = () => {} }) => (
  <div className={styles.wrapper}>
    It seems like you did not finish creating new user. Do you want to continue?
    <div className={styles.buttonsWrapper}>
      <FlatButton onClick={onLoadData} variant="success">
        Continue
      </FlatButton>
      <FlatButton onClick={onClearData} variant="cancel">
        Cancel
      </FlatButton>
    </div>
  </div>
);

export default StepWizardNotification;
