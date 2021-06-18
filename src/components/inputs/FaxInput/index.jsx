import { useMemo } from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

import InputContainer from '../InputContainer';

import styles from './styles.module.scss';

const FaxInput = ({ form: { touched, errors, setFieldValue, setFieldTouched }, label, field }) => {
  const { name, value } = field;

  const isError = useMemo(() => {
    const [fieldName, index] = name.split('.');

    //  TODO make it more understandable
    if (index) {
      const parsedIndex = parseInt(index, 10);

      const isExists = !!(
        touched[fieldName] &&
        touched[fieldName][parsedIndex] &&
        errors[fieldName] &&
        errors[fieldName][parsedIndex]
      );

      if (isExists) {
        return !!(touched[fieldName][parsedIndex] && errors[fieldName][parsedIndex]);
      }
    }
    return !!(touched[name] && errors[name]);
  }, [errors, name, touched]);

  return (
    <InputContainer field={field} label={label}>
      <InputMask
        {...field}
        mask="+38 (999) 999-99-99"
        placeholder="+38 (XXX) XXX-XX-XX"
        name={name}
        disabled={false}
        value={value || ''}
        onChange={(e) => setFieldValue(name, e.target.value)}
        onBlur={() => setFieldTouched(name, true)}
        className={`${styles.field} ${isError ? styles.fieldError : ''}`}
      />
    </InputContainer>
  );
};

FaxInput.propTypes = {
  label: PropTypes.string,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
  }).isRequired,
  form: PropTypes.shape({
    errors: PropTypes.object,
    touched: PropTypes.object,
    setFieldValue: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
  }).isRequired,
  fieldIndex: PropTypes.number,
  phoneField: PropTypes.shape({
    name: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  }),
};

FaxInput.defaultProps = {
  label: '',
  fieldIndex: null,
};

export default FaxInput;
