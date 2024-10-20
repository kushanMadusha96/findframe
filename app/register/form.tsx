"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import ImageButton from "@/components/custom-ui/image-button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';

// Define schema with password match validation
const FormSchema = z
    .object({
        username: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        email: z.string().email({
            message: "Invalid email address.",
        }),
        password: z.string().min(6, {
            message: "Password must be at least 6 characters.",
        }),
        confirmPassword: z.string().min(6, {
            message: "Password must be at least 6 characters.",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"], // Set the error on the confirmPassword field
        message: "Passwords do not match.",
    });

type FormData = z.infer<typeof FormSchema>;

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    const form = useForm<FormData>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const onSubmit = async (data: FormData) => {
        // console.log("Submitting form", data);

        const { username, email, password } = data;

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.message || "Something went wrong, please try again", {
                    autoClose: 5000,
                });
                return;
            }

            const result = await response.json();
            if (result.message === "This email is already registered, please login or enter new email") {
                toast.error(result.message, {
                    autoClose: 5000,
                });
                return;
            }

            if (result.message === "Registration failed, try again.") {
                toast.error(result.message, {
                    autoClose: 5000
                })
            }

            toast.success("Registration Successful", {
                autoClose: 3000,
            });

            setTimeout(() => {
                router.push('/login');
            }, 5000);

        } catch (error: any) {
            toast.error("Registration Failed: " + error.message, {
                autoClose: 5000,
            });
        }
    };


    return (
        <Form {...form}>
            <ToastContainer />
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-1 p-6 flex flex-col"
                style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)" }}
            >
                <p className="font-medium text-center text-lg">Create Account</p>

                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="kushan madusha" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="kushanmadusha@gmail.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        className="text-black pr-10"
                                        placeholder="kushaN@1"
                                        {...field}
                                        type={showPassword ? "text" : "password"}
                                    />
                                    <div
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? (
                                            <EyeIcon className="w-5 h-5 text-gray-600" />
                                        ) : (
                                            <EyeSlashIcon className="w-5 h-5 text-gray-600" />
                                        )}
                                    </div>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        className="text-black pr-10"
                                        placeholder="kushaN@1"
                                        {...field}
                                        type={showConfirmPassword ? "text" : "password"}
                                    />
                                    <div
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                        onClick={toggleConfirmPasswordVisibility}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeIcon className="w-5 h-5 text-gray-600" />
                                        ) : (
                                            <EyeSlashIcon className="w-5 h-5 text-gray-600" />
                                        )}
                                    </div>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    style={{ marginTop: 15 }}
                    type="submit"
                    className="hover:bg-blend-darken"
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting ? "Creating...." : "Register"}
                </Button>

                <p className="font-normal text-center text-xs" style={{ marginTop: 10, marginBottom: 10 }}>or</p>

                <ImageButton img="/images/fblogo.png" title="Login with Google" />
                <ImageButton img="/images/google.webp" title="Login with Facebook" style={{ marginTop: 7 }} />

                <div className="flex justify-center align-middle pt-2">
                    <p className="font-normal text-center text-xs">Already have a account?</p>
                    <Link href={'/login'} className="text-xs underline text-right ml-1 hover:text-[#ffc107]">Login</Link>
                </div>
            </form>
        </Form>
    );
}
