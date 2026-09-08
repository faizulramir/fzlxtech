<?php

namespace App\Http\Middleware;

use App\Models\Visit;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TrackVisits
{
    /**
     * Session key marking that this session was already counted today.
     */
    private const SESSION_KEY = 'visit_tracked_day';

    /**
     * Count one visit per session per day on public pages.
     *
     * Runs before the response renders so shared Inertia props
     * already include the current visit.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($this->shouldTrack($request)) {
            $this->track($request);
        }

        return $next($request);
    }

    private function shouldTrack(Request $request): bool
    {
        if (! $request->isMethod('get')) {
            return false;
        }

        $path = trim($request->path(), '/');

        $isPublic = $path === '' || $path === 'blog' || str_starts_with($path, 'blog/');
        if (! $isPublic) {
            return false;
        }

        // Admin CRUD lives under /blog/posts/* — never count it.
        if ($path === 'blog/posts' || str_starts_with($path, 'blog/posts/')) {
            return false;
        }

        // Skip bots and crawlers.
        $agent = (string) $request->userAgent();
        if ($agent !== '' && preg_match('/bot|crawl|slurp|spider|mediapartners|baidu|yandex|sogou|exabot|facebot|ia_archiver|ahrefs|semrush/i', $agent)) {
            return false;
        }

        // One count per session per day.
        try {
            if ($request->session()->get(self::SESSION_KEY) === today()->toDateString()) {
                return false;
            }
        } catch (\Throwable) {
            return false;
        }

        return true;
    }

    private function track(Request $request): void
    {
        try {
            Visit::create([
                'session_id' => substr((string) $request->session()->getId(), 0, 128) ?: null,
                'path' => substr('/' . ltrim($request->path(), '/'), 0, 2048),
                'ip_hash' => hash('sha256', (string) $request->ip()),
                'user_agent' => substr((string) $request->userAgent(), 0, 512) ?: null,
            ]);

            $request->session()->put(self::SESSION_KEY, today()->toDateString());
        } catch (\Throwable) {
            // Tracking must never break the page.
        }
    }
}
