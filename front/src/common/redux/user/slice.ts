import { createSlice, Slice } from '@reduxjs/toolkit';
import { User, UserToken } from '../../helpers/types';

type UserSlice = {
  user: User
  forgotPasswordUser: UserToken
}

const initialState : UserSlice = {
  user: {
    id: null,
    email: null,
    name: null,
    password: null,
    userType: null
  },
  forgotPasswordUser: {
    email: null,
    token: null
  }
}

const userSlice : Slice<UserSlice> = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = initialState.user;
    },

    startPasswordRecovery: (state, action) => {
      state.forgotPasswordUser.email = action.payload;
    },

    confirmedToken : (state, action) => {
      state.forgotPasswordUser.token = action.payload;
    }
  },
});

export const { login, logout, startPasswordRecovery, confirmedToken } = userSlice.actions;

export default userSlice.reducer