import NavBar from "@/components/custom-ui/navbar/navbar";
import { Button } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession();
  return (
    <div>
      <h1>{
        session ? session.user?.email : 'no session'
      }</h1>
    </div>
  );
}
