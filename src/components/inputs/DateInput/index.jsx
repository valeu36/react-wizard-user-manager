import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

import InputContainer from '../InputContainer';

import styles from './styles.module.scss';

const DateInput = ({
  field,
  form: { touched, errors, setFieldValue, setFieldTouched },
  label,
  ...rest
}) => {
  const { name, value } = field;
  const isError = !!(touched[name] && errors[name]);

  // TODO remove setFieldTouched
  const onDateChange = (val) => {
    setFieldTouched(name, true, true);
    setFieldValue(name, val && val.toISOString());
  };

  const onDateBlur = () => setFieldTouched(name, true, true);

  return (
    <InputContainer label={label} field={field}>
      <DatePicker
        className={`${styles.field} ${isError ? styles.fieldError : ''}`}
        wrapperClassName={styles.wrapper}
        wrapp
        // TODO check select prop
        selected={(value && new Date(value)) || null}
        onChange={onDateChange}
        // TODO check format and remove placeholder
        placeholderText="DD/MM/YYYY"
        dateFormat="dd/MM/yyyy"
        name={name}
        showYearDropdown
        maxDate={new Date()}
        autoComplete="off"
        onBlur={onDateBlur}
        {...rest}
      />
    </InputContainer>
  );
};

DateInput.propTypes = {
  label: PropTypes.string,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  }).isRequired,
  form: PropTypes.shape({
    errors: PropTypes.object,
    touched: PropTypes.object,
    setFieldValue: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
  }).isRequired,
};

DateInput.defaultProps = {
  label: '',
};

export default DateInput;
