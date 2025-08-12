'use client';

import {Button} from '@/components/ui/button';
import {LogOut, ShieldCheck} from 'lucide-react';
import {signinWithGoogle} from '@/actions/signin-with-google';
import {signOut, useSession} from 'next-auth/react';

export default function Auth() {
    const {data} = useSession();
    const isAuthenticated = data?.user !== undefined && data?.user !== null;

    return (
        <div className="h-full flex flex-col gap-4 items-center justify-center">
            <div className="flex flex-col gap-4 items-center">
                <p
                    className="text-sm text-neutral-300"
                    hidden={!isAuthenticated}
                >
                    Authorized as {data?.user?.email}
                </p>

                <Button
                    type="submit"
                    disabled={isAuthenticated}
                    className="w-50 cursor-pointer"
                    onClick={() => signinWithGoogle()}
                >
                    Signin with Google <ShieldCheck />
                </Button>
                <Button
                    type="submit"
                    disabled={!isAuthenticated}
                    className="w-50 cursor-pointer"
                    onClick={() => signOut({redirectTo: '/auth'})}
                >
                    Signout <LogOut />
                </Button>
            </div>
        </div>
    );
}
