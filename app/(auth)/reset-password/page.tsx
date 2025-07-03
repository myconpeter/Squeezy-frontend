import React, { Suspense } from 'react';
import ResetPassword from './_reset-password';

type Props = {};

const page = (props: Props) => {
	return (
		<Suspense>
			<ResetPassword />
		</Suspense>
	);
};

export default page;
