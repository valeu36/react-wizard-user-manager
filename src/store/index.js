import { configureStore, combineReducers } from '@reduxjs/toolkit';

import form from './form';
import user from './user';

const reducer = combineReducers({
  form,
  user,
});

const store = configureStore({
  reducer,
});

export default store;
