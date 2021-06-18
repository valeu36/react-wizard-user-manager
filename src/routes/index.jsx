import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { ROUTES } from '../constants';

import MainLayout from '../components/layouts/MainLayout';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import UserPage from '../pages/users/UserPage';
import UsersPage from '../pages/users/UsersPage';
import EditUserPage from '../pages/users/EditUserPage';
import NewUserPage from '../pages/users/NewUserPage';

const Routes = () => (
  <BrowserRouter>
    <MainLayout>
      <Switch>
        <Route exact path={ROUTES.home} component={HomePage} />
        <Route path={ROUTES.newUser} component={NewUserPage} />Z
        <Route exact path={ROUTES.user()} component={UserPage} />
        <Route exact path={ROUTES.users} component={UsersPage} />
        <Route path={ROUTES.editUser()} component={EditUserPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </MainLayout>
  </BrowserRouter>
);

export default Routes;
