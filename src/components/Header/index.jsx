import { Link } from 'react-router-dom';

import { ICONS, ROUTES } from '../../constants';

import LinkButton from '../buttons/LinkButton';

import styles from './styles.module.scss';

const Header = () => (
  <div className={styles.header}>
    <div className={styles.headerInner}>
      <Link to={ROUTES.home} className={styles.logo}>
        Remake
      </Link>
      <div className={styles.nav}>
        <LinkButton
          to={ROUTES.newUser}
          icon={ICONS.user}
          className={styles.navButton}
          activeClassName={styles.navButtonActive}
        >
          Add new user
        </LinkButton>
        <LinkButton
          to={ROUTES.users}
          icon={ICONS.userFriends}
          className={styles.navButton}
          activeClassName={styles.navButtonActive}
          exact
        >
          List of users
        </LinkButton>
      </div>
    </div>
  </div>
);

export default Header;
