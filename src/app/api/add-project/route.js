import dbConnect from "@/lib/connectDB";
import UserModel from "@/models/UserModel";

export async function POST(request) {
    dbConnect();
    const { email, image, theme, title, description, tech, screenshots, SourceLink, LiveLink } = await request.json();

    try {
        const user = await UserModel.findOne({ email:email });
        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                }, { status: 404 }
            )
        }
        const newProject = { image, title, description, tech, screenshots:screenshots ,SourceLink, LiveLink, theme };
        user.projects.push(newProject);
        await user.save();

        return Response.json(
            {
                success: true,
                message: "Project added successfully",
                data: user
            }, { status: 200 }
        )

    } catch (err) {
        console.log(err);
    }
}