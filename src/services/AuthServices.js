import $api from '../http'

export default class AuthService {
	static async login(userid, password) {
		return $api.post('/login', { userid, password })
	}

	static async logout() {
		return $api.get('/logout')
	}
}
