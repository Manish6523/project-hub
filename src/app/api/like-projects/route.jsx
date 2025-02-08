import dbConnect from "@/lib/connectDB";
import UserModel from "@/models/UserModel";
import mongoose from "mongoose";

export async function POST(request) {
    try {
        await dbConnect();

        const { email, projectId } = await request.json();

        // Validate request data
        if (!email || !projectId) {
            return Response.json({
                success: false,
                message: "Email and project ID are required"
            }, { status: 400 });
        }

        // Validate projectId format
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return Response.json({
                success: false,
                message: "Invalid project ID"
            }, { status: 400 });
        }

        const projectObjectId = new mongoose.Types.ObjectId(projectId);

        // Find the user who is liking/unliking
        const user = await UserModel.findOne({ email });

        if (!user) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 404 });
        }

        // Find the project owner (any user who has this project in their projects array)
        const projectOwner = await UserModel.findOne({ "projects._id": projectObjectId });

        if (!projectOwner) {
            return Response.json({
                success: false,
                message: "Project not found"
            }, { status: 404 });
        }

        // Find the correct project inside the owner's projects array
        let projectIndex = projectOwner.projects.findIndex(proj => proj._id.toString() === projectId);

        if (projectIndex === -1) {
            return Response.json({
                success: false,
                message: "Project not found"
            }, { status: 404 });
        }

        // Reference the project object directly
        let project = projectOwner.projects[projectIndex];

        // Check if the user already liked the project
        const hasLiked = user.likedProjects.includes(projectObjectId);

        if (hasLiked) {
            // Unlike: Remove project from likedProjects and decrease like count
            user.likedProjects = user.likedProjects.filter(id => id.toString() !== projectId);
            project.likes = Math.max(0, project.likes - 1); // Prevent negative likes
        } else {
            // Like: Add project to likedProjects and increase like count
            user.likedProjects.push(projectObjectId);
            project.likes += 1;
        }

        // Update the project inside the array
        projectOwner.projects[projectIndex] = project;

        // Ensure MongoDB detects changes in nested array
        projectOwner.markModified("projects");

        // Save both user and projectOwner
        await user.save();
        await projectOwner.save();

        return Response.json({
            message: hasLiked ? "Project unliked" : "Project liked",
            liked: !hasLiked,
            likes: project.likes // Send updated like count
        }, { status: 200 });

    } catch (error) {
        console.error("Error in like/unlike API:", error);
        return Response.json({ 
            message: "Internal server error", 
            error: error.message 
        }, { status: 500 });
    }
}
