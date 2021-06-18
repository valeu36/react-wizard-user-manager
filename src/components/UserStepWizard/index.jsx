import PropTypes from 'prop-types';

import AccountForm from './AccountForm';
import ProfileForm from './ProfileForm';
import ContactsForm from './ContactsForm';
import CapabilitiesForm from './CapabilitiesForm';
import StepWizard from '../StepWizard';

export const STEPS = [
  {
    component: AccountForm,
    slug: 'account',
    title: 'Account',
  },
  {
    component: ProfileForm,
    slug: 'profile',
    title: 'Profile',
  },
  {
    component: ContactsForm,
    slug: 'contacts',
    title: 'Contacts',
  },
  {
    component: CapabilitiesForm,
    slug: 'capabilities',
    title: 'Capabilities',
  },
];

const UserStepWizard = ({
  data,
  onForward,
  onFinish,
  isEditing,
  hasUnsavedData,
  onLoadData,
  onClearData,
}) => (
  <StepWizard
    data={data}
    steps={STEPS}
    onForward={onForward}
    onFinish={onFinish}
    isEditing={isEditing}
    hasUnsavedData={hasUnsavedData}
    onLoadData={onLoadData}
    onClearData={onClearData}
  />
);

UserStepWizard.propTypes = {
  onForward: PropTypes.func,
  onFinish: PropTypes.func,
  isEditing: PropTypes.bool,
  data: PropTypes.any,
  hasUnsavedData: PropTypes.bool,
  onLoadData: PropTypes.func,
  onClearData: PropTypes.func,
};

UserStepWizard.defaultProps = {
  onForward: () => {},
  onFinish: () => {},
  isEditing: false,
  data: null,
  hasUnsavedData: false,
  onLoadData: () => {},
  onClearData: () => {},
};

export default UserStepWizard;
