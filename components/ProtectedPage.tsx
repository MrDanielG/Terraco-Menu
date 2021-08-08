import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedProps {
    children: JSX.Element;
    username: string;
    redirectTo: string;
}

export function ProtectedPage({
    children,
    username,
    redirectTo,
}: ProtectedProps) {
    const { currentUser } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (currentUser !== null) {
            if (currentUser.name !== username) {
                router.push(redirectTo);
            } else {
                setLoading(false);
            }
        }
    }, [currentUser, router]);

    return <>{loading ? <h1>Cargando...</h1> : children}</>;
}

export default ProtectedPage;
