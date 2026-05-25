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
        <div className="bg-linear-to-r from-white to-[#fff4f8] relative overflow-hidden pt-32 pb-40">

          {/* CONTENT */}
          <div className="relative z-10 max-w-7xl mx-auto px-5 text-center">

            {/* BADGE */}
            <div className="inline-flex items-center gap-2 px-5 py-4 rounded-lg bg-white/70 backdrop-blur-xl border border-pink-100 shadow-md mb-8">
              <span className="w-2 h-2 rounded-lg bg-[#810B38] animate-pulse"></span>

              <span className="text-sm font-semibold tracking-wide text-[#810B38]">
                Your Ideas
              </span>
            </div>

            {/* HEADING */}
            <h2 className="text-5xl md:text-7xl font-black tracking-tight text-[#2b0a18] leading-[1.1]">
              Visit the ideas you{" "}
              <span className="bg-linear-to-r from-[#810B38] via-pink-500 to-rose-500 bg-clip-text text-transparent">
                already added
              </span>
              !
            </h2>

            {/* SUBTEXT */}
            <p className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed text-zinc-500">
              Revisit, refine, and improve your past ideas. Great startups evolve over time — your ideas should too.
            </p>

          </div>

          {/* MODERN CURVE */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            className="relative block w-full h-[220px]"
          >
            <path
              fill="#fff4f8"
              d="M0,64 C180,220 420,260 720,220 C1020,180 1260,40 1440,140 L1440,320 L0,320 Z"
            />
          </svg>
        </div>

        </div>

      <div className="text-base max-w-7xl mx-auto my-20 px-5 lg:px-0">
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