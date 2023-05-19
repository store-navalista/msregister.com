import axios from 'axios'

export const API_URL = 'https://www.msregister.com:5000/api/'
// export const API_URL = 'http://localhost:5000/api/'

const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL
})

$api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})

$api.interceptors.response.use((config) => {
	return config;
}, async (error) => {
	const originalRequest = error.config;
	if (error.response.status == 401 && error.config && !error._isRetry) {
		originalRequest._isRetry = true;
		try {
			const response = await axios.get('https://www.msregister.com:5000/api/refresh', { withCredentials: true });
			// const response = await axios.get('http://localhost:5000/api/refresh', { withCredentials: true });
			localStorage.setItem('token', response.data.accessToken);
			return $api.request(originalRequest);
		} catch (e) {
			console.log('User not authorized!')
		}
	}
	throw error;
})

export default $api;