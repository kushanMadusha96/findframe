import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import dbConnect from "@/app/db/route";
import UserModel from "@/app/models/User";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { username, email, password } = await request.json();
        const hashedPassword = await hash(password, 10);

        const isExitUser = await UserModel.findOne({ email: email });

        // If the user exists, return an appropriate message
        if (isExitUser) {
            return NextResponse.json({
                success: false,
                message: "This email is already registered, please login or enter new email",
            });
        }

        // If user doesn't exist, create a new user
        const user = await UserModel.create({ username, email, hashedPassword });

        if (user) {
            return NextResponse.json({
                success: true,
                message: "Registration successful.",
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Registration failed, try again.",
            });
        }


    } catch (e) {
        return NextResponse.json({ success: false, message: "An error occurred, try again." });
    }
}
