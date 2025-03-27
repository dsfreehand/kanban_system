import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.js';
import dotenv from 'dotenv';
// Initialize dotenv to load environment variables
dotenv.config();
// Ensure JWT_SECRET_KEY is defined
if (!process.env.JWT_SECRET_KEY) {
    console.error('JWT_SECRET_KEY is missing in environment variables');
    throw new Error('JWT_SECRET_KEY must be defined in the environment variables');
}
// Create a router instance
const authRouter = Router();
/**
 * Login Route: Handles user authentication and token generation
 */
authRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Received login request:', { username, password }); // Log incoming request
    try {
        // Fetch user by username
        const user = await User.findOne({ where: { username } });
        console.log('Fetched user from database:', user); // Log fetched user
        if (!user) {
            console.warn('User not found:', username); // Log missing user
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log('Password match status:', passwordMatch); // Log password comparison result
        if (!passwordMatch) {
            console.warn('Incorrect password for user:', username); // Log failed password match
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        // Generate a JWT token
        const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        console.log('Generated JWT token:', token); // Log generated token
        // Send the token as a response
        return res.status(200).json({ token });
    }
    catch (error) {
        console.error('Error during login process:', error); // Log error details
        return res.status(500).json({ error: 'An internal server error occurred' });
    }
});
/**
 * Register Route: Handles user registration and saves to the database
 */
authRouter.post('/register', async (req, res) => {
    const { username, password } = req.body;
    console.log('Received registration request:', { username }); // Log incoming request
    try {
        // Check if the username is already taken
        const existingUser = await User.findOne({ where: { username } });
        console.log('Existing user check result:', existingUser); // Log check for existing user
        if (existingUser) {
            console.warn('Username already taken:', username); // Log duplicate username
            return res.status(400).json({ error: 'Username is already taken' });
        }
        // Validate password length
        if (password.length < 8) {
            console.warn('Password too short for user:', username); // Log password validation fail
            return res.status(400).json({ error: 'Password must be at least 8 characters long' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed password for new user:', hashedPassword); // Log hashed password
        // Create a new user
        const newUser = await User.create({ username, password: hashedPassword });
        console.log('Created new user:', newUser); // Log user creation
        // Send a success response
        return res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error('Error during registration process:', error); // Log error details
        return res.status(500).json({ error: 'An internal server error occurred' });
    }
});
/**
 * Middleware to validate request body fields
 */
authRouter.use((req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        console.warn('Missing username or password:', req.body); // Log missing fields
        return res.status(400).json({ error: 'Username and password are required' });
    }
    next();
});
export default authRouter;
//# sourceMappingURL=auth-routes.js.map