import PropTypes from 'prop-types';
import FlatButton from '../../buttons/FlatButton';

import styles from './styles.module.scss';

const NavButtons = ({ isFirst, isLast, onBack, isEditing }) => (
  <div
    className={`${styles.wrapper} ${(isFirst || isLast || isEditing) && styles.wrapperOneButton}`}
  >
    {!isFirst && !isEditing && (
      <FlatButton type="button" variant="cancel" onClick={onBack} title="Back" />
    )}
    {isLast || isEditing ? (
      <FlatButton
        variant="success"
        className={styles.next}
        title={isEditing ? 'Update' : 'Finish'}
      />
    ) : (
      <FlatButton variant="primary" className={styles.next} title="Forward" />
    )}
  </div>
);

NavButtons.propTypes = {
  isFirst: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default NavButtons;
