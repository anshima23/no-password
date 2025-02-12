import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/forum(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // ✅ Properly excludes Next.js internals & static assets
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
    // ✅ Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
