import { useMemo, useState } from "react";
import { ArrowUpRight, ChevronDown, MessageSquareQuote, Quote, Star } from "lucide-react";
import {
  averageRating,
  initialsOf,
  praiseThemes,
  testimonialCategories,
  testimonials,
  type Testimonial,
  type TestimonialCategory,
} from "@/lib/testimonials";

const READ_MORE_THRESHOLD = 320;

const Stars = ({ size = "h-[18px] w-[18px]", rating = 5 }: { size?: string; rating?: number }) => (
  <span role="img" aria-label={`${rating} out of 5 stars`} className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} aria-hidden="true" className={`${size} ${i < rating ? "fill-orange-500 text-orange-500" : "text-border"}`} />
    ))}
  </span>
);

const TestimonialCard = ({ item, featured, index }: { item: Testimonial; featured: boolean; index: number }) => {
  const paragraphs = item.quote.split("\n\n");
  const long = item.quote.length > READ_MORE_THRESHOLD;
  const [expanded, setExpanded] = useState(false);

  const collapsed = long && !expanded;

  return (
    <figure
      className={`bento-card flex flex-col ${featured ? "md:col-span-2" : ""}`}
      style={{ animation: `fade-in-up .45s ease-out ${index * 70}ms both` }}
    >
      <Quote aria-hidden="true" className="absolute right-5 top-5 h-10 w-10 rotate-180 text-primary/10" />
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pr-12">
        <Stars />
        <span className="text-sm font-bold text-foreground">{item.rating.toFixed(1)}</span>
        <span className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-primary">
          {item.category}
        </span>
      </div>
      <p className="mt-3 text-sm font-semibold leading-snug text-primary">{item.project}</p>
      <blockquote className={`mt-3 flex-1 space-y-3 leading-7 text-foreground ${featured ? "text-base" : "text-[15px]"}`}>
        {paragraphs.map((para, i) => (
          <p
            key={i}
            className={collapsed && i > 0 ? "hidden" : collapsed ? "line-clamp-4" : undefined}
          >
            {i === 0 ? "“" : ""}
            {para}
            {i === paragraphs.length - 1 && !collapsed ? "”" : ""}
          </p>
        ))}
      </blockquote>
      {long && (
        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          aria-expanded={expanded}
          className="mt-2 flex w-fit items-center gap-1 rounded-md text-sm font-semibold text-primary hover:underline"
        >
          {expanded ? "Show less" : "Read full review"}
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>
      )}
      <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <span className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
          >
            {initialsOf(item.author)}
          </span>
          <span className="min-w-0 text-sm leading-tight">
            <span className="block font-bold text-foreground">{item.author}</span>
            <span className="block text-muted-foreground">{item.context}</span>
          </span>
        </span>
      </figcaption>
    </figure>
  );
};

/** Testimonials: a rating summary, praise themes, filter chips by service, and review cards with a featured first review. */
const Testimonials = ({ onContact }: { onContact: () => void }) => {
  const [filter, setFilter] = useState<"All" | TestimonialCategory>("All");

  const categories = useMemo(
    () => testimonialCategories.map((category) => ({ category, count: testimonials.filter((t) => t.category === category).length })).filter((c) => c.count > 0),
    [],
  );
  const visible = filter === "All" ? testimonials : testimonials.filter((t) => t.category === filter);

  return (
    <section id="testimonials" className="mt-7 scroll-mt-24 rounded-[1.5rem] border border-primary/20 bg-gradient-to-b from-primary/[0.06] to-primary/[0.16] p-2 sm:rounded-[2rem] sm:p-4 lg:scroll-mt-6">
      <div className="flex items-start gap-3 px-3 pb-4 pt-3 sm:px-4">
        <span className="icon-chip"><MessageSquareQuote className="h-5 w-5" /></span>
        <div className="min-w-0">
          <h2 className="text-lg font-bold leading-tight text-foreground">What people say about my work</h2>
          <p className="mt-1 text-sm leading-snug text-muted-foreground">Feedback from clients and teams I’ve supported.</p>
        </div>
      </div>

      <div className="bento-card mb-4 grid gap-5 md:grid-cols-[auto_1fr] md:items-center md:gap-8">
        <div className="flex items-center gap-4">
          <p className="text-5xl font-extrabold leading-none tracking-tight text-foreground">{averageRating}</p>
          <div className="space-y-1.5">
            <Stars size="h-5 w-5" />
            <p className="text-sm text-muted-foreground">
              Average of <span className="font-semibold text-foreground">{testimonials.length} client reviews</span>
            </p>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Clients often mention</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {praiseThemes.map((theme) => (
              <li key={theme.label} className="hover-chip flex items-center gap-2 rounded-full border border-border bg-background py-1 pl-3 pr-1.5 text-xs font-medium text-foreground">
                {theme.label}
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary" aria-label={`mentioned in ${theme.count} of ${testimonials.length} reviews`}>
                  {theme.count}/{testimonials.length}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div role="group" aria-label="Filter reviews by service" className="mb-4 flex flex-wrap gap-2 px-1">
        {[{ category: "All" as const, count: testimonials.length }, ...categories].map(({ category, count }) => {
          const active = filter === category;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(category)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                active
                  ? "border-primary bg-primary text-primary-foreground shadow-card"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary"
              }`}
            >
              {category} <span>· {count}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "review" : "reviews"}{filter === "All" ? "" : ` for ${filter}`}.
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {visible.map((item, i) => (
          <TestimonialCard key={`${filter}-${item.author}`} item={item} featured={filter === "All" && i === 0} index={i} />
        ))}
      </div>

      <div className="mt-4 flex flex-col items-start justify-between gap-3 rounded-2xl border border-primary/20 bg-card/80 px-5 py-4 sm:flex-row sm:items-center">
        <p className="text-sm leading-snug text-muted-foreground">
          <span className="font-bold text-foreground">Need dependable help like this?</span> Tell me what you need support with.
        </p>
        <button
          type="button"
          onClick={onContact}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-card transition-transform hover:-translate-y-0.5"
        >
          Work with me <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
