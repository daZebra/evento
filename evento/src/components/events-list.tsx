import EventCard from "./event-card";
import { getEvents } from "@/lib/server-utils";
import PaginationControls from "./pagination-controls";
import { RESULTS_PER_PAGE } from "@/lib/const";

type EventsListProps = {
  city: string;
  page?: number;
};

export default async function EventsList({ city, page = 1 }: EventsListProps) {
  const { events, totalCount } = await getEvents(city, page);

  const previousPath = page > 1 ? `/events/${city}?page=${page - 1}` : "";
  const nextPath =
    totalCount > page * RESULTS_PER_PAGE
      ? `/events/${city}?page=${page + 1}`
      : "";

  console.log({ totalCount, previousPath, nextPath });

  return (
    <section className="max-w-[1100px] flex flex-wrap gap-10 justify-center px-[20px]">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
      <PaginationControls previousPath={previousPath} nextPath={nextPath} />
    </section>
  );
}
