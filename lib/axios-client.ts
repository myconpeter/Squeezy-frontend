import axios from 'axios';
import { error } from 'console';

const options = {
	baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
	withCredentials: true,
	timeout: 10000,
};

const API = axios.create(options);

API.interceptors.response.use(
	(response) => {
		return response;
	},

	(error) => {
		const { data, status } = error.response;
		if (data === 'Unauthorized' && status === 401) {
			return Promise.reject({
				...data,
			});
		}
	}
);
