import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';

import {
  checkFormDataStep,
  clearFormData,
  fetchFormData,
  setHasUnsavedData,
  updateFormData,
} from '../../../store/form';
import { addUser } from '../../../store/user';
import { ROUTES } from '../../../constants';

import PageLayout from '../../../components/layouts/PageLayout';
import UserStepWizard from '../../../components/UserStepWizard';

const NewUserPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { user, hasUnsavedData } = useSelector((state) => state.form);

  const onForward = (values) => dispatch(updateFormData(values)).then(unwrapResult);

  const onFinish = (values) => {
    dispatch(addUser(values));
    dispatch(clearFormData());
    history.push(ROUTES.users);
  };

  const loadData = useCallback(() => {
    dispatch(fetchFormData());
    dispatch(setHasUnsavedData(false));
  }, [dispatch]);

  const clearData = useCallback(() => {
    dispatch(clearFormData());
  }, [dispatch]);

  const checkFormData = useCallback(() => {
    dispatch(checkFormDataStep());
  }, [dispatch]);

  useEffect(() => {
    checkFormData();
  }, [checkFormData]);

  return (
    <PageLayout title="New User Page">
      <UserStepWizard
        data={user}
        onForward={onForward}
        onFinish={onFinish}
        hasUnsavedData={hasUnsavedData}
        onLoadData={loadData}
        onClearData={clearData}
      />
    </PageLayout>
  );
};

export default NewUserPage;
