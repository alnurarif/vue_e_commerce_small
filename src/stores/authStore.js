import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
	const users = ref([])
	const currentUser = ref(null)
	const registerFieldsError = ref({
		name :'',
		email: '',
		password: '',
		confirm_password: ''
	})
	const loginError = ref("")

	const registerUser = (user) => {
		// Validate email and password, and check for duplicate email
		const isValid = validateUser(user);

		if (isValid) {
			const id = Date.now();
        	const newUser = { id, ...user };
			users.value.push(newUser);
			localStorage.setItem('users', JSON.stringify(users.value))
			registerFieldsError.value = {
				name:'',
				email: '',
				password: '',
				confirm_password: ''
			}
		} else {
			return false
		}

		return true;
	}
	const loginUser = (credentials) => {
		// Find user by email and validate password
		const user = users.value.find((u) => u.email === credentials.email);

		if (user && user.password === credentials.password) {
			console.log('camp')
			currentUser.value = user;
			localStorage.setItem('loggedInUser', JSON.stringify(user))
			return true;
		}
		loginError.value = "Email & password didn't match"
		return false;
	}

	const getLoggedInUser = () => {
		return (localStorage.getItem('loggedInUser') !== null) ? JSON.parse(localStorage.getItem('loggedInUser')) : null;
	}

	const logoutUser = () => {
		localStorage.removeItem('loggedInUser')
		currentUser.value = null;
	}

	const validateUser = (user) => {
		if (user.name == "") {
			registerFieldsError.value.name = "Name must be provided"
			return false;
		}else{
			registerFieldsError.value.name = ""
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(user.email)) {
			registerFieldsError.value.email = "Enter a valid email"
			return false;
		}else{
			registerFieldsError.value.email = ""
		}

		// Check for duplicate email
		if (users.value.find((u) => u.email === user.email)) {
			registerFieldsError.value.email = "This email already exists"
			return false;
		}else{
			registerFieldsError.value.email = ""
		}

		if (user.password == "") {
			registerFieldsError.value.password = "Password must be provided"
			return false;
		}else{
			registerFieldsError.value.password = ""
		}

		// Check if passwords match
		if (user.password !== user.confirm_password) {
			registerFieldsError.value.password = "Confirm password doesn't match"
			return false;
		}else{
			registerFieldsError.value.password = ""
		}
		return true;
	}

	const isAuthenticated = () => {
		currentUser.value = localStorage.getItem('loggedInUser')
		return (currentUser.value !== null) ? true : false;
	}

	return {
		users, getLoggedInUser, registerFieldsError, isAuthenticated, currentUser, registerUser, loginUser, logoutUser, validateUser
	}

});
