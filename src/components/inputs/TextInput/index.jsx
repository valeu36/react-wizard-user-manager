import PropTypes from 'prop-types';

import InputContainer from '../InputContainer';

import styles from './styles.module.scss';

const TextInput = ({ field, form: { touched, errors }, label, ...props }) => {
  const { name } = field;
  const isError = !!(touched[name] && errors[name]);
  return (
    <InputContainer label={label} field={field}>
      <input
        className={`${styles.field} ${isError ? styles.fieldError : ''}`}
        type="text"
        {...field}
        {...props}
      />
    </InputContainer>
  );
};

TextInput.propTypes = {
  label: PropTypes.string,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.object,
    errors: PropTypes.object,
  }).isRequired,
};

TextInput.defaultProps = {
  label: '',
};

export default TextInput;
