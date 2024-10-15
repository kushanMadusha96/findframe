'use client';
import { useState } from "react";

export default function RecoverPasswordForm() {
    const [value, setValue] = useState('');

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/auth/recovery-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email:value }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            console.log("Email sent successfully", response);
        } catch (error: any) {
            console.error("Failed to send email:", error);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <h1>Recover Password</h1>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                style={{ width: 200, height: 40, border: '1px solid black' }}
            /><br />
            <button type="submit">Send me a recover password</button>
        </form>
    );
}
