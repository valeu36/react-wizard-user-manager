import { useEffect, useState } from 'react';
import { Field, Formik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { MEGABYTE } from '../../../constants';

import TextInput from '../../inputs/TextInput';
import PasswordInput from '../../inputs/PasswordInput';
import Avatar from '../../Avatar';
import ImageUploader from '../../ImageUploader';
import NavButtons from '../../StepWizard/NavButtons';
import FormikForm from '../../FormikForm';

import styles from './styles.module.scss';

const MAX_IMG_SIZE = MEGABYTE;

const SUPPORTED_FORMATS = new Set([
  'image/jpg',
  'image/jpeg',
  'image/svg',
  'image/gif',
  'image/png',
]);

const validationSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, 'User Name is too short')
    .max(70, 'User Name is too long')
    .required('Required'),
  password: Yup.string()
    .required('Please, enter a password')
    .min(8, 'Password should be at least 8 characters long'),
  repeatPassword: Yup.string()
    .required('Please, repeat entered password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  avatar: Yup.mixed()
    .test('fileSize', 'File too large', (value) => {
      const { size } = value || {};
      return size ? size <= MAX_IMG_SIZE : true;
    })
    .test('fileFormat', 'Unsupported Format', (value) => {
      const { type } = value || {};
      return type ? SUPPORTED_FORMATS.has(type) : true;
    }),
});

const AccountForm = ({ onBack, onNext, isFirst, isLast, isEditing, data }) => {
  const { userName, password, repeatPassword, avatar, ...rest } = data;
  const [imageSrc, setImageSrc] = useState(avatar);
  const onSubmit = (values) => onNext({ ...values, ...rest });

  useEffect(() => {
    if (avatar) {
      setImageSrc(avatar);
    }
  }, [avatar]);

  return (
    <Formik
      initialValues={{ userName, password, repeatPassword, avatar }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      <FormikForm>
        <div className={styles.formInner}>
          <div className={styles.avatarContainer}>
            <Avatar image={imageSrc} />
            <Field
              name="avatar"
              className={styles.avatarButton}
              onChange={setImageSrc}
              component={ImageUploader}
            />
          </div>
          <div className={styles.fieldsContainer}>
            <div>
              <Field name="userName" label="User Name" component={TextInput} />
              <Field name="password" label="Password" component={PasswordInput} />
              <Field name="repeatPassword" label="Repeat Password" component={PasswordInput} />
            </div>
          </div>
        </div>
        <NavButtons isFirst={isFirst} isLast={isLast} onBack={onBack} isEditing={isEditing} />
      </FormikForm>
    </Formik>
  );
};

AccountForm.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func.isRequired,
  isFirst: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  // TODO describe data properly
  data: PropTypes.any.isRequired,
};

AccountForm.defaultProps = {
  onBack: () => {},
};

export default AccountForm;
