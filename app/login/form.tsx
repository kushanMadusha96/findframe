"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import ImageButton from "@/components/custom-ui/image-button";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const FormSchema = z.object({
    email: z.string().email({
        message: "Invalid email address.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
});

type FormData = z.infer<typeof FormSchema>;

export default function LoginForm() {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: FormData) => {
        // console.log("Submitting form", data);

        const { email, password } = data;

        try {
            const response: any = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            // console.log(response)

            if (!response?.error) {
                toast.success("Login Successfully", {
                    autoClose: 3000,
                })
                setTimeout(() => {
                    router.push("/");
                    router.refresh();
                }, 5000)
            }

            if (response.status === 401) {
                toast.error("Incorrect Email or Password, Please Check", {
                    autoClose: 5000,
                });
                return;
            }

        } catch (error: any) {
            toast.error("Something Went Wrong, Try again", {
                autoClose: 5000,
            })
        }
    };

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Form {...form}>
            <ToastContainer />
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 p-6 flex flex-col" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)' }}>
                <p className="font-medium text-center text-lg">Login Account</p>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    className="text-black"
                                    placeholder="kushanmadusha@gmail.com"
                                    {...field}
                                    type="text"
                                />
                            </FormControl>
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
                        </FormItem>
                    )}
                />

                <Link href={'/recover-password'} className="text-sm underline text-right">forgot password</Link>

                <Button
                    type="submit"
                    className="hover:bg-blend-darken"
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting ? "Loging...." : "Sign In"}
                </Button>

                <p className="font-normal text-center text-xs">or</p>

                <ImageButton img="/images/fblogo.png" title="Login with Google" style={{ marginTop: 10 }} />
                <ImageButton img="/images/google.webp" title="Login with Facebook" />

                <div className="flex justify-center align-middle pt-2">
                    <p className="font-normal text-center text-xs">Do not have a account?</p>
                    <Link href={'/register'} className="text-xs underline text-right ml-1 hover:text-[#ffc107]">Sign Up</Link>
                </div>

            </form>
        </Form>
    );
}