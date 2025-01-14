interface BlogPost {
  title: string;
  description: string;
  date: string;
  slug: string;
  image: {
    src: string;
    alt: string;
  };
  author: {
    name: string;
    image: string;
  };
}

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="flex flex-col rounded-lg border border-neutral-200 transition-all hover:shadow-lg"
    >
      <img
        alt={post.image.alt}
        fetchPriority="high"
        width={2400}
        height={1260}
        decoding="async"
        className="blur-0 aspect-[1200/630] rounded-t-xl object-cover"
        src={post.image.src}
      />
      <div className="flex flex-1 flex-col justify-between rounded-b-lg bg-white p-6">
        <div>
          <h2 className="line-clamp-2 font-display text-lg font-bold text-neutral-900">
            {post.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm text-neutral-500">
            {post.description}
          </p>
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <div className="flex items-center -space-x-2">
            <img
              alt={post.author.name}
              loading="lazy"
              width={32}
              height={32}
              decoding="async"
              className="blur-0 rounded-full transition-all group-hover:brightness-90"
              src={post.author.image}
            />
          </div>
          <time dateTime={post.date} className="text-sm text-neutral-500">
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>
      </div>
    </a>
  );
}
