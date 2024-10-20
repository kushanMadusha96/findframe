import { getServerSession } from "next-auth";
import LoginForm from "./form";

export default async function LoginPage() {
  // const session = await getServerSession();
  // console.log({ session });

  return (
    <section className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 80px)' }}>
      <div className="w-[90%] max-w-[450px]">
        <LoginForm />;
      </div>
    </section>
  );
}