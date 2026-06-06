<?php

namespace App\Policies;

use App\Models\BlogPost;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class BlogPostPolicy
{
    /**
     * Determine whether the user can view any models (list view).
     */
    public function viewAny(User $user): bool
    {
        // Anyone can view the list of published posts (public blog)
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, BlogPost $blogPost): bool
    {
        // Anyone can view published posts
        if ($blogPost->status === 'published') {
            return true;
        }

        // Authors can view their own posts (including drafts)
        if ($user && $user->id === $blogPost->user_id) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        // Only authenticated users can create posts
        return $user !== null;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, BlogPost $blogPost): bool
    {
        // Only the author can update their post
        return $user && $user->id === $blogPost->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, BlogPost $blogPost): bool
    {
        // Only the author can delete their post
        return $user && $user->id === $blogPost->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, BlogPost $blogPost): bool
    {
        // Only the author can restore
        return $user && $user->id === $blogPost->user_id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, BlogPost $blogPost): bool
    {
        // Only the author can force delete
        return $user && $user->id === $blogPost->user_id;
    }

    /**
     * Custom ability: Check if user owns the post (for middleware).
     */
    public function ownPost(User $user, BlogPost $blogPost): bool
    {
        return $user && $user->id === $blogPost->user_id;
    }
}
