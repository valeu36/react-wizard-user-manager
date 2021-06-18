import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import { ICONS } from '../../../../constants';

import Avatar from '../../../../components/Avatar';
import IconButton from '../../../../components/buttons/IconButton';

import styles from './styles.module.scss';

const UserRow = ({ user, index, selectedRow, onRowChange, onUserEdit, onUserDelete }) => {
  const isSelected = index === selectedRow;
  const { id, avatar, firstName, lastName, userName, company, phoneNumbers, email, lastUpdate } =
    user;
  const [firstPhone] = phoneNumbers || [];
  return (
    <tr className={`${styles.row} ${isSelected ? styles.rowSelected : ''}`}>
      <td>
        <Avatar className={styles.avatar} image={avatar} />
      </td>
      <td>
        {`${firstName} ${lastName}`}
        <div className={styles.username}>{userName}</div>
      </td>
      <td>{company}</td>
      <td>{firstPhone || email}</td>
      <td>{formatDistanceToNow(Date.parse(lastUpdate))} ago</td>
      <td>
        <IconButton
          onClick={onUserEdit(id)}
          icon={ICONS.pen}
          width={12}
          height={12}
          disabled={isSelected}
          className={styles.edit}
        />
      </td>
      <td>
        <IconButton
          onClick={onRowChange(index)}
          icon={ICONS.times}
          disabled={isSelected}
          className={styles.delete}
          width={12}
          height={12}
        />
      </td>
      {isSelected && (
        <td>
          <IconButton
            icon={ICONS.times}
            width={12}
            height={12}
            type="button"
            className={styles.deleteConfirm}
            onClick={onUserDelete(id)}
          >
            delete
          </IconButton>
        </td>
      )}
    </tr>
  );
};

UserRow.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    phoneNumbers: PropTypes.array,
    email: PropTypes.string.isRequired,
    lastUpdate: PropTypes.oneOfType([PropTypes.instanceOf(Date).isRequired, PropTypes.string]),
  }),
  onUserDelete: PropTypes.func,
  onUserEdit: PropTypes.func,
  onRowChange: PropTypes.func,
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  selectedRow: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

UserRow.defaultProps = {
  user: {
    avatar: null,
    phoneNumbers: [],
  },
  onUserDelete: () => {},
  onUserEdit: () => {},
  onRowChange: () => {},
  selectedRow: null,
};

export default UserRow;
