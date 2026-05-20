import Image from "next/image"

const logos = [
  {
    name: "Stripe",
    src: "https://cdn.worldvectorlogo.com/logos/stripe-4.svg",
  },
  {
    name: "Google",
    src: "https://cdn.worldvectorlogo.com/logos/google-1-1.svg",
  },
  {
    name: "Microsoft",
    src: "https://cdn.worldvectorlogo.com/logos/microsoft-5.svg",
  },
  {
    name: "Amazon",
    src: "https://cdn.worldvectorlogo.com/logos/amazon-web-services-2.svg",
  },
  {
    name: "Meta",
    src: "https://cdn.worldvectorlogo.com/logos/meta-1.svg",
  },
  {
    name: "Netflix",
    src: "https://cdn.worldvectorlogo.com/logos/netflix-3.svg",
  },
]

const BrandMarquee = () => {
  return (
    <section className="border-y border-gray-200 bg-background py-10 bg-linear-to-r from-white to-[#fff4f8]">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">

        {/* Heading */}
        <p className="mb-8 text-center text-sm uppercase tracking-widest text-muted-foreground font-inter">
          Trusted by industry leaders worldwide
        </p>

        {/* Marquee Wrapper */}
        <div className="relative overflow-hidden">

          {/* Left fade */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />

          {/* Right fade */}
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

          {/* Marquee Track */}
          <div className="flex w-max animate-marquee gap-20 hover:[animation-play-state:paused]">

            {/* duplicate for seamless loop */}
            {[...logos, ...logos].map((logo, index) => (
              <div key={index} className="flex items-center justify-center">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={120}
                  height={40}
                  className="h-8 w-auto grayscale opacity-60 transition hover:grayscale-0 hover:opacity-100"
                />
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  )
}

export default BrandMarquee;