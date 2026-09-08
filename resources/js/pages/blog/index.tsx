import { useState, useEffect } from 'react';
import { Link, usePage, router, Head } from '@inertiajs/react';
import { format } from 'date-fns';
import SiteLayout from '@/layouts/site-layout';
import { Search, X, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    published_at: string;
    meta_keywords: string | null;
    user?: {
        name: string;
    };
}

interface PaginatedPosts {
    data: BlogPost[];
    links: { url: string | null; active: boolean; label: string }[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface BlogIndexProps {
    posts: PaginatedPosts;
    search?: string;
}

const reveal = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' as const } },
};

const BlogIndex = ({ posts, search }: BlogIndexProps) => {
    const { auth } = usePage().props as any;
    const [searchInput, setSearchInput] = useState(search || '');

    useEffect(() => {
        setSearchInput(search || '');
    }, [search]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const url = searchInput.trim() ? `/blog?search=${encodeURIComponent(searchInput.trim())}` : '/blog';
        router.get(url);
    };

    const clearSearch = () => {
        setSearchInput('');
        router.get('/blog');
    };

    const pageTitle = search ? `Search: "${search}" - Blog` : 'Blog - FzlxTech';
    const pageDescription = search
        ? `Search results for "${search}" in the FzlxTech blog about web development, Laravel, React, and system architecture.`
        : 'Thoughts on web development, system architecture, and technology from FzlxTech.';

    return (
        <SiteLayout>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
            </Head>
            <div className="newsprint-texture">
                <div className="mx-auto max-w-screen-xl px-4 py-12">
                    <div className="border-b-4 border-double border-[#111111] pb-6 text-center">
                        <p className="font-news-mono text-xs uppercase tracking-widest text-[#CC0000]">
                            Sec. 05 &mdash; The Dispatch
                        </p>
                        <h1 className="font-display mt-2 text-5xl font-black tracking-tighter sm:text-6xl">
                            From the Newsroom
                        </h1>
                        <p className="mx-auto mt-3 max-w-xl font-body text-sm leading-relaxed text-neutral-600">
                            Field notes on web development, system architecture, and technology. Filed regularly
                            from Shah Alam.
                        </p>
                    </div>

                    {/* Search — ledger style */}
                    <form onSubmit={handleSearch} className="mx-auto mt-8 max-w-xl" role="search">
                        <label
                            htmlFor="blog-search"
                            className="font-news-mono text-[11px] uppercase tracking-widest text-neutral-500"
                        >
                            Search the archives
                        </label>
                        <div className="relative mt-2">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1">
                                <Search className="h-4 w-4" strokeWidth={1.5} />
                            </div>
                            <input
                                id="blog-search"
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="e.g. Laravel, React, architecture..."
                                className="block w-full border-b-2 border-[#111111] bg-transparent py-2 pl-8 pr-10 font-news-mono text-sm placeholder:text-neutral-500 focus-visible:bg-[#F0F0F0] focus-visible:outline-none"
                            />
                            {searchInput && (
                                <button
                                    type="button"
                                    onClick={clearSearch}
                                    aria-label="Clear search"
                                    className="absolute inset-y-0 right-0 flex min-h-[44px] min-w-[44px] items-center justify-center"
                                >
                                    <X className="h-4 w-4" strokeWidth={1.5} />
                                </button>
                            )}
                        </div>
                    </form>

                    {auth?.user && (
                        <div className="mt-6 text-center">
                            <Link
                                href="/blog/posts/create"
                                className="inline-flex min-h-[44px] items-center border border-[#111111] bg-[#111111] px-6 font-news-sans text-xs font-semibold uppercase tracking-widest text-[#F9F9F7] transition-all duration-200 hover:bg-[#F9F9F7] hover:text-[#111111]"
                            >
                                + File New Story
                            </Link>
                        </div>
                    )}

                    {posts.data.length === 0 ? (
                        <div className="mt-10 border border-[#111111] p-10 text-center">
                            <p className="font-body text-sm text-neutral-600">
                                {search ? 'No stories match your search.' : 'No stories on the wire yet. Check back soon!'}
                            </p>
                            {search && (
                                <button
                                    onClick={clearSearch}
                                    className="mt-4 font-news-sans text-xs font-semibold uppercase tracking-widest underline-offset-4 decoration-2 decoration-[#CC0000] hover:underline"
                                >
                                    Clear search
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="mt-10 grid grid-cols-1 gap-0 border border-[#111111] md:grid-cols-2">
                            {posts.data.map((post, idx) => (
                                <motion.div
                                    key={post.id}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={reveal}
                                    className={`${idx % 2 === 0 ? 'md:border-r md:border-[#111111]' : ''} ${
                                        idx < posts.data.length - (posts.data.length % 2 === 0 ? 2 : 1)
                                            ? 'border-b border-[#111111]'
                                            : ''
                                    } ${idx > 0 ? 'max-md:border-t max-md:border-[#E5E5E0] max-md:first:border-t-0' : ''}`}
                                >
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="hard-shadow-hover group block h-full bg-[#F9F9F7] p-6 hover:bg-neutral-100"
                                    >
                                        <div className="flex items-center gap-2 font-news-mono text-[11px] uppercase tracking-widest text-neutral-500">
                                            <time dateTime={post.published_at}>
                                                {format(new Date(post.published_at), 'MMM d, yyyy')}
                                            </time>
                                            <span className="text-[#CC0000]">&#x25A0;</span>
                                            <span>By {post.user?.name || 'Staff Writer'}</span>
                                        </div>
                                        <h2 className="font-display mt-3 text-2xl font-bold leading-tight lg:text-3xl">
                                            {post.title}
                                        </h2>
                                        {post.excerpt && (
                                            <p className="mt-3 line-clamp-3 text-justify font-body text-sm leading-relaxed text-neutral-600">
                                                {post.excerpt}
                                            </p>
                                        )}
                                        <div className="mt-5 flex flex-wrap items-center gap-3">
                                            <span className="inline-flex min-h-[44px] items-center gap-1 font-news-sans text-xs font-semibold uppercase tracking-widest underline-offset-4 group-hover:underline group-hover:decoration-2 group-hover:decoration-[#CC0000]">
                                                Read story
                                                <ArrowRight
                                                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                                                    strokeWidth={1.5}
                                                />
                                            </span>
                                            {post.meta_keywords && (
                                                <span className="font-news-mono text-[11px] uppercase tracking-widest text-neutral-500">
                                                    {post.meta_keywords
                                                        .split(',')
                                                        .slice(0, 3)
                                                        .map((k) => k.trim())
                                                        .join(' · ')}
                                                </span>
                                            )}
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {posts.links && posts.links.length > 1 && (
                        <nav aria-label="Pagination" className="mt-10 flex justify-center">
                            <div className="flex flex-wrap justify-center gap-0 border border-[#111111]">
                                {posts.links.map((link, idx) => (
                                    <Link
                                        key={idx}
                                        href={link.url || '#'}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        aria-current={link.active ? 'page' : undefined}
                                        className={`flex min-h-[44px] min-w-[44px] items-center justify-center border-r border-[#111111] px-4 font-news-mono text-xs uppercase tracking-widest last:border-r-0 ${
                                            link.active
                                                ? 'bg-[#111111] font-bold text-[#F9F9F7]'
                                                : 'transition-colors duration-200 hover:bg-neutral-100'
                                        }`}
                                    />
                                ))}
                            </div>
                        </nav>
                    )}
                </div>
            </div>
        </SiteLayout>
    );
};

export default BlogIndex;
