import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import FormPage from "./form";

export default async function RegisterPage() {
  const session = await getServerSession();

  // if (session) {
  //   console.log(session)
  //   // redirect("/");
  // }

  return (
    <section className="bg-black h-screen flex items-center justify-center">
      <div className="w-[600px]">
        <FormPage />
      </div>
    </section>
  );
}