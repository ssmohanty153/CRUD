import { Schema, model } from 'mongoose';

// Define the User schema
const userSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    hobbies: {
        type: [String],
        required: true,
        default: []
    }
});

// Create a User model based on the schema
const User = model('User', userSchema);

export default User;
