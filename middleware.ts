import { clerkMiddleware } from '@clerk/nextjs/server';

// export default clerkMiddleware();
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed
export default clerkMiddleware();


export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",  // all routes except static
    "/", 
    "/(api|trpc)(.*)",
  ],
  publicRoutes: [
    "/",
    "/sign-in",
    "/sign-up",
    "/product/(.*)",
    "/api/products",
    "/api/products/(.*)",
    "/404",
  ],
};
