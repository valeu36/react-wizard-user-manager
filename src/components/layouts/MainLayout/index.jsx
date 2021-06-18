import PropTypes from 'prop-types';

import Header from '../../Header';

import styles from './styles.module.scss';

const MainLayout = ({ children }) => (
  <div className={styles.layout}>
    <Header />
    <div className={styles.layoutInner}>{children}</div>
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
