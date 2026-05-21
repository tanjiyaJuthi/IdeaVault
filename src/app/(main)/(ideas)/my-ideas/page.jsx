import { auth } from "@/app/lib/auth";
import MyIdeaCard from "@/components/Idea/MyIdeaCard";
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

  console.log(token);
  const parts = token.split(".");
  console.log("PAYLOAD:", JSON.parse(Buffer.from(parts[1], "base64").toString()));

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/idea/user/${user?.id}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await res.json();
  const ideas = result.data;

  return (
    <div>
        <div className="bg-[#fff4f8] rounded-b-full mt-12 mb-20 py-20 px-5">
            <div className="mx-auto max-w-7xl">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">
                    Know the idea you already added!
                </h2>
            </div>
        </div>

      <div className="max-w-7xl mx-auto mb-20 px-5 lg:px-0">
        <div className="my-bookings-card-container mt-10">
          {ideas?.length > 0 ? (
            ideas.map((idea) => (
              <MyIdeaCard key={idea._id} idea={idea} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-6 bg-[#fff4f8] text-center shadow-sm">

              {/* ICON */}
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 mb-4">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 13h6m2 8H7a2 2 0 01-2-2V7a2 2 0 012-2h5l2 2h5a2 2 0 012 2v10a2 2 0 01-2 2z"
                  />
                </svg>
              </div>

              {/* TEXT */}
              <h3 className="text-2xl font-semibold text-gray-700">
                No ideas found
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                You haven’t created any ideas yet. Start building something amazing.
              </p>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyIdeasPage;