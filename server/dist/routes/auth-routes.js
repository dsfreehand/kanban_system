import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models'; // Adjust path as necessary
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        console.log('Login attempt:', { username, password });
        // Find user by username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            console.log('User not found');
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        console.log('User found:', user); // Check if user matches the expected record
        // Compare password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('Password validity:', isPasswordValid);
        if (!isPasswordValid) {
            console.log('Invalid password');
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        // Generate JWT token
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET_KEY || 'default_secret', { expiresIn: '15m' });
        console.log('Generated token:', token);
        return res.json({ token });
    }
    catch (error) {
        console.error('Error during login:', error); // Detailed logging for debugging
        return res.status(500).json({ error: 'Failed to log in' });
    }
};
