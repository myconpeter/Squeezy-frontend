import API from './axios-client';

type LoginType = {
	email: string;
	password: string;
};

type RegisterType = {
	email: string;
	name: string;
	password: string;
	confirmPassword: string;
};

type ForgotPasswordType = {
	email: string;
};
type ResetPasswordType = {
	password: string;
	verificationCode: string;
};

type VerifyEmailType = {
	code: string;
};
export const loginMutation = async (data: LoginType) => await API.post('/auth/login', data);
export const forgetPasswordMutation = async (data: ForgotPasswordType) =>
	await API.post('/auth/password/forget', data);
export const registerMutation = async (data: RegisterType) =>
	await API.post('/auth/register', data);

export const resetPasswordMutation = async (data: ResetPasswordType) =>
	await API.post('/auth/password/reset', data);
export const verifyEmailMutation = async (data: VerifyEmailType) =>
	await API.post('/auth/verify/email', data);
