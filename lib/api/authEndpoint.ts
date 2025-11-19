// app/lib/api/authEndpoint.ts
import BaseApi from './baseApi';
import type {
  SignupRequest,
  SignupResponse,
  LoginRequest,
  LoginResponse,
  User,
} from './types';

const AuthEndpoint = BaseApi.injectEndpoints({
  endpoints: builder => ({
    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: data => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),

    login: builder.mutation<LoginResponse, LoginRequest>({
      query: data => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),

    getCurrentUser: builder.query<{ user: User }, void>({
      query: () => '/auth/me',
      providesTags: ['Auth'],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
} = AuthEndpoint;

export default BaseApi;
