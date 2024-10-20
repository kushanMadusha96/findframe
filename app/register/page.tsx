import { getServerSession } from "next-auth/next";
import RegisterForm from "./form";

export default async function RegisterPage() {
  // const session = await getServerSession();

  return (
    <section className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 80px)' }}>
      <div className="w-[90%] max-w-[450px]">
        <RegisterForm />
      </div>
    </section>
  );
}