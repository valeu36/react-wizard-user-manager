import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { setError } from './form';
import { generateFakeUsers } from '../utils/accountGenerator';

import UsersTable from '../db/UsersTable';

export const addUser = createAsyncThunk(
  'user/addUser',
  async (user, { rejectWithValue, dispatch }) => {
    try {
      const data = await UsersTable.addUser(user);
      const { error } = data;
      if (error) {
        dispatch(setError(error));
        return rejectWithValue(error);
      }
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const fetchUsers = createAsyncThunk('user/fetchUsers', async ({ skip, limit, query }) => {
  const [data, total] = await UsersTable.getUsers({ skip, limit, query });
  return { data, total };
});

export const fetchUser = createAsyncThunk('user/fetchUser', async (id, { rejectWithValue }) => {
  try {
    const data = await UsersTable.getUser(id);
    const { error } = data;
    if (error) {
      return rejectWithValue(error);
    }
    return data;
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, { rejectWithValue, dispatch }) => {
    const { id } = user;
    try {
      const data = await UsersTable.updateUser(user, id);
      const { error } = data;
      if (error) {
        dispatch(setError(error));
        return rejectWithValue(error);
      }
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const deleteUser = createAsyncThunk('user/deleteUser', async (id, { rejectWithValue }) => {
  try {
    const data = await UsersTable.deleteUser(id);
    const { error } = data || {};
    if (error) {
      return rejectWithValue(error);
    }
    return id;
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const generateUsers = createAsyncThunk('user/generateUsers', async ({ skip, limit }) => {
  await UsersTable.clearUsersTable();
  const users = await generateFakeUsers();
  await UsersTable.insertUsers(users);
  const [data, total] = await UsersTable.getUsers({ skip, limit });
  return { data, total };
});

const user = createSlice({
  name: 'user',
  initialState: {
    users: [],
    user: null,
    totalUsers: 0,
    isLoading: false,
  },
  extraReducers: {
    [addUser.fulfilled]: (state, action) => ({ ...state, user: action.payload }),

    [fetchUsers.pending]: (state) => ({ ...state, isLoading: true }),
    [fetchUsers.fulfilled]: (state, action) => {
      const { data, total } = action.payload;
      return { ...state, users: data, totalUsers: parseInt(total, 10), isLoading: false };
    },
    [fetchUsers.rejected]: (state) => ({ ...state, isLoading: false }),

    [fetchUser.pending]: (state) => ({ ...state, isLoading: true }),
    [fetchUser.fulfilled]: (state, action) => ({
      ...state,
      user: action.payload,
      isLoading: false,
    }),
    [fetchUser.rejected]: (state, action) => {
      const { message } = action.payload;
      toast.error(message);
      return { ...state, isLoading: false };
    },

    [updateUser.fulfilled]: (state, action) => {
      const { id } = action.payload;
      const newUsers = [...state.users].map((u) => (u.id === id ? action.payload : user));
      toast.success('User is updated successfully');
      return { ...state, user: action.payload, users: newUsers };
    },
    [updateUser.rejected]: (state, action) => {
      const { message } = action.payload;
      toast.error(message);
      return { ...state };
    },

    [deleteUser.fulfilled]: (state, action) => {
      const id = action.payload;
      const { id: userId } = state.user || {};
      const filteredUsers = state.users.filter((u) => u.id !== id);
      toast.success('User deleted successfully');
      return {
        ...state,
        user: userId === id ? null : state.user,
        users: filteredUsers,
        totalUsers: state.totalUsers - 1,
      };
    },
    [deleteUser.rejected]: (state, action) => {
      const { message } = action.payload;
      toast.error(message || 'Something went wrong');
      return { ...state };
    },

    [generateUsers.pending]: (state) => ({ ...state, isLoading: true }),
    [generateUsers.fulfilled]: (state, action) => {
      const { data, total } = action.payload;
      return { ...state, users: data, totalUsers: parseInt(total, 10), isLoading: false };
    },
    [generateUsers.rejected]: (state) => ({ ...state, isLoading: false }),
  },
});

export default user.reducer;
