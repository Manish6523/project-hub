import dbConnect from "@/lib/connectDB";
import UserModel from "@/models/UserModel";
export async function GET(req, { params }) {
    try {
        const { username } = params;

        if (!username || username.length < 3) {
            return Response.json({ success: false, message: "Query too short" }, { status: 400 });
        }

        await dbConnect();

        // Search for usernames that start with the given input
        const users = await UserModel.find({ username: { $regex: `${username}`, $options: "i" } })
            .select("-password -__v");

        return Response.json({ success: true, users });
    } catch (error) {
        return Response.json({ success: false, message: error.message }, { status: 500 });
    }
}
