import { auth } from "@/app/lib/auth";
import MyIdeaCard from "@/components/Idea/MyIdeaCard";
import NoData from "@/components/shared/NoData";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const MyIdeasPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  const { token } = await auth.api.getToken({
    headers: await headers(),
  }); 

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/idea/my-ideas`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await res.json();
  console.log(result);

  if (!res.ok) {
    throw new Error(result.message);
  }

  const ideas = result.data;

  return (
    <div>
        <div className="bg-[#fff4f8] rounded-b-full mt-12 mb-20 py-20 px-5">
            <div className="mx-auto max-w-7xl">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">
                    Visit the idea you already added!
                </h2>
            </div>
        </div>

      <div className="max-w-7xl mx-auto mb-20 px-5 lg:px-0">
        <div className="my-bookings-card-container">
          {ideas?.length > 0 ? (
            ideas.map((idea) => (
              <MyIdeaCard key={idea._id} idea={idea} />
            ))
          ) : (
            <NoData />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyIdeasPage;