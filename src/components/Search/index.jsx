import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import useDebounce from '../../hooks/useDebounce';

import styles from './styles.module.scss';

const Search = ({ className, searchQuery, ...rest }) => {
  const [query, setQuery] = useState(searchQuery);
  const history = useHistory();

  const debouncedSearchQueryValue = useDebounce(query, 500);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearchQueryValue) {
      params.append('search', debouncedSearchQueryValue);
    } else {
      params.delete('search');
    }
    history.push({ search: params.toString() });
  }, [debouncedSearchQueryValue, history]);

  const onChange = ({ target: { value } }) => setQuery(value);

  return (
    <div className={className}>
      <input className={styles.search} onChange={onChange} value={query} {...rest} />
    </div>
  );
};

Search.propTypes = {
  className: PropTypes.string,
  searchQuery: PropTypes.string,
};

Search.defaultProps = {
  className: '',
  searchQuery: '',
};

export default Search;
