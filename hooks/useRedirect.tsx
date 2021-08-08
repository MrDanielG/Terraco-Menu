import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function useRedirect() {
    const router = useRouter();
    const { currentUser } = useAuth();
    const currentRoute = router.pathname;
    let redirectPath = () => {};

    useEffect(() => {
        if (currentRoute === '/chef' && currentUser?.name !== 'Chef') {
            router.push('/');
        }
    }, [currentRoute]);

    return { redirectPath };
}
