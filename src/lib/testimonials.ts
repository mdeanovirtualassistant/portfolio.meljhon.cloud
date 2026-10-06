/** Client reviews shown in the Testimonials section and summarised in the About card. */

export type TestimonialCategory = "Executive Assistant" | "Team & Operations" | "IT Support";

export type Testimonial = {
  category: TestimonialCategory;
  project: string;
  rating: number;
  quote: string;
  author: string;
  context: string;
};

export const testimonialCategories: TestimonialCategory[] = ["Executive Assistant", "Team & Operations", "IT Support"];

export const testimonials: Testimonial[] = [
  {
    category: "Executive Assistant",
    project: "Executive Assistant Support",
    rating: 5,
    quote:
      "Meljhon has been an incredible support to me as my executive assistant. He consistently helps me stay organized by arranging my busy schedule, managing my calendar, and keeping me on track with important tasks. He’s proactive—always reminding me of upcoming deadlines and ensuring nothing falls through the cracks.\n\nHe also manages my inbox efficiently, keeping it clean and well-organized, and provides a quick, clear summary of what I need to respond to, highlighting urgent matters with the right flags. His attention to detail, reliability, and initiative make a huge difference in my day-to-day work. I truly appreciate his support and enjoy working with him.",
    author: "Matt D.",
    context: "Nonprofit Founder/CFO",
  },
  {
    category: "Team & Operations",
    project: "Team & Operations Support",
    rating: 5,
    quote:
      "Meljhon has been a tremendous support to our team and daily operations. He is excellent at coordinating with everyone, keeping tasks moving, and making sure important details do not get missed. What stands out most is his initiative—he does not wait to be told what needs to be done. When he sees an issue or an action that needs attention, he takes ownership, follows through, and helps get it resolved.\n\nHe is also dependable when it comes to supporting the team behind the scenes. He keeps communication organized, follows up on outstanding items, and steps in wherever support is needed. His proactive approach makes our operations run more smoothly and gives the team confidence that things are being handled. I truly appreciate his reliability, initiative, and commitment to helping the team succeed.",
    author: "Rebecca H.",
    context: "Director of Operations / MHR",
  },
  {
    category: "IT Support",
    project: "Technical Support & Initiative",
    rating: 5,
    quote:
      "Meljhon has been doing an excellent job supporting our IT operations. He is dependable, responsive, and consistently delivers quality work across day-to-day technical support tasks. What I appreciate most is his initiative—he does not wait to be asked. He identifies issues early, takes ownership, and follows through to make sure they are resolved.\n\nHe has been a strong support in handling remote and onsite IT concerns, including endpoints, connectivity, hardware, software, and infrastructure-related needs. He stays organized, communicates well, and helps keep operations running smoothly. Meljhon is someone the team can rely on, and his proactive approach makes a real difference.",
    author: "Jun V.",
    context: "IT Manager / Head",
  },
  {
    category: "IT Support",
    project: "Technical Support Needed: Need Web Consulting and Basic English Skills",
    rating: 5,
    quote:
      "Meljhon provided excellent technical support and was very easy to work with. He understood what I needed, communicated clearly, and helped resolve my web and technical concerns efficiently. I would gladly work with him again.",
    author: "Daryna K.",
    context: "Ukraine",
  },
  {
    category: "IT Support",
    project: "Connection Microsoft 365 et OVH",
    rating: 5,
    quote:
      "Meljhon is highly reliable, professional, and detail-oriented. He quickly understood the requirements, handled the Microsoft 365 and OVH connection setup with ease, and communicated clearly throughout the process. His technical skills and problem-solving mindset made the whole experience smooth and stress-free. I would definitely work with him again.",
    author: "Charlotte B.",
    context: "Client",
  },
];

/** Average of the review ratings, so every summary on the site agrees with the reviews themselves. */
export const averageRating = (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1);

/** What reviewers praise most, counted from the review text itself (never typed in by hand). */
const themes: { label: string; pattern: RegExp }[] = [
  { label: "Reliable", pattern: /reliab|dependab/i },
  { label: "Proactive", pattern: /proactiv|initiative/i },
  { label: "Detail-oriented", pattern: /detail/i },
  { label: "Clear communication", pattern: /communicat/i },
  { label: "Organized", pattern: /organiz/i },
];

export const praiseThemes = themes
  .map(({ label, pattern }) => ({ label, count: testimonials.filter((t) => pattern.test(t.quote)).length }))
  .filter((theme) => theme.count > 0)
  .sort((a, b) => b.count - a.count);

export const initialsOf = (name: string) =>
  name
    .replace(/[^A-Za-z\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
