
import Image from "next/image";
import { SectionHeader, Shimmer } from "@/Components/ui";
import Link from "next/link";
import EventCardFlipper from "./EventCardFlipper";

const events = [
  {
    image: "/patterns/index-page/events/miami.png",
    date: "01/27/2026",
    datetime: "2026-01-27",
    location: "Miami, USA",
    title: "COSMOPROF 2026",
    brand: "Fragrance World",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sollicitudin rhoncus ex, ut vehicula urna. Curabitur a orci sed est feugiat sodales. Nam ultricies dolor at aliquam pellentesque. Phasellus tempus interdum nulla nec feugiat. Aliquam id ipsum in dui tempor ullamcorper non ac neque. Aliquam nec lacus vitae dolor pellentesque vehicula non porttitor elit. Sed in molestie sem. Quisque gravida nisi nec dictum condimentum. Sed eleifend aliquet blandit. Aliquam posuere nisl a neque tristique, vitae finibus nulla mattis. Nam eu aliquet nunc, in tincidunt felis. Suspendisse tincidunt, nisl ut semper cursus, arcu leo mollis leo, sed lobortis lacus leo at dolor. Etiam tempus ac erat sed tempor. Duis est nisi, efficitur vehicula finibus bibendum, laoreet sed dolor. Etiam sagittis dapibus lectus interdum varius. Sed auctor, dui et accumsan consequat, metus orci posuere arcu, ac sodales augue augue in nisi. Fusce laoreet tincidunt nunc, ac faucibus est consectetur non. Fusce consectetur lorem vel massa malesuada, ac vestibulum mauris interdum. Donec faucibus ante purus, congue egestas velit eleifend vitae. Cras nec magna ut ipsum lacinia imperdiet sed ac ante. Suspendisse efficitur lacinia hendrerit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum id orci nec mauris ultrices lacinia nec eu erat. Morbi malesuada sed lorem eget pellentesque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus mi justo, finibus quis consectetur nec, pretium sit amet ipsum. Nam sit amet turpis et neque finibus facilisis nec id mauris. Ut laoreet sagittis nisl, sed porta lorem iaculis consequat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse et nulla placerat, pulvinar ex et, consectetur quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lobortis consequat tempus. In condimentum vel metus id egestas. Praesent a ipsum dui. Sed efficitur arcu sed massa blandit, egestas tempus purus luctus. Nulla ornare nisi id tellus euismod, ut rhoncus ipsum semper. Quisque posuere venenatis porta. Proin porttitor elit a vestibulum facilisis. Phasellus lobortis eleifend sagittis. Nunc ultricies magna non sapien gravida, vel blandit dolor rhoncus. Ut ac risus odio. Nullam libero eros, eleifend vestibulum vestibulum non, vehicula at lacus. Morbi nulla turpis, congue in ex a, facilisis viverra felis.",
  },
  {
    image: "/patterns/index-page/events/las-vegas.png",
    date: "08/09/2026",
    datetime: "2026-08-09",
    location: "Las Vegas, USA",
    title: "ASD 2026",
    brand: "Lattafa",
    description:
      "ASD Market Week in Las Vegas is one of the largest wholesale trade shows in the US. Visit our booth to discover our newest Lattafa lines and connect with our distribution team. Exclusive trade pricing and show-only deals will be available for qualified buyers.",
  },
  {
    image: "/patterns/index-page/events/brazil.png",
    date: "11/19/2026",
    datetime: "2026-11-19",
    location: "São Paulo, Brazil",
    title: "FCE Cosmetique 2026",
    brand: "French Avenue",
    description:
      "FCE Cosmetique is Latin America's leading beauty and fragrance exhibition. We are proud to represent French Avenue on an international stage. Attend to explore new scents, meet our team, and discuss distribution opportunities across the South American market.",
  },
];

export default function RecentEvents() {
  return (
    <section
      aria-label="event"
      className="relative overflow-hidden z-1 text-left py-[7rem] lg:py-[10rem] bg-[var(--darker-black)]"
    >
      <div className="px-[1rem] max-w-[120rem] mx-auto">
        {/* Section header (label + title) — centered */}
        <div className="text-center">
          <p className="font-[family-name:var(--font-small)] font-bold uppercase tracking-[0.4em] text-[length:var(--text-small)] text-[var(--light-gold)] mb-3">
            Recent Updates
          </p>
           <SectionHeader label={""} title={""}         
                    />
          <h2 className="font-[family-name:var(--font-big)] font-normal leading-[1.2] text-[length:var(--text-big)] text-[var(--white)] mb-10">
            Upcoming Events
          </h2>
        </div>

        <ul className="grid gap-10 list-none p-0 m-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCardFlipper
              key={event.title}
              front={
                <div className="relative w-full h-full overflow-hidden">
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      sizes="285px"
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                    <Shimmer />
                    <time
                      dateTime={event.datetime}
                      className="absolute top-7.5 left-[25px] z-1 font-bold text-[length:var(--text-small)] px-2.5 py-1.25 leading-3.5 text-[var(--light-gold)] bg-[var(--darker-black)] font-[family-name:var(--font-small)] tracking-[0.15em]"
                    >
                      {event.date}
                    </time>
                  </div>

                  {/* bottom fade behind title (was .event-card-gradient) */}
                  <div className="absolute bottom-0 w-full z-1 px-8.75 pt-8.75 pb-6.25 bg-linear-to-t from-[var(--darker-black)] to-transparent">
                    <p className="text-center font-[family-name:var(--font-small)] font-bold uppercase tracking-[0.4em] text-[length:var(--text-small)] text-[var(--light-gold)] mb-1.25">
                      {event.location}
                    </p>
                    <h3 className="text-center font-[family-name:var(--font-big)] font-normal leading-[1.2] text-[length:var(--text-title)] text-[var(--white)]">
                      {event.title}
                    </h3>
                  </div>

                  {/* Tap hint */}
                  <div className="absolute top-7.5 right-6.25 z-1 flex items-center gap-1.5 px-2.5 py-1.25 bg-[var(--darker-black)] opacity-70">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--light-gold)"
                      strokeWidth="2.5"
                    >
                      <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                    <span className="text-[length:var(--text-small)] font-bold tracking-[0.15em] uppercase text-[var(--light-gold)] font-[family-name:var(--font-small)]">
                      Details
                    </span>
                  </div>
                </div>
              }
              back={
                <>
                  {/* Corner accents */}
                  <span className="absolute top-0 right-0 w-15 h-15 pointer-events-none opacity-60 z-1 border-t border-r border-[var(--light-gold)]" />
                  <span className="absolute bottom-0 left-0 w-15 h-15 pointer-events-none opacity-60 z-1 border-b border-l border-[var(--light-gold)]" />

                  {/* Scrollable content */}
                  <div className="overflow-y-auto flex-1 px-7.5 py-[35px]">
                    <h3 className="font-normal text-[var(--white)] mb-4 leading-[1.3] text-[length:var(--text-title)] font-[family-name:var(--font-big)]">
                      {event.title}
                    </h3>

                    <div className="w-10 h-px mb-6 opacity-60 bg-[var(--light-gold)]" />

                    <ul className="flex flex-col gap-3 mb-6">
                      {[
                        { label: "Date", value: event.date },
                        { label: "Location", value: event.location },
                        { label: "Brand", value: event.brand },
                      ].map(({ label, value }) => (
                        <li
                          key={label}
                          className="flex items-start gap-2 text-[1.4rem]"
                        >
                          <span className="uppercase tracking-[0.15em] font-bold shrink-0 text-[var(--light-gold)]">
                            {label}
                          </span>
                          <span className="text-[var(--light-gray)]">
                            — {value}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <p className="text-[1.4rem] leading-[1.7] text-[var(--light-gray)]">
                      {event.description}
                    </p>
                  </div>
                </>
              }
            />
          ))}
        </ul>

        <div className="flex justify-center mt-10">
          <Link href="/blogs" className="btn-gold">
            View Our Blog
          </Link>
        </div>
      </div>
    </section>
  );
}