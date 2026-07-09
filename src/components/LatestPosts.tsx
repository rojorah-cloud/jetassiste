import { useQuery } from "@tanstack/react-query";

type WPPost = {
  id: number;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url?: string;
      alt_text?: string;
      media_details?: {
        sizes?: Record<string, { source_url?: string }>;
      };
    }>;
  };
};

const BLOG_URL = "https://blog.jetassiste.com";
const API_URL = `${BLOG_URL}/wp-json/wp/v2/posts?per_page=4&_embed=wp:featuredmedia&_fields=id,link,title,excerpt,_links,_embedded`;

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\[&hellip;\]|\[…\]/g, "…")
    .replace(/\s+/g, " ")
    .trim();
}

function getFeaturedImage(post: WPPost): { src: string; alt: string } | null {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  if (!media) return null;
  const sizes = media.media_details?.sizes;
  const src =
    sizes?.medium_large?.source_url ??
    sizes?.large?.source_url ??
    sizes?.medium?.source_url ??
    media.source_url;
  if (!src) return null;
  return { src, alt: media.alt_text ?? "" };
}

async function fetchLatestPosts(): Promise<WPPost[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`WordPress API error: ${res.status}`);
  return res.json();
}

export function LatestPosts() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["latest-posts"],
    queryFn: fetchLatestPosts,
    staleTime: 5 * 60_000,
    retry: 1,
  });

  return (
    <section className="py-24 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-14">
          <span className="font-mono text-[10px] uppercase tracking-widest text-accent mb-4 block">
            Blog
          </span>
          <h2 className="font-display text-3xl md:text-4xl leading-tight">
            Derniers articles
          </h2>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl ring-1 ring-border overflow-hidden bg-card animate-pulse"
              >
                <div className="aspect-[4/3] bg-muted/20" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-muted/20 rounded w-3/4" />
                  <div className="h-3 bg-muted/20 rounded w-full" />
                  <div className="h-3 bg-muted/20 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="rounded-2xl ring-1 ring-border bg-card p-8 text-center">
            <p className="text-sm text-muted mb-4">
              Impossible de charger les articles pour le moment.
            </p>
            <a
              href={BLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-medium underline underline-offset-4 hover:text-accent"
            >
              Visiter le blog
            </a>
          </div>
        )}

        {data && data.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.map((post) => {
                const image = getFeaturedImage(post);
                const excerpt = stripHtml(post.excerpt.rendered);
                return (
                  <article
                    key={post.id}
                    className="group flex flex-col rounded-2xl ring-1 ring-border bg-card overflow-hidden hover:ring-accent/30 transition-all"
                  >
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block aspect-[4/3] bg-sand overflow-hidden"
                    >
                      {image ? (
                        <img
                          src={image.src}
                          alt={image.alt}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full grid place-items-center text-muted font-mono text-[10px] uppercase tracking-widest">
                          Article
                        </div>
                      )}
                    </a>
                    <div className="p-5 flex flex-col flex-1">
                      <h3
                        className="font-display text-lg leading-snug mb-2 text-balance"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                      />
                      {excerpt && (
                        <p className="text-sm text-muted leading-relaxed line-clamp-3 mb-5">
                          {excerpt}
                        </p>
                      )}
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent hover:opacity-80 transition-opacity"
                      >
                        Lire l'article <span aria-hidden>→</span>
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-14 text-center">
              <a
                href={BLOG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 ring-1 ring-foreground/15 rounded-full text-sm font-medium hover:bg-foreground hover:text-background transition-all"
              >
                Voir tous les articles
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
