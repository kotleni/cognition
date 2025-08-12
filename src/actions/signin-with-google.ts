'use server';

import {signIn} from '@/auth';

export const signinWithGoogle = async (redirect: string = '/') => {
    await signIn('google', {redirectTo: redirect});
};
