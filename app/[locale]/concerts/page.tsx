// app/[locale]/concerts/page.tsx
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/routing";
import { getAllConcerts, type ConcertMetadata } from "@/lib/concerts";

export default async function ConcertsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const t = await getTranslations("Concerts");

  // Get all concerts with metadata from MDX frontmatter
  const concerts = getAllConcerts(locale);

  const todayStr = new Date().toLocaleDateString("en-CA", {
    timeZone: "Europe/Zurich",
  });

  // A concert is upcoming if any of its performances is today or later.
  const isUpcoming = (concert: ConcertMetadata) =>
    concert.performances.some((p) => p.date >= todayStr);

  const upcoming = concerts.filter(isUpcoming);
  const past = concerts.filter((c) => !isUpcoming(c));

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(locale, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div>
      <h1 className="text-4xl font-serif font-semibold mb-10 text-neutral-900">
        {t("title")}
      </h1>

      {/* Featured upcoming concerts */}
      {upcoming.length > 0 && (
        <section className="mb-16">
          <h2 className="text-lg font-serif font-semibold text-neutral-700 mb-5">
            {t("upcoming")}
          </h2>
          <div className="space-y-6">
            {upcoming.map((concert) => (
              <div
                key={concert.slug}
                className="bg-stone-100 rounded-lg border border-stone-300 overflow-hidden flex flex-col sm:flex-row"
              >
                {concert.poster && (
                  <Link
                    href={{
                      pathname: "/concerts/[slug]",
                      params: { slug: concert.slug },
                    }}
                    className="block sm:w-56 flex-shrink-0"
                  >
                    <Image
                      src={concert.poster}
                      alt={concert.title}
                      width={300}
                      height={424}
                      className="w-full h-48 sm:h-full object-cover"
                    />
                  </Link>
                )}
                <div className="p-8 flex-1">
                  <Link
                    href={{
                      pathname: "/concerts/[slug]",
                      params: { slug: concert.slug },
                    }}
                    className="block group mb-6"
                  >
                    <h3 className="text-2xl font-serif font-semibold mb-2 text-neutral-900 group-hover:text-orange-600 transition-colors break-words hyphens-auto">
                      {concert.title}
                    </h3>
                    <p className="text-neutral-800">{concert.composers}</p>
                  </Link>

                  <div className="space-y-2">
                    {concert.performances.map((performance, index) => {
                      const performanceIsUpcoming = performance.date >= todayStr;

                      return (
                        <div
                          key={index}
                          className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm"
                        >
                          <span className="font-medium text-neutral-900">
                            {formatDate(performance.date)}
                          </span>
                          {performanceIsUpcoming && performance.time && (
                            <span className="text-neutral-700">
                              {performance.time}
                            </span>
                          )}
                          {performance.location && (
                            <span className="text-neutral-600">
                              {performance.location}
                            </span>
                          )}
                          {performanceIsUpcoming && (
                            <>
                              {performance.ticketUrl ? (
                                <a
                                  href={performance.ticketUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-orange-600 hover:text-orange-700 font-medium"
                                >
                                  {t("buyTickets")} →
                                </a>
                              ) : (
                                <span className="text-neutral-500 italic">
                                  {t("ticketsSoonAvailable")}
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Archive grid */}
      {past.length > 0 && (
        <section className="mb-10">
          {upcoming.length > 0 && (
            <h2 className="text-lg font-serif font-semibold text-neutral-700 mb-5">
              {t("archive")}
            </h2>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
            {past.map((concert) => (
              <Link
                key={concert.slug}
                href={{
                  pathname: "/concerts/[slug]",
                  params: { slug: concert.slug },
                }}
                className="group block"
              >
                <div className="aspect-[1/1.414] rounded-lg overflow-hidden border border-stone-300 bg-stone-100 mb-3 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
                  {concert.poster ? (
                    <Image
                      src={concert.poster}
                      alt={concert.title}
                      width={300}
                      height={424}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
                      <span className="font-serif font-semibold text-neutral-800 text-lg break-words hyphens-auto">
                        {concert.title}
                      </span>
                      <span className="mt-2 text-xs text-neutral-500">
                        {concert.composers}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="font-serif font-semibold text-neutral-900 group-hover:text-orange-600 transition-colors break-words hyphens-auto leading-snug">
                  {concert.title}
                </h3>
                <p className="text-sm text-neutral-600 break-words hyphens-auto">
                  {concert.composers}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
