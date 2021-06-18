import PropTypes from 'prop-types';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';

import { LANGUAGES_LIST } from '../../../constants';

import TextInput from '../../inputs/TextInput';
import FaxInput from '../../inputs/FaxInput';
import PhoneGroupInput from '../../inputs/PhoneGroupInput';
import NavButtons from '../../StepWizard/NavButtons';
import SelectboxInput from '../../inputs/SelectboxInput';
import FormikForm from '../../FormikForm';

import styles from './styles.module.scss';

const selectboxList = Object.entries(LANGUAGES_LIST).map(([, value]) => ({
  value,
  label: value,
}));

const urlRegex =
  /((?:(?:http?|ftp)[s]*:\/\/)?[a-z0-9-%&=?.]+\.[a-z]{2,4}\/?([^\s<>#%",{}\\|^[\]`]+)?)/gi;

const validationSchema = Yup.object().shape({
  company: Yup.string().required('Required'),
  githubLink: Yup.string().matches(urlRegex, 'Url is invalid').required('Required'),
  facebookLink: Yup.string().matches(urlRegex, 'Url is invalid').required('Required'),
  mainLanguage: Yup.mixed().required('Required'),
  fax: Yup.string().required('Required'),
  // TODO add phone length validation and check if phones are save
  phoneNumbers: Yup.array().of(Yup.string().required('Required')).required('Required'),
});

const ContactsForm = ({ onBack, onNext, isFirst, isLast, isEditing, data }) => {
  const { company, githubLink, facebookLink, mainLanguage, fax, phoneNumbers, ...rest } = data;
  const onSubmit = (values) => onNext({ ...values, ...rest });
  return (
    <Formik
      initialValues={{ company, githubLink, facebookLink, mainLanguage, fax, phoneNumbers }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      <FormikForm>
        <div className={styles.formInner}>
          <div className={styles.fieldsWrapper}>
            <Field name="company" label="Company" component={TextInput} />
            <Field
              name="githubLink"
              label="Github Link"
              placeholder="github.com/name"
              component={TextInput}
            />
            <Field
              name="facebookLink"
              label="Facebook Link"
              placeholder="www.facebook.com/your_id"
              component={TextInput}
            />
            <Field
              name="mainLanguage"
              label="Main Language"
              valuesList={selectboxList}
              component={SelectboxInput}
            />
          </div>
          <div className={styles.fieldsWrapper}>
            <Field name="fax" label="Fax" component={FaxInput} />
            <PhoneGroupInput />
          </div>
        </div>
        <NavButtons isFirst={isFirst} isLast={isLast} onBack={onBack} isEditing={isEditing} />
      </FormikForm>
    </Formik>
  );
};

ContactsForm.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func.isRequired,
  isFirst: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  // TODO describe data properly
  data: PropTypes.any.isRequired,
};

ContactsForm.defaultProps = {
  onBack: () => {},
};

export default ContactsForm;
