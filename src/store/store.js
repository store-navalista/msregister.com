import axios from 'axios';
import AuthService from '../services/AuthServices'
import UserService from '../services/UserServices'
import { makeAutoObservable } from 'mobx';

export default class Store {
	user = {};
	users = [];
	isAuth = false;
	isLoading = false;

	constructor() {
		makeAutoObservable(this)
	}

	setAuth(bool) {
		this.isAuth = bool;
	}

	setUser(user) {
		this.user = user;
	}

	setUsers(users) {
		this.users = users;
	}

	setLoading(bool) {
		this.isLoading = bool;
	}

	getUsers() {
		return this.users;
	}

	async login(userid, password) {
		try {
			const response = await AuthService.login(userid, password);
			localStorage.setItem('token', response.data.accessToken);
			this.setAuth(true);
			this.setUser(response.data.user);
			return response.status;
		} catch (e) {
			return e.response?.data?.message;
		}
	}

	async logout() {
		try {
			const response = await AuthService.logout();
			localStorage.removeItem('token');
			this.setAuth(false);
			this.setUser({});
		} catch (e) {
			console.log(e.response?.data?.message);
		}
	}

	async checkAuth() {
		this.setLoading(true);
		try {
			const response = await axios.get('https://www.msregister.com:5000/api/refresh', { withCredentials: true });
			// const response = await axios.get('http://localhost:5000/api/refresh', { withCredentials: true });
			localStorage.setItem('token', response.data.accessToken);
			this.setAuth(true);
			this.setUser(response.data.user);
		} catch (e) {
			console.log(e.response?.data?.message);
		} finally {
			this.setLoading(false)
		}
	}

	async updateEmailAdmin(newEmail) {
		try {
			const response = await UserService.updateEmailAdmin(newEmail);
			return response;
		} catch (e) {
			return e.response?.data?.message;
		}
	}

	async updatePasswordAdmin(newPassword) {
		try {
			const response = await UserService.updatePasswordAdmin(newPassword);
			return response;
		} catch (e) {
			return e.response?.data?.message;
		}
	}

	async deleteUser(id) {
		try {
			const response = await UserService.deleteUser(id);
			return response.data.message;
		} catch (e) {
			console.log(e.response?.data?.message);
		}
	}

	async fetchUsers(page = 1) {
		try {
			const response = await UserService.fetchUsers();
			const users = await response.data.map((user, index) => user.table_id = index + 1);
			this.users = response.data.slice((page - 1) * 10, page * 10);
			return response.data;
		} catch (e) {
			console.log(e.response?.data?.message);
		}
	}

	async createUser(userid, email, password, name, surname) {
		try {
			const response = await UserService.createUser(userid, email, password, name, surname);
			return response;
		} catch (e) {
			return e.response?.data?.message;
		}
	}

	async updateUser(id, userid, email, name, surname) {
		try {
			const response = await UserService.updateUser(id, userid, email, name, surname);
			return response;
		} catch (e) {
			return e.response?.data?.message;
		}
	}

	async updatePasswordUser(passwordId, newPassword) {
		try {
			const response = await UserService.updatePasswordUser(passwordId, newPassword);
			return response;
		} catch (e) {
			return e.response?.data?.message;
		}
	}

	async sendMail(mailBody) {
		try {
			const result = await UserService.sendMail(mailBody);
			return result.data;
		} catch (e) {
			return e.response?.data?.message;
		}
	}

	async requestElma(requestBody) {
		try {
			const result = await UserService.requestElma(requestBody);
			return result;
		} catch (e) {
			return e.response?.data?.message;
		}
	}
}