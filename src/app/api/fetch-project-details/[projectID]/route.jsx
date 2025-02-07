import dbConnect from "@/lib/connectDB";
import UserModel from "@/models/UserModel";
import mongoose from "mongoose";
export async function GET(req, { params }) {
    try {
        const { projectID } = params;
        await dbConnect();
        const projectObjectId = new mongoose.Types.ObjectId(projectID);

        const user = await UserModel.findOne({ "projects._id": projectObjectId });

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                }, { status: 404 }
            )
        }
        // Extract the specific project
        const project = user.projects.find(p => p._id.toString() === projectID);

        if (!project) {
            return Response.json(
                {
                    success: false,
                    message: "Project not found"
                }, { status: 404 }
            )
        }

        return Response.json({
            success: true,
            project,
            userData: {
                email: user.email,
                username: user.username,
                profilePick: user.profilePick
            }

        }, { status: 200 });

    } catch (error) {
        return Response.json({ success: false, message: error.message }, { status: 500 });
    }
}

