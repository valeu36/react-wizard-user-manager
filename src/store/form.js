import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import NewUserTable from '../db/NewUserTable';
import UsersTable from '../db/UsersTable';

const initialUserData = {
  id: '',
  userName: '',
  password: '',
  repeatPassword: '',
  avatar: null,
  firstName: '',
  lastName: '',
  email: '',
  birthDate: '',
  gender: '',
  address: '',
  company: '',
  githubLink: '',
  facebookLink: '',
  mainLanguage: '',
  fax: '',
  phoneNumbers: [''],
  skills: [],
  additionalInfo: '',
  myHobbies: [],
  lastStep: '',
};

export const updateFormData = createAsyncThunk(
  'form/updateFormData',
  async (form, { rejectWithValue }) => {
    const { userName, email } = form;

    if (userName) {
      const isUserNameExists = await UsersTable.getByUserName(userName);
      if (isUserNameExists) {
        return rejectWithValue({ field: 'userName', message: 'User Name should be unique' });
      }
    }

    if (email) {
      const isEmailExists = await UsersTable.getByEmail(email);
      if (isEmailExists) {
        return rejectWithValue({ field: 'email', message: 'Email should be unique' });
      }
    }

    const data = await NewUserTable.updateFormData(form);
    return data;
  },
);

export const fetchFormData = createAsyncThunk('form/fetchFormData', async () => {
  const data = await NewUserTable.getFormData();
  if (data) {
    return data;
  }
  return null;
});

export const clearFormData = createAsyncThunk('form/clearFormData', async () => {
  await NewUserTable.clearFormData();
});

export const checkFormDataStep = createAsyncThunk('form/checkFormDataStep', async () => {
  const { lastStep } = await NewUserTable.getFormData();
  return lastStep;
});

const form = createSlice({
  name: 'form',
  initialState: {
    user: initialUserData,
    hasUnsavedData: false,
    error: null,
  },
  reducers: {
    setError: (state, action) => ({ ...state, error: action.payload }),
    resetError: (state) => ({ ...state, error: null }),
    setHasUnsavedData: (state, action) => ({ ...state, hasUnsavedData: action.payload }),
  },
  extraReducers: {
    [updateFormData.fulfilled]: (state, action) => ({
      ...state,
      user: { ...state.user, ...action.payload },
    }),
    [updateFormData.rejected]: (state, action) => {
      const { message } = action.payload;
      toast.error(message);
      return { ...state, error: action.payload };
    },
    [fetchFormData.fulfilled]: (state, action) => ({
      ...state,
      user: { ...state.user, ...action.payload },
    }),
    [clearFormData.fulfilled]: (state) => ({
      ...state,
      user: initialUserData,
      hasUnsavedData: false,
    }),
    [checkFormDataStep.fulfilled]: (state, action) => ({
      ...state,
      user: { ...state.user, lastStep: action.payload },
      hasUnsavedData: !!action.payload,
    }),
  },
});

export const { setError, setHasUnsavedData } = form.actions;

export default form.reducer;
