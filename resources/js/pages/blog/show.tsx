import { Link, usePage, Head } from '@inertiajs/react';
import { format } from 'date-fns';
import SiteLayout from '@/layouts/site-layout';
import { ArrowLeft, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface PostData {
    id: number;
    slug: string;
    title: string;
    excerpt: string | null;
    content: string;
    featured_image: string | null;
    status: string;
    published_at: string;
    meta_description: string | null;
    meta_keywords: string | null;
    views_count?: number;
    user?: {
        name: string;
    };
    user_id: number;
}

interface BlogShowProps {
    post: PostData;
}

const BlogShow = ({ post }: BlogShowProps) => {
    const { auth } = usePage().props as any;

    const siteTitle = 'FzlxTech';
    const pageTitle = `${post.title} | ${siteTitle}`;
    const pageDescription =
        post.meta_description ||
        post.excerpt ||
        `Read "${post.title}" on FzlxTech blog about web development, Laravel, React, and system architecture.`;

    return (
        <SiteLayout>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="article" />
                <meta property="article:published_time" content={post.published_at} />
                <meta property="article:author" content={post.user?.name || 'FzlxTech'} />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
            </Head>
            <div className="newsprint-texture">
                <div className="mx-auto max-w-screen-xl px-4 py-10">
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                        <Link
                            href="/blog"
                            className="inline-flex min-h-[44px] items-center gap-2 font-news-mono text-xs uppercase tracking-widest underline-offset-4 decoration-2 hover:text-[#CC0000] hover:underline"
                        >
                            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                            Back to the Dispatch
                        </Link>
                    </motion.div>

                    <motion.article
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut', delay: 0.05 }}
                        className="mx-auto mt-6 max-w-4xl border border-[#111111] bg-[#F9F9F7]"
                    >
                        {post.featured_image && (
                            <figure className="border-b border-[#111111]">
                                <img
                                    src={`/storage/${post.featured_image}`}
                                    alt={post.title}
                                    className="max-h-[480px] w-full object-cover grayscale"
                                />
                                <figcaption className="border-t border-[#E5E5E0] px-4 py-2 font-news-mono text-[11px] uppercase tracking-widest text-neutral-500">
                                    Fig. 2.1 &mdash; {post.title}
                                </figcaption>
                            </figure>
                        )}

                        <div className="p-6 sm:p-10">
                            <p className="font-news-mono text-[11px] uppercase tracking-widest text-[#CC0000]">
                                The Dispatch &mdash; Filed {format(new Date(post.published_at), 'MMMM d, yyyy')}
                            </p>
                            <h1 className="font-display mt-3 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
                                {post.title}
                            </h1>

                            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 border-y border-[#111111] py-2.5 font-news-mono text-[11px] uppercase tracking-widest text-neutral-500">
                                <span>By {post.user?.name || 'Staff Writer'}</span>
                                <span className="text-[#CC0000]">&#x25A0;</span>
                                <time dateTime={post.published_at}>
                                    {format(new Date(post.published_at), 'MMMM d, yyyy')}
                                </time>
                                {post.views_count !== undefined && (
                                    <>
                                        <span className="text-[#CC0000]">&#x25A0;</span>
                                        <span className="inline-flex items-center gap-1">
                                            <Eye className="h-3.5 w-3.5" strokeWidth={1.5} />
                                            {post.views_count} view{post.views_count !== 1 ? 's' : ''}
                                        </span>
                                    </>
                                )}
                            </div>

                            {post.meta_keywords && (
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {post.meta_keywords.split(',').map((keyword: string, idx: number) => (
                                        <span
                                            key={idx}
                                            className="border border-[#111111] px-2.5 py-1 font-news-mono text-[11px] uppercase tracking-widest"
                                        >
                                            {keyword.trim()}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {post.meta_description && (
                                <p className="mt-8 border-y-4 border-double border-[#111111] py-4 font-body text-lg italic leading-relaxed">
                                    {post.meta_description}
                                </p>
                            )}

                            <div
                                className="newsprint-prose mt-8 text-[15px]"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            <div className="py-6 text-center font-display text-xl tracking-[0.5em] text-neutral-400">
                                &#x2727; &#x2727; &#x2727;
                            </div>
                        </div>
                    </motion.article>

                    {auth?.user && (post.user_id === auth.user.id || auth.user.isAdmin) && (
                        <div className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center gap-3">
                            <Link
                                href={`/blog/posts/${post.slug}/edit`}
                                className="inline-flex min-h-[44px] items-center border border-[#111111] bg-[#111111] px-5 font-news-sans text-xs font-semibold uppercase tracking-widest text-[#F9F9F7] transition-all duration-200 hover:bg-[#F9F9F7] hover:text-[#111111]"
                            >
                                Edit Story
                            </Link>
                            <div className="inline-flex min-h-[44px] items-center border border-[#111111] px-5 font-news-mono text-[11px] uppercase tracking-widest">
                                Status: <span className="ml-1 font-bold capitalize">{post.status}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </SiteLayout>
    );
};

export default BlogShow;
