import PropTypes from 'prop-types';

import InputContainer from '../InputContainer';

import styles from './styles.module.scss';

const TextAreaInput = ({ label, field, form: { touched, errors } }) => {
  const { name } = field;
  const isError = !!(touched[name] && errors[name]);
  return (
    <InputContainer field={field} label={label}>
      <textarea
        name={name}
        className={`${styles.field} ${isError ? styles.fieldError : ''}`}
        value=""
        {...field}
      />
    </InputContainer>
  );
};

TextAreaInput.propTypes = {
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

TextAreaInput.defaultProps = {
  label: '',
};

export default TextAreaInput;
