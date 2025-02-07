import mongoose, { Schema } from "mongoose";

// Define ProjectSchema
const ProjectSchema = new Schema({
    image: {
        type: String
    },
    screenshots: {
        img01: { type: String },
        img02: { type: String },
        img03: { type: String },
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    theme: {
        type: String,
        default: "theme01"
    },
    SourceLink: {
        type: String,
        required: true
    },
    LiveLink: {
        type: String,
        required: true
    },
    tech: {
        type: String,
    },
    likes: {
        type: Number,
        default: 0
    },
    publishedAt: {
        type: Date,
        default: Date.now
    }
});

// Define UserSchema
const UserSchema = new Schema({
    profilePick: {
        type: String
    },
    username: {
        type: String,
        required: [true, "Username is required"]  // Fixed require -> required
    },
    email: {
        type: String,
        required: [true, "Email is required"],  // Fixed require -> required
        unique: [true, "Email is already in use"]
    },
    isAccountPublic: {
        type: Boolean,
        default: false
    },
    likedProjects: {
        type: [Schema.Types.ObjectId],
        ref: "Project", default: []
    },
    gitURL: { type: String, default: 'https://github.com' },
    linkedInURL: { type: String, default: 'https://www.linkedin.com' },
    instaURL: { type: String, default: 'https://www.instagram.com' },
    projects: { type: [ProjectSchema], default: [] },  // Ensures an empty array if none is provided
});

// Create User model
const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;
