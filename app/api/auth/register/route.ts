import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import dbConnect from "@/app/db/route";
import UserModel from "@/app/models/User";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { username, email, password } = await request.json();
        // YOU MAY WANT TO ADD SOME VALIDATION HERE

        console.log({ username, email, password });

        const hashedPassword = await hash(password, 10);

        const user = await UserModel.create({ username, email, hashedPassword });

        if (user) console.log(user);

    } catch (e) {
        console.log({ e });
    }

    return NextResponse.json({ message: "success" });
}