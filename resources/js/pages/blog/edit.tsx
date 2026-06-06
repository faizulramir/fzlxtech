import React, { useState, useEffect } from 'react';
import { usePage, Link, router } from '@inertiajs/react';
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

const stagger = {
    animate: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

const inputClass = "w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all";

const labelClass = "block text-sm font-medium text-white/50 mb-2";

const BlogEdit = ({ post }: BlogEditProps) => {
    const { errors } = usePage().props;
    const [title, setTitle] = useState(post.title);
    const [excerpt, setExcerpt] = useState(post.excerpt || '');
    const [content, setContent] = useState(post.content);
    const [featuredImage, setFeaturedImage] = useState<File | null>(null);
    const [status, setStatus] = useState(post.status);
    const [publishedAt, setPublishedAt] = useState(
        post.published_at ? new Date(post.published_at).toISOString().slice(0, 16) : ''
    );
    const [metaDescription, setMetaDescription] = useState(post.meta_description || '');
    const [metaKeywords, setMetaKeywords] = useState(post.meta_keywords || '');
    const [previewImage, setPreviewImage] = useState<string | null>(
        post.featured_image ? `/storage/${post.featured_image}` : null
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
            }
        });
    };

    return (
        <SiteLayout>
            <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={stagger}
                >
                    <motion.div variants={fadeUp} className="mb-10 flex items-center justify-between">
                        <div>
                            <Link
                                href={`/blog/${post.slug}`}
                                className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-4 transition-colors group"
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                                View Post
                            </Link>
                            <h1 className="text-4xl font-bold text-white tracking-tight">Edit Post</h1>
                            <p className="text-white/30 mt-2">Update your blog post.</p>
                        </div>
                    </motion.div>

                    <motion.form
                        variants={fadeUp}
                        onSubmit={handleSubmit}
                        className="rounded-2xl border border-white/5 bg-white/[0.01] p-8 space-y-6"
                    >
                        {/* Title */}
                        <div>
                            <label className={labelClass}>
                                Title <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={inputClass}
                            />
                            {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
                        </div>

                        {/* Excerpt */}
                        <div>
                            <label className={labelClass}>Excerpt (Optional)</label>
                            <textarea
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                rows={3}
                                className={inputClass}
                            />
                            {errors.excerpt && <p className="mt-1 text-sm text-red-400">{errors.excerpt}</p>}
                        </div>

                        {/* Content */}
                        <div>
                            <label className={labelClass}>
                                Content <span className="text-red-400">*</span>
                            </label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={15}
                                className={`${inputClass} font-mono text-sm`}
                            />
                            {errors.content && <p className="mt-1 text-sm text-red-400">{errors.content}</p>}
                        </div>

                        {/* Featured Image */}
                        <div>
                            <label className={labelClass}>Featured Image (Optional)</label>
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                                onChange={handleImageChange}
                                className={`${inputClass} file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-white/10 file:text-white/60 file:text-sm file:hover:bg-white/20 file:transition-all file:cursor-pointer`}
                            />
                            {previewImage && (
                                <div className="mt-3">
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        className="w-32 h-32 object-cover rounded-lg border border-white/10"
                                    />
                                </div>
                            )}
                            {errors.featured_image && <p className="mt-1 text-sm text-red-400">{errors.featured_image}</p>}
                        </div>

                        {/* Status */}
                        <div>
                            <label className={labelClass}>
                                Status <span className="text-red-400">*</span>
                            </label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className={`${inputClass} cursor-pointer`}
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="archived">Archived</option>
                            </select>
                            {errors.status && <p className="mt-1 text-sm text-red-400">{errors.status}</p>}
                        </div>

                        {/* Publish Date */}
                        <div>
                            <label className={labelClass}>Publish Date (Optional)</label>
                            <input
                                type="datetime-local"
                                value={publishedAt}
                                onChange={(e) => setPublishedAt(e.target.value)}
                                className={inputClass}
                            />
                            {errors.published_at && <p className="mt-1 text-sm text-red-400">{errors.published_at}</p>}
                        </div>

                        {/* Meta Description */}
                        <div>
                            <label className={labelClass}>Meta Description (Optional)</label>
                            <textarea
                                value={metaDescription}
                                onChange={(e) => setMetaDescription(e.target.value)}
                                rows={2}
                                className={inputClass}
                            />
                            {errors.meta_description && <p className="mt-1 text-sm text-red-400">{errors.meta_description}</p>}
                        </div>

                        {/* Meta Keywords */}
                        <div>
                            <label className={labelClass}>Meta Keywords (Optional)</label>
                            <input
                                type="text"
                                value={metaKeywords}
                                onChange={(e) => setMetaKeywords(e.target.value)}
                                className={inputClass}
                                placeholder="comma, separated, keywords"
                            />
                            {errors.meta_keywords && <p className="mt-1 text-sm text-red-400">{errors.meta_keywords}</p>}
                        </div>

                        {/* Submit */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-8 py-2.5 bg-white text-black rounded-full font-medium text-sm hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Updating...' : 'Update Post'}
                            </button>

                            <Link
                                href="/dashboard"
                                className="px-8 py-2.5 border border-white/10 text-white/60 rounded-full font-medium text-sm hover:bg-white/5 hover:text-white transition-all duration-300"
                            >
                                Cancel
                            </Link>
                        </div>
                    </motion.form>
                </motion.div>
            </div>
        </SiteLayout>
    );
};

export default BlogEdit;
