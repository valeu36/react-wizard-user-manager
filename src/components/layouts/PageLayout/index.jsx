import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const PageLayout = ({ title, children }) => (
  <div className={styles.wrapper}>
    <div className={styles.titleWrapper}>
      <h2 className={styles.title}>{title}</h2>
    </div>
    <div className={styles.content}>{children}</div>
  </div>
);

PageLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

PageLayout.defaultProps = {
  title: '',
  children: null,
};

export default PageLayout;
