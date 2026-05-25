import { auth } from "@/app/lib/auth";
import MyInteractionsClient from "@/components/Comment/MyInteractionsClient";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const MyInteractionsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/login");

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/interaction/my-interactions`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  console.log(data);

  return (
    <MyInteractionsClient
      comments={data?.data || []}
      user={session.user}
      token={token}
    />
  );
};

export default MyInteractionsPage;