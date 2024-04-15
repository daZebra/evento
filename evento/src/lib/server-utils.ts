import "server-only";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { capitalize } from "./utils";
import { RESULTS_PER_PAGE } from "./const";
import prisma from "./db";

export const getEvents = unstable_cache(async (city: string, page = 1) => {
  const events = await prisma.eventoEvent.findMany({
    where: {
      city: city === "all" ? undefined : capitalize(city),
    },
    orderBy: { date: "asc" },
    take: RESULTS_PER_PAGE,
    skip: RESULTS_PER_PAGE * (page - 1),
  });

  let totalCount = 0;
  if (city === "all") {
    totalCount = await prisma.eventoEvent.count();
  } else {
    totalCount = await prisma.eventoEvent.count({
      where: {
        city: capitalize(city),
      },
    });
  }

  return { events, totalCount };
});

export const getEvent = unstable_cache(async (slug: string) => {
  const event = await prisma.eventoEvent.findUnique({
    where: { slug: slug },
  });

  if (!event) {
    return notFound();
  }

  return event;
});
