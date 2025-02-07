import dbConnect from "@/lib/connectDB";
import UserModel from "@/models/UserModel";
import mongoose from "mongoose";

export async function POST(request) {
    try {
        await dbConnect();

        const { email, projectId } = await request.json();

        if (!email || !projectId) {
            return Response.json({
                success: false,
                message: "Email and project ID are required"
            }, { status: 400 });
        }

        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 404 });
        }

        const projectObjectId = new mongoose.Types.ObjectId(projectId);

        // Find the project inside the user's projects
        let project = user.projects.find(proj => proj._id.toString() === projectId);

        if (!project) {
            return Response.json({
                success: false,
                message: "Project not found"
            }, { status: 404 });
        }

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

        await user.save();

        return Response.json({
            message: hasLiked ? "Project unliked" : "Project liked",
            liked: !hasLiked,
            likes: project.likes // Send updated like count
        }, { status: 200 });

    } catch (error) {
        console.error(error);
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }
}
