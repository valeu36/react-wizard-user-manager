import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const CategoryBlock = ({ title, value }) => (
  <div className={styles.block}>
    <div className={styles.title}>{title}:</div>
    <div className={styles.value}>{value}</div>
  </div>
);

CategoryBlock.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
};

CategoryBlock.defaultProps = {
  title: '',
  value: '',
};

export default CategoryBlock;
