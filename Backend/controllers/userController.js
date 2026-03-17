import * as userServices from "../services/userServices.js"
import * as usersDAL from "../dal/usersDAL.js";
import { signToken } from "../utils/auth.js";

export const registerUser = async (req, res) => {
	try {
		const { username, password, email, user_type } = req.body;

		const allUsers = await usersDAL.getAllUsers();
		const existsSameType = allUsers.find(u => u.user_type === user_type);
		if (existsSameType) {
			return res.status(400).json({ message: `A user with type '${user_type}' already exists` });
		}

		const user = await userServices.createUser({ username, password, email, user_type });
		res.status(201).json({ message: 'User created', user: { id: user._id, username: user.username, email: user.email, user_type: user.user_type } });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

export const updateUser = async (req, res) => {
	try {
		const { id } = req.params;
		const updated = await userServices.updateUser(id, req.body);
		if (!updated) return res.status(404).json({ message: 'User not found' });
		res.status(200).json({ message: 'User updated', user: updated });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

export const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;
		const removed = await userServices.deleteUser(id);
		if (!removed) return res.status(404).json({ message: 'User not found' });
		res.status(200).json({ message: 'User deleted' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await userServices.validateUserCredentials(email, password);
		if (!user) return res.status(401).json({ message: 'Invalid credentials' });

		await usersDAL.updateLastLogin(user._id);

		const token = signToken({ id: user._id, username: user.username, user_type: user.user_type });
		res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email, user_type: user.user_type } });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

export const getCurrentUser = async (req, res) => {
	try {
		const id = req.user?.id || req.user?._id || req.id;
		if (!id) return res.status(401).json({ message: 'No authenticated user' });
		const user = await userServices.getUserById(id);
		if (!user) return res.status(404).json({ message: 'User not found' });
		res.status(200).json({ id: user._id, username: user.username, email: user.email, user_type: user.user_type, last_login: user.last_login });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}