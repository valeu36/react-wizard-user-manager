import { Field, Formik } from 'formik';
import { subYears } from 'date-fns';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { GENDER_INPUT_VALUES } from '../../../constants';

import DateInput from '../../inputs/DateInput';
import RadioGroupInput from '../../inputs/RadioGroupInput';
import AddressInput from '../../inputs/AddressInput';
import TextInput from '../../inputs/TextInput';
import NavButtons from '../../StepWizard/NavButtons';
import FormikForm from '../../FormikForm';

import styles from './styles.module.scss';

const validationSchema = Yup.object().shape({
  // TODO custom validation
  firstName: Yup.string()
    .min(2, 'User Name is too short')
    .max(70, 'User Name is too long')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'User Name Too Short')
    .max(70, 'User Name Too Long')
    .required('Required'),
  email: Yup.string().email('Incorrect email format').required('Required'),
  // TODO Support timezones
  birthDate: Yup.date().max(subYears(Date.now(), 18), 'User must be older 18').required('Required'),
  gender: Yup.string().oneOf(GENDER_INPUT_VALUES).required('Required'),
});

const ProfileForm = ({ onBack, onNext, isFirst, isLast, isEditing, data }) => {
  const { firstName, lastName, email, birthDate, gender, address, ...rest } = data;
  const onSubmit = (values) => onNext({ ...values, ...rest });

  return (
    <Formik
      initialValues={{ firstName, lastName, email, birthDate, gender, address }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      <FormikForm>
        <div className={styles.formInner}>
          <div className={styles.fieldsWrapper}>
            <Field name="firstName" label="First Name" component={TextInput} />
            <Field name="lastName" label="Last Name" component={TextInput} />
            <Field name="birthDate" label="Birth date" component={DateInput} />
          </div>
          <div className={styles.fieldsWrapper}>
            <Field name="email" label="Email" component={TextInput} />
            <Field name="address" label="Address" component={AddressInput} />
            <RadioGroupInput name="gender" values={GENDER_INPUT_VALUES} />
          </div>
        </div>
        <NavButtons isFirst={isFirst} isLast={isLast} onBack={onBack} isEditing={isEditing} />
      </FormikForm>
    </Formik>
  );
};

ProfileForm.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func.isRequired,
  isFirst: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  // TODO describe data properly
  data: PropTypes.any.isRequired,
};

ProfileForm.defaultProps = {
  onBack: () => {},
};

export default ProfileForm;
