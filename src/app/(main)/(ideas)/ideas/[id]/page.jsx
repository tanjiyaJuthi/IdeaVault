import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import IdeaDetailsClient from "@/components/Idea/IdeaDetailsClient";

const IdeaDetailsPage = async ({ params }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/login");

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/idea/${id}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  const idea = data?.data;

  if (!idea) return <div>No Data</div>;

  return (
    <IdeaDetailsClient
      idea={idea}
      token={token}
      user={session?.user}
    />
  );
};

export default IdeaDetailsPage;