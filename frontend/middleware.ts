import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/"]);

export default clerkMiddleware((auth, request: NextRequest) => {
    if (!auth().userId && isPublicRoute(request)) {
        return auth().redirectToSignIn();
    }

    // Handle public routes without requiring authentication
    if (isPublicRoute(request)) {
        return NextResponse.next();
    }

    const { userId } = auth();

    console.log(userId)
    if (userId) {
        return NextResponse.next();
    }

    return auth().redirectToSignIn();
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
        // Exclude the sign-up route
        "/((?!sign-up).*)",
    ],
};
