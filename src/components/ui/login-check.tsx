import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function LoginCheck() {

    const session = await auth();

    const { user } = session ?? {};
    if (!session) {
        redirect('/api/auth/signin');
    }
    return <div className="flex gap-2 items-center">
        <Image src={user?.image ?? ''} alt={user?.name ?? ''} width={40} height={40} className="rounded-full" /><a href="/api/auth/signout">Logout</a></div>
}