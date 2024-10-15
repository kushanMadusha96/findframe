import UserModel from "@/app/models/User";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type RecoveryRequest = {
    email: string;
};

export async function POST(req: Request) {
    try {
        const { email } = (await req.json()) as RecoveryRequest;
        console.log(email)
        if (!email) {
            return NextResponse.json({ error: "Field is required" }, { status: 404 });
        }

        let userAvailable;
        userAvailable = await UserModel.findOne({ email: email });


        if (!userAvailable) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }

        const html = `
          <p>Hi, ${userAvailable.name},</p>
          <p>Here's your password recovery link</p>
          <a href="http://localhost:3000/login/reset-password">Reset password here</a>
          <p>Best regards, Libertas</p>
        `;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GOOGLE_ACCOUNT_USER,
                pass: process.env.GOOGLE_ACCOUNT_PASS,
            },
        });

        // Send email
        const info = await transporter.sendMail({
            from: '"Libertas" <kushanmadusha62@gmail.com>', // sender address
            to: 'kushanmadusha96@gmail.com',
            subject: `Reset your Libertas password`, // Subject line
            html: html, // HTML body
        });

        return NextResponse.json({
            success: true,
            message: "Password recovery email has been sent successfully",
            id: userAvailable._id,
            email: userAvailable.email,
            info: info,
        }, { status: 201 });

    } catch (error) {
        // next(error); // Forward error to error handling middleware
        return NextResponse.json({ message: "failed" });
    }
}
