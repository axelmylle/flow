import { BlogCard } from "@/components/blog-card";

// This would typically come from your data source
const BLOG_POSTS = [
  {
    title: "Introducing Dub.co",
    description: "A modern link management platform for modern teams",
    date: "2024-03-20",
    slug: "introducing-dub",
    image: {
      src: "https://assets.dub.co/blog/soc2.jpg",
      alt: "Introducing Dub.co",
    },
    author: {
      name: "John Doe",
      image: "/images/blog/author.jpg",
    },
  },
  {
    title: "Introducing Dub.co",
    description: "A modern link management platform for modern teams",
    date: "2024-03-20",
    slug: "introducing-dub",
    image: {
      src: "https://assets.dub.co/blog/soc2.jpg",
      alt: "Introducing Dub.co",
    },
    author: {
      name: "John Doe",
      image: "/images/blog/author.jpg",
    },
  },
  {
    title: "Introducing Dub.co",
    description: "A modern link management platform for modern teams",
    date: "2024-03-20",
    slug: "introducing-dub",
    image: {
      src: "https://assets.dub.co/blog/soc2.jpg",
      alt: "Introducing Dub.co",
    },
    author: {
      name: "John Doe",
      image: "/images/blog/author.jpg",
    },
  },
  {
    title: "Introducing Dub.co",
    description: "A modern link management platform for modern teams",
    date: "2024-03-20",
    slug: "introducing-dub",
    image: {
      src: "https://assets.dub.co/blog/soc2.jpg",
      alt: "Introducing Dub.co",
    },
    author: {
      name: "John Doe",
      image: "/images/blog/author.jpg",
    },
  },
  // ... more posts
];

export default function BlogPage() {
  return (
    <div className="mx-auto w-full px-3 relative max-w-screen-lg lg:px-4 xl:px-0">
      {/* Background SVG Pattern */}
      <svg
        className="pointer-events-none absolute inset-[unset] left-1/2 top-0 h-80 w-full -translate-x-1/2 text-neutral-300 [mask-image:radial-gradient(70%_60%_at_50%_60%,black_30%,transparent)] max-sm:opacity-50"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="grid-pattern"
            x="35"
            y="43"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 80 0 L 0 0 0 80"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect fill="url(#grid-pattern)" width="100%" height="100%" />
      </svg>

      {/* Content */}
      <div className="relative pb-9 pt-16 sm:pb-20">
        <h1 className="mt-5 font-display animate-slide-up-fade [--offset:20px] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in [animation-delay:100ms] text-4xl font-medium text-neutral-900 sm:text-5xl sm:leading-[1.15] text-left">
          Blog
        </h1>
        <p className="mt-5 text-neutral-500 sm:text-lg animate-slide-up-fade [--offset:10px] [animation-delay:200ms] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in">
          Latest news and updates from gigflow
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="relative min-h-[50vh] border-t border-neutral-200 bg-gradient-to-b from-neutral-50">
        <div className="mx-auto w-full px-3 grid max-w-screen-lg grid-cols-1 gap-4 py-10 md:grid-cols-3 lg:px-4 xl:px-0">
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
