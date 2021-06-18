import PropTypes from 'prop-types';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';

import { HOBBIES, SKILLS } from '../../../constants';

import SelectboxInput from '../../inputs/SelectboxInput';
import TextAreaInput from '../../inputs/TextAreaInput';
import CheckboxGroupInput from '../../inputs/CheckboxGroupInput';
import NavButtons from '../../StepWizard/NavButtons';
import FormikForm from '../../FormikForm';

import styles from './styles.module.scss';

const MIN_SKILLS_COUNT = 3;
const MAX_ADD_INFO_LENGTH = 300;

const selectboxValues = SKILLS.map((item) => ({
  value: item,
  label: item,
}));

const validationSchema = Yup.object().shape({
  skills: Yup.array().min(MIN_SKILLS_COUNT, 'Min skills count should be 3'),
  additionalInfo: Yup.string().max(MAX_ADD_INFO_LENGTH, 'Max length is 300'),
});

const CapabilitiesForm = ({ onBack, onNext, isFirst, isLast, isEditing, data }) => {
  const { skills, additionalInfo, myHobbies, ...rest } = data;
  const onSubmit = (values) => onNext({ ...values, ...rest });

  return (
    <Formik
      initialValues={{ skills, additionalInfo, myHobbies }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      <FormikForm>
        <div className={styles.formInner}>
          <div className={styles.fieldsWrapper}>
            <Field
              name="skills"
              label="Skills"
              valuesList={selectboxValues}
              isMulti
              component={SelectboxInput}
            />
            <Field name="additionalInfo" label="Additional Info" component={TextAreaInput} />
          </div>
          <div className={styles.fieldsWrapper}>
            <div className={styles.hobbiesWrapper}>
              <Field
                name="myHobbies"
                label="My Hobbies"
                values={HOBBIES}
                component={CheckboxGroupInput}
              />
            </div>
          </div>
        </div>
        <NavButtons isFirst={isFirst} isLast={isLast} onBack={onBack} isEditing={isEditing} />
      </FormikForm>
    </Formik>
  );
};

CapabilitiesForm.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func.isRequired,
  isFirst: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  // TODO describe data properly
  data: PropTypes.any.isRequired,
};

CapabilitiesForm.defaultProps = {
  onBack: () => {},
};

export default CapabilitiesForm;
