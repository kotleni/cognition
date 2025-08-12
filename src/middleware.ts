import {NextRequest, NextResponse} from 'next/server';
import {auth, auth as authMiddleware} from '@/auth';

// const requireAuthPages = ['/', '/voice'];

export async function middleware(request: NextRequest) {
    const session = await auth();
    const isAuthenticated = session?.user !== null;

    if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/auth', request.url));
    }

    // NextResponse.redirect(r + '/auth');
    return (authMiddleware as any)(request);
}

export const config = {
    matcher: ['/', '/voice'],
};
