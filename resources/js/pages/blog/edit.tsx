import React, { useState, useEffect } from 'react';
import { usePage, Link, router, Head } from '@inertiajs/react';
import SiteLayout from '@/layouts/site-layout';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface PostData {
    id: number;
    slug: string;
    title: string;
    excerpt: string | null;
    content: string;
    featured_image: string | null;
    status: string;
    published_at: string | null;
    meta_description: string | null;
    meta_keywords: string | null;
    user_id: number;
}

interface BlogEditProps {
    post: PostData;
}

const reveal = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' as const } },
};

const inputClass =
    'w-full border-b-2 border-[#111111] bg-transparent px-1 py-2 font-news-sans text-sm text-[#111111] placeholder:text-neutral-500 focus-visible:bg-[#F0F0F0] focus-visible:outline-none';

const labelClass = 'mb-2 block font-news-mono text-[11px] uppercase tracking-widest text-neutral-600';

const errorClass = 'mt-1 font-news-sans text-xs text-[#CC0000]';

const BlogEdit = ({ post }: BlogEditProps) => {
    const { errors } = usePage().props;
    const [title, setTitle] = useState(post.title);
    const [excerpt, setExcerpt] = useState(post.excerpt || '');
    const [content, setContent] = useState(post.content);
    const [featuredImage, setFeaturedImage] = useState<File | null>(null);
    const [status, setStatus] = useState(post.status);
    const [publishedAt, setPublishedAt] = useState(
        post.published_at ? new Date(post.published_at).toISOString().slice(0, 16) : '',
    );
    const [metaDescription, setMetaDescription] = useState(post.meta_description || '');
    const [metaKeywords, setMetaKeywords] = useState(post.meta_keywords || '');
    const [previewImage, setPreviewImage] = useState<string | null>(
        post.featured_image ? `/storage/${post.featured_image}` : null,
    );
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        setTitle(post.title);
        setExcerpt(post.excerpt || '');
        setContent(post.content);
        setStatus(post.status);
        setPublishedAt(post.published_at ? new Date(post.published_at).toISOString().slice(0, 16) : '');
        setMetaDescription(post.meta_description || '');
        setMetaKeywords(post.meta_keywords || '');
        setPreviewImage(post.featured_image ? `/storage/${post.featured_image}` : null);
        setFeaturedImage(null);
    }, [post]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFeaturedImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('excerpt', excerpt);
        formData.append('content', content);
        formData.append('status', status);
        formData.append('published_at', publishedAt);
        formData.append('meta_description', metaDescription);
        formData.append('meta_keywords', metaKeywords);
        if (featuredImage) {
            formData.append('featured_image', featuredImage);
        }

        router.put(`/blog/posts/${post.slug}`, formData, {
            forceFormData: true,
            onSuccess: () => {
                setProcessing(false);
            },
            onError: () => {
                setProcessing(false);
            },
        });
    };

    return (
        <SiteLayout>
            <Head>
                <title>Edit Post - Blog</title>
            </Head>
            <div className="newsprint-texture">
                <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                    <motion.div initial="hidden" animate="visible" variants={reveal}>
                        <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex min-h-[44px] items-center gap-2 font-news-mono text-xs uppercase tracking-widest underline-offset-4 decoration-2 hover:text-[#CC0000] hover:underline"
                        >
                            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                            View Post
                        </Link>

                        <div className="mt-4 border-b-4 border-double border-[#111111] pb-6">
                            <p className="font-news-mono text-xs uppercase tracking-widest text-[#CC0000]">
                                The Newsroom &mdash; Revisions Desk
                            </p>
                            <h1 className="font-display mt-2 text-4xl font-black tracking-tight sm:text-5xl">
                                Revise the Story
                            </h1>
                            <p className="mt-2 font-news-mono text-[11px] uppercase tracking-widest text-neutral-500">
                                Status: <span className="font-bold capitalize">{post.status}</span>
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-6 border border-[#111111] bg-[#F9F9F7] p-6 sm:p-8"
                        >
                            {/* Title */}
                            <div>
                                <label htmlFor="post-title" className={labelClass}>
                                    Headline <span className="text-[#CC0000]">*</span>
                                </label>
                                <input
                                    id="post-title"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className={inputClass}
                                />
                                {errors.title && <p className={errorClass}>{errors.title}</p>}
                            </div>

                            {/* Excerpt */}
                            <div>
                                <label htmlFor="post-excerpt" className={labelClass}>
                                    Standfirst (Optional)
                                </label>
                                <textarea
                                    id="post-excerpt"
                                    value={excerpt}
                                    onChange={(e) => setExcerpt(e.target.value)}
                                    rows={3}
                                    className={inputClass}
                                />
                                {errors.excerpt && <p className={errorClass}>{errors.excerpt}</p>}
                            </div>

                            {/* Content */}
                            <div>
                                <label htmlFor="post-content" className={labelClass}>
                                    Body Copy <span className="text-[#CC0000]">*</span>
                                </label>
                                <textarea
                                    id="post-content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    rows={15}
                                    className={`${inputClass} font-news-mono`}
                                />
                                {errors.content && <p className={errorClass}>{errors.content}</p>}
                            </div>

                            {/* Featured Image */}
                            <div>
                                <label htmlFor="post-image" className={labelClass}>
                                    Plate Image (Optional)
                                </label>
                                <input
                                    id="post-image"
                                    type="file"
                                    accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                                    onChange={handleImageChange}
                                    className="w-full border border-[#111111] bg-transparent px-3 py-2 font-news-mono text-xs file:mr-3 file:border file:border-[#111111] file:bg-[#111111] file:px-4 file:py-1.5 file:font-news-sans file:text-xs file:uppercase file:tracking-widest file:text-[#F9F9F7]"
                                />
                                {previewImage && (
                                    <figure className="mt-3 inline-block border border-[#111111] p-1">
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            className="h-32 w-32 object-cover grayscale"
                                        />
                                        <figcaption className="px-1 py-1 font-news-mono text-[10px] uppercase tracking-widest text-neutral-500">
                                            Fig. &mdash; Proof
                                        </figcaption>
                                    </figure>
                                )}
                                {errors.featured_image && (
                                    <p className={errorClass}>{errors.featured_image}</p>
                                )}
                            </div>

                            {/* Status */}
                            <div>
                                <label htmlFor="post-status" className={labelClass}>
                                    Status <span className="text-[#CC0000]">*</span>
                                </label>
                                <select
                                    id="post-status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className={`${inputClass} cursor-pointer`}
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                    <option value="archived">Archived</option>
                                </select>
                                {errors.status && <p className={errorClass}>{errors.status}</p>}
                            </div>

                            {/* Publish Date */}
                            <div>
                                <label htmlFor="post-published-at" className={labelClass}>
                                    Press Date (Optional)
                                </label>
                                <input
                                    id="post-published-at"
                                    type="datetime-local"
                                    value={publishedAt}
                                    onChange={(e) => setPublishedAt(e.target.value)}
                                    className={inputClass}
                                />
                                {errors.published_at && (
                                    <p className={errorClass}>{errors.published_at}</p>
                                )}
                            </div>

                            {/* Meta Description */}
                            <div>
                                <label htmlFor="post-meta-description" className={labelClass}>
                                    Meta Description (Optional)
                                </label>
                                <textarea
                                    id="post-meta-description"
                                    value={metaDescription}
                                    onChange={(e) => setMetaDescription(e.target.value)}
                                    rows={2}
                                    className={inputClass}
                                />
                                {errors.meta_description && (
                                    <p className={errorClass}>{errors.meta_description}</p>
                                )}
                            </div>

                            {/* Meta Keywords */}
                            <div>
                                <label htmlFor="post-meta-keywords" className={labelClass}>
                                    Meta Keywords (Optional)
                                </label>
                                <input
                                    id="post-meta-keywords"
                                    type="text"
                                    value={metaKeywords}
                                    onChange={(e) => setMetaKeywords(e.target.value)}
                                    className={inputClass}
                                    placeholder="comma, separated, keywords"
                                />
                                {errors.meta_keywords && (
                                    <p className={errorClass}>{errors.meta_keywords}</p>
                                )}
                            </div>

                            {/* Submit */}
                            <div className="flex flex-col gap-3 border-t border-[#111111] pt-6 sm:flex-row">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex min-h-[44px] items-center justify-center border border-[#111111] bg-[#111111] px-8 font-news-sans text-xs font-semibold uppercase tracking-widest text-[#F9F9F7] transition-all duration-200 hover:bg-[#F9F9F7] hover:text-[#111111] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processing ? 'Reprinting...' : 'Reprint Story'}
                                </button>

                                <Link
                                    href="/dashboard"
                                    className="inline-flex min-h-[44px] items-center justify-center border border-[#111111] px-8 font-news-sans text-xs font-semibold uppercase tracking-widest transition-all duration-200 hover:bg-[#111111] hover:text-[#F9F9F7]"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </SiteLayout>
    );
};

export default BlogEdit;
