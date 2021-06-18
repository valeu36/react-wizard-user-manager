import PropTypes from 'prop-types';

import InputContainer from '../InputContainer';

import styles from './styles.module.scss';

const CheckboxGroupInput = ({ form: { setFieldValue, setFieldTouched }, label, field, values }) => {
  const { name, value } = field;

  const onInputChange = (e) => {
    if (e.target.checked) {
      setFieldValue(name, [...value, e.target.value]);
    } else {
      setFieldValue(
        name,
        value.filter((item) => item !== e.target.value),
      );
    }
    setFieldTouched(name, true);
  };
  return (
    <InputContainer field={field} label={label}>
      <ul>
        {values.map((item, index) => (
          <li key={item} className={styles.checkboxWrapper}>
            <label htmlFor={`${name}_${index}`}>
              <input
                type="checkbox"
                id={`${name}_${index}`}
                name={`${name}_${index}`}
                checked={field.value.includes(item)}
                value={item}
                onChange={onInputChange}
              />
              {item}
            </label>
          </li>
        ))}
      </ul>
    </InputContainer>
  );
};

CheckboxGroupInput.propTypes = {
  label: PropTypes.string,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
  }).isRequired,
  values: PropTypes.array.isRequired,
};

CheckboxGroupInput.defaultProps = {
  label: '',
};

export default CheckboxGroupInput;
