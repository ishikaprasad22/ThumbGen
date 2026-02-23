import { Request, Response } from 'express'
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
// Controllers For User Registration
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        // find user by email
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            name, email, password: hashedPassword
        })
        await newUser.save();
        req.session.isLoggedIn = true;
        req.session.userId = newUser._id.toString();

        console.log('[Register] Session set:', {
            isLoggedIn: req.session.isLoggedIn,
            userId: req.session.userId,
        });

        return res.json({
            message: 'User registered successfully',
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        })
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }

}
// Controllers For User Login
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // find user by email and include password (schema hides it by default)
        const user = await User.findOne({ email }).select('+password');
        if (!user || !user.password) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // compare password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        req.session.isLoggedIn = true;
        req.session.userId = user._id.toString();

        console.log('[Login] Session set:', {
            isLoggedIn: req.session.isLoggedIn,
            userId: req.session.userId,
        });

        return res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

// Controllers For User Logout
export const logoutUser = async (req: Request, res: Response) => {
    try {
        req.session.destroy((error: any) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: error.message });
            }

            return res.json({ message: 'Logout successful' });
        });
    } catch (error: any) {
        return res.status(500).json({ message: 'Server error' });
    }
};
// Controllers For User Verify
export const verifyUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session as { userId?: string };

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(400).json({ message: 'Invalid user' });
        }

        return res.json({ user });

    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};