import { createAction, createReducer } from '@reduxjs/toolkit'
import { AppState, User } from '../../../types/AppState';

const login = createAction<User>('LOGIN');
const logout = createAction('LOGOUT');

export const initialAppState: AppState = {
  user: {
    id: '',
    surname: '',
    firstname: '',
  },
  version: 'blub',
};

export const appReducer = createReducer(initialAppState, (builder) => {
  builder
    .addCase(login, (state, action) => {
      state = {
        ...state,
        user: action.payload
      };
    })
    .addCase(logout, (state) => {
      state = initialAppState;
    })
})