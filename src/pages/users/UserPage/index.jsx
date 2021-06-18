import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchUser } from '../../../store/user';

import { ICONS, ROUTES } from '../../../constants';

import UserProfile from './UserProfile';
import LinkButton from '../../../components/buttons/LinkButton';
import PageLayout from '../../../components/layouts/PageLayout';

import styles from './styles.module.scss';
import Loader from '../../../components/Loader';

const UsersPage = () => {
  const { id } = useParams();
  const { user, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { userName } = user || {};

  useEffect(() => {
    dispatch(fetchUser(id));
  }, [dispatch, id]);

  return (
    <PageLayout title={userName || ''}>
      {isLoading && <Loader />}
      {user && (
        <>
          <LinkButton
            to={ROUTES.users}
            className={styles.button}
            width={24}
            height={24}
            icon={ICONS.chevronLeft}
          >
            User List
          </LinkButton>
          <UserProfile user={user} />
        </>
      )}
    </PageLayout>
  );
};

export default UsersPage;
