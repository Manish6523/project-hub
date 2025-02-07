import dbConnect from "@/lib/connectDB";
import UserModel from "@/models/UserModel";

export async function POST(request) {
    await dbConnect();
    const { email } = await request.json();
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "user not found"
                }, { status: 404 }
            )
        }
        return Response.json(
            {
                success: true,
                data: user
            }, { status: 200 }
        )
    } catch (error) {
        return Response.json(
            {
                success: false,
                message: "error while fatching user"
            }, { status: 500 }
        )
    }
}