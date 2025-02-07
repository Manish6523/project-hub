import dbConnect from "@/lib/connectDB";
import UserModel from "@/models/UserModel";

export async function POST(request) {
    await dbConnect();

    const { email, projectID, title, description, theme, tech, image, screenshots, SourceLink, LiveLink } = await request.json();

    try {
        const user = await UserModel.findOneAndUpdate(
            { email, "projects._id": projectID },
            {
                $set: {
                    "projects.$.title": title,
                    "projects.$.description": description,
                    "projects.$.theme": theme,
                    "projects.$.tech": tech,
                    "projects.$.image": image,
                    "projects.$.screenshots": screenshots,
                    "projects.$.SourceLink": SourceLink,
                    "projects.$.LiveLink": LiveLink,
                }
            },
            { new: true }
        );

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "User or project not found"
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                success: true,
                message: "Project updated successfully"
            },
            { status: 200 }
        );

    } catch (error) {
        console.error(error);
        return Response.json(
            {
                success: false,
                message: "Error while updating project"
            },
            { status: 500 }
        );
    }
}
