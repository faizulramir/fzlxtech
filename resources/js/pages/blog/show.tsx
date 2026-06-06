import React from 'react';
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
    const pageDescription = post.meta_description || post.excerpt || `Read "${post.title}" on FzlxTech blog about web development, Laravel, React, and system architecture.`;

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
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* Back to blog link */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-white/40 hover:text-white mb-10 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        Back to Blog
                    </Link>
                </motion.div>

                <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="rounded-2xl border border-white/5 bg-white/[0.01] overflow-hidden"
                >
                    {/* Featured Image */}
                    {post.featured_image && (
                        <div className="w-full h-64 md:h-96 overflow-hidden bg-white/5">
                            <img
                                src={`/storage/${post.featured_image}`}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div className="p-6 md:p-10">
                        {/* Header */}
                        <header className="mb-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-white/30 text-sm">
                                <time dateTime={post.published_at}>
                                    {format(new Date(post.published_at), 'MMMM d, yyyy')}
                                </time>
                                <span>•</span>
                                <span>By {post.user?.name || 'Anonymous'}</span>
                                {post.views_count !== undefined && (
                                    <>
                                        <span>•</span>
                                        <span className="inline-flex items-center gap-1">
                                            <Eye className="w-3.5 h-3.5" />
                                            {post.views_count} view{post.views_count !== 1 ? 's' : ''}
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* Tags */}
                            {post.meta_keywords && (
                                <div className="flex flex-wrap gap-2 mt-5">
                                    {post.meta_keywords.split(',').map((keyword: string, idx: number) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-white/5 text-white/40 text-sm rounded-full border border-white/5"
                                        >
                                            {keyword.trim()}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </header>

                        {/* Meta Description */}
                        {post.meta_description && (
                            <p className="text-lg text-white/40 border-l border-white/20 pl-5 py-2 mb-10 italic leading-relaxed">
                                {post.meta_description}
                            </p>
                        )}

                        {/* Content */}
                        <div
                            className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-white/60 prose-a:text-white prose-a:decoration-white/30 hover:prose-a:text-white/80 prose-strong:text-white/80 prose-code:text-white/60 prose-code:bg-white/5 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-img:rounded-xl prose-img:border prose-img:border-white/5"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>
                </motion.article>

                {/* Admin Actions */}
                {auth?.user && (post.user_id === auth.user.id || auth.user.isAdmin) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 flex gap-4 items-center"
                    >
                        <Link
                            href={`/blog/posts/${post.slug}/edit`}
                            className="px-5 py-2.5 bg-white text-black rounded-full font-medium text-sm hover:bg-white/90 transition-all duration-300"
                        >
                            Edit Post
                        </Link>

                        <div className="px-5 py-2.5 bg-white/5 text-white/40 rounded-full text-sm border border-white/5">
                            Status: <span className="font-semibold capitalize text-white/60">{post.status}</span>
                        </div>
                    </motion.div>
                )}
            </div>
        </SiteLayout>
    );
};

export default BlogShow;
