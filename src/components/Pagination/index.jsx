import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import FlatButton from '../buttons/FlatButton';

import styles from './styles.module.scss';

const Pagination = ({ onNavigation, total, limit: limitByPage, query }) => {
  const [numberOfEntriesToSkip, setNumberOfEntriesToSkip] = useState(0);

  const nextPage = () => {
    setNumberOfEntriesToSkip((data) => data + limitByPage);
  };

  const previousPage = () => {
    setNumberOfEntriesToSkip((data) => data - limitByPage);
  };

  useEffect(() => {
    onNavigation(numberOfEntriesToSkip, limitByPage);
  }, [numberOfEntriesToSkip, limitByPage, onNavigation, total]);

  useEffect(() => {
    if (!(total % limitByPage) && total < numberOfEntriesToSkip + limitByPage) {
      setNumberOfEntriesToSkip(numberOfEntriesToSkip - limitByPage);
    }
  }, [limitByPage, numberOfEntriesToSkip, total]);

  useEffect(() => {
    setNumberOfEntriesToSkip(0);
  }, [query]);

  return (
    <div className={styles.wrapper}>
      <FlatButton onClick={previousPage} disabled={!numberOfEntriesToSkip}>
        Previous Page
      </FlatButton>
      <FlatButton onClick={nextPage} disabled={numberOfEntriesToSkip + limitByPage >= total}>
        Next Page
      </FlatButton>
    </div>
  );
};

Pagination.propTypes = {
  onNavigation: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  limit: PropTypes.number,
  query: PropTypes.string,
};

Pagination.defaultProps = {
  limit: 5,
  query: '',
};

export default Pagination;
