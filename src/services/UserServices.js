import $api from '../http'

export default class UserService {
	static async createUser(userid, email, password, name, surname) {
		return $api.post('/create', { userid, email, password, name, surname })
	}

	static async updateUser(id, userid, email, name, surname) {
		return $api.post('/update', { id, userid, email, name, surname })
	}

	static async updatePasswordUser(passwordId, newPassword) {
		return $api.post('/update-password', { passwordId, newPassword })
	}

	static async deleteUser(id) {
		return $api.post('/delete', { id })
	}

	static async updateEmailAdmin(newEmail) {
		return $api.post('/update-admin-email', { newEmail })
	}

	static async updatePasswordAdmin(newPassword) {
		return $api.post('/update-admin-password', { newPassword })
	}

	static async sendMail(mailBody) {
		return $api.post('/send', { mailBody })
	}

	static async fetchUsers() {
		return $api.get('/users')
	}

	static async requestElma(requestBody) {
		return $api.post('/request-elma', { requestBody })
	}
}
