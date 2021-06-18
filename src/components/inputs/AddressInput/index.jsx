import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import places from 'places.js';

import InputContainer from '../InputContainer';

import styles from './styles.module.scss';

const AddressInput = ({ field, form: { touched, errors, setFieldValue }, label, ...rest }) => {
  const addrInputRef = useRef(null);
  const placesAutocomplete = useRef(null);

  const { name } = field;
  const isError = !!(touched[name] && errors[name]);

  // TODO destructuring current
  useEffect(() => {
    if (addrInputRef && !placesAutocomplete.current)
      placesAutocomplete.current = places({
        container: addrInputRef.current && addrInputRef.current,
      });
  }, [addrInputRef, placesAutocomplete]);

  if (placesAutocomplete.current && placesAutocomplete.current.once) {
    placesAutocomplete.current.once('change', (e) => setFieldValue(name, e.suggestion.value));
  }

  return (
    <InputContainer field={field} label={label}>
      <input
        {...field}
        className={`${styles.field} ${isError ? styles.fieldError : ''}`}
        type="search"
        id="address-input"
        ref={addrInputRef}
        {...rest}
      />
    </InputContainer>
  );
};

AddressInput.propTypes = {
  label: PropTypes.string,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    errors: PropTypes.object,
    touched: PropTypes.object,
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
};

AddressInput.defaultProps = {
  label: '',
};

export default AddressInput;
