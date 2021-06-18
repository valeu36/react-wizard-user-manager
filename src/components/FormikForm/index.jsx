import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormikContext, Form } from 'formik';
import { useSelector } from 'react-redux';

import styles from './styles.module.scss';

const FormikForm = ({ children, className, ...rest }) => {
  const { setFieldError } = useFormikContext();
  const { error } = useSelector((state) => state.form);

  useEffect(() => {
    if (error) {
      const { field, message } = error;
      setFieldError(field, message);
    }
  }, [error, setFieldError]);

  return (
    <Form className={`${styles.form} ${className}`} {...rest}>
      {children}
    </Form>
  );
};

FormikForm.propTypes = {
  className: PropTypes.string,
};

FormikForm.defaultProps = {
  className: '',
};

export default FormikForm;
