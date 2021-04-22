import useSWR from "swr";
import { frontendApiService } from "../services/api";
import { User } from '../interfaces/auth';
import Router from 'next/router';
import { message } from "antd";
import { useEffect } from "react";

type UseUserHook = {
    user?: User,
    error?: Error,
    mutateUser?: (data: unknown) => Promise<unknown>,
    isValidating?: boolean,
}

export default function useUser (redirectUrl?: string): UseUserHook {
    const { 
        data: user,
        error,
        mutate,
        isValidating,
    } = useSWR(
        'api/auth/user', 
        url => frontendApiService.get(url),
        { revalidateOnFocus: false  },
    );

    useEffect(() => {
        if (!user && redirectUrl && !isValidating) {
            message.error('User not authorized');
            if (redirectUrl) Router.replace(redirectUrl);
        }
    }, [user, isValidating]);

    return {
        user: user as User,
        error,
        mutateUser: mutate,
        isValidating,
    };
}