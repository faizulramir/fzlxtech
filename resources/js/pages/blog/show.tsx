import React from 'react';
import { Link, usePage, Head } from '@inertiajs/react';
import { format } from 'date-fns';
import SiteLayout from '@/layouts/site-layout';

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

    // SEO meta
    const siteTitle = 'FzlxTech';
    const pageTitle = `${post.title} | ${siteTitle}`;
    const pageDescription = post.meta_description || post.excerpt || `Read "${post.title}" on FzlxTech blog about web development, Laravel, React, and system architecture.`;

    return (
        <SiteLayout>
            <Head
                title={pageTitle}
                meta={[
                    { name: 'description', content: pageDescription },
                    { property: 'og:title', content: pageTitle },
                    { property: 'og:description', content: pageDescription },
                    { property: 'og:type', content: 'article' },
                    { property: 'article:published_time', content: post.published_at },
                    { property: 'article:author', content: post.user?.name || 'FzlxTech' },
                    { name: 'twitter:title', content: pageTitle },
                    { name: 'twitter:description', content: pageDescription },
                ]}
            />
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* Back to blog link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
                >
                    ← Back to Blog
                </Link>

                <article className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    {/* Featured Image */}
                    {post.featured_image && (
                        <div className="w-full h-64 md:h-96 overflow-hidden bg-slate-100">
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
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm">
                                <time dateTime={post.published_at}>
                                    {format(new Date(post.published_at), 'MMMM d, yyyy')}
                                </time>
                                <span>•</span>
                                <span>By {post.user?.name || 'Anonymous'}</span>
                                {post.views_count !== undefined && (
                                    <>
                                        <span>•</span>
                                        <span>{post.views_count} view{post.views_count !== 1 ? 's' : ''}</span>
                                    </>
                                )}
                            </div>

                            {/* Tags */}
                            {post.meta_keywords && (
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {post.meta_keywords.split(',').map((keyword: string, idx: number) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                                        >
                                            {keyword.trim()}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </header>

                        {/* Meta Description */}
                        {post.meta_description && (
                            <p className="text-lg text-slate-600 border-l-4 border-blue-500 pl-4 py-2 mb-8 italic">
                                {post.meta_description}
                            </p>
                        )}

                        {/* Content */}
                        <div
                            className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-lg prose-img:shadow-md"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>
                </article>

                {/* Admin Actions */}
                {auth?.user && (post.user_id === auth.user.id || auth.user.isAdmin) && (
                    <div className="mt-6 flex gap-4">
                        <Link
                            href={`/blog/posts/${post.slug}/edit`}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Edit Post
                        </Link>

                        <div className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg">
                            Status: <span className="font-semibold capitalize">{post.status}</span>
                        </div>
                    </div>
                )}
            </div>
        </SiteLayout>
    );
};

export default BlogShow;
