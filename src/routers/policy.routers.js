import { Router } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";
import { v4 as uuidv4 } from 'uuid';
import User from "../models/user.model.js";

const router = Router()

const users = [];

router.get('/', async (req, res) => {
    const users = await User.find();
    if (!users) {
        throw new ApiError(404, 'User not found');
    } else {
        // res.status(200).json({ message: 'User found', user });
        res.status(200).json(
            new ApiResponse(200, users, 'User found')
        );
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.userId });
        if (!user) {
            throw new ApiError(404, 'User not found');
        } else {
            res.status(200).json(
                new ApiResponse(200, user, 'User found')
            );
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.post('/', async (req, res) => {
    const { username, age, hobbies } = req.body;
    if (!username || !age) {
        throw new ApiError(400, 'Username and age are required');
    } else {
        const newUser = new User({
            id: uuidv4(),
            username,
            age,
            hobbies: hobbies || []
        });
        await newUser.save();
        res.status(201).json(
            new ApiResponse(200, newUser, "Data updated in DB")
        );
    }
});

// PUT update user

router.put('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const existingUser = await User.findOne({ id: userId });
        if (!existingUser) {
            throw new ApiError(404, 'User not found');
        }

        // if user not provide fiels it will take old value
        const { username = existingUser.username, age = existingUser.age, hobbies = existingUser.hobbies } = req.body;

        const updatedUser = await User.findOneAndUpdate(
            { id: userId },
            { username, age, hobbies },
            { new: true }
        );

        res.status(200).json(
            new ApiResponse(200, updatedUser, 'User updated successfully')
        );
    } catch (error) {
        console.error(error);
        throw new ApiError(500, 'An error occurred during the update Operation');

    }
});



// DELETE user
router.delete('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const deletedUser = await User.findOneAndDelete({ id: userId });

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(
            new ApiResponse(200, updatedUser, 'User deleted successfully')
        );
    } catch (error) {
        console.error(error);
        throw new ApiError(500, 'An error occurred during the Delete Operation');
    }
});



export default router