import React, { Suspense } from 'react';
import ForgotPassword from './_forget-password';

type Props = {};

const page = (props: Props) => {
	return <Suspense>{<ForgotPassword />}</Suspense>;
};

export default page;
