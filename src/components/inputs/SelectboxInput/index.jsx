import { useCallback } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import InputContainer from '../InputContainer';

import styles from './styles.module.scss';

const SelectboxInput = ({
  form: { touched, errors, setFieldValue, setFieldTouched },
  label,
  field,
  isMulti,
  valuesList,
}) => {
  const { name, value } = field;
  const isError = !!(touched[name] && errors[name]);

  const setValue = useCallback(() => {
    if (isMulti) return valuesList.filter((opt) => value.indexOf(opt.value) >= 0);
    return valuesList.find((opt) => opt.value === value);
  }, [isMulti, value, valuesList]);

  const onValueChange = (valList) =>
    setFieldValue(name, isMulti ? valList.map(({ value: val }) => val) : valList.value);

  const onBlur = () => setFieldTouched(name, true);

  return (
    <InputContainer field={field} label={label}>
      <Select
        label={label}
        options={valuesList}
        required
        name={name}
        {...field}
        value={setValue()}
        onChange={onValueChange}
        onBlur={onBlur}
        classNamePrefix={isError ? styles.selectError : styles.select}
        className={isError ? styles.selectError : styles.select}
        isMulti={isMulti}
      />
    </InputContainer>
  );
};

SelectboxInput.propTypes = {
  label: PropTypes.string,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.object,
    errors: PropTypes.object,
    setFieldValue: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
  }).isRequired,
  isMulti: PropTypes.bool,
  valuesList: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.any,
    }),
  ).isRequired,
};

SelectboxInput.defaultProps = {
  label: '',
  isMulti: false,
};

export default SelectboxInput;
