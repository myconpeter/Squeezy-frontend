import React, { Suspense } from 'react';
import ComfirmAccount from './_confirm-account';

type Props = {};

const page = (props: Props) => {
	return (
		<Suspense>
			<ComfirmAccount />
		</Suspense>
	);
};

export default page;
