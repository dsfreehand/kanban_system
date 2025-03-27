import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.js';  // Adjust the path as necessary

// Login route handler
const loginHandler = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        // Fetch user from the database by username
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Validate the password using bcrypt.compare
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            'your-secret-key', // Replace with an actual secret key in a real app
            { expiresIn: '1h' }
        );

        // Log the generated token (remove in production)
        console.log('Generated token:', token);

        // Send the token as a response
        return res.json({ token });
    } catch (error) {
        // Handle errors and log them
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Failed to log in' });
    }
};

// Export the login handler
export { loginHandler };
