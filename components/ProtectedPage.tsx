import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import { useAuth } from '../contexts/AuthContext';
interface ProtectedProps {
    children: JSX.Element | JSX.Element[];
    username: string;
    redirectTo: string;
}

export function ProtectedPage({ children, username, redirectTo }: ProtectedProps) {
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
        } else {
            router.push(redirectTo);
        }
    }, [currentUser, router, redirectTo, username]);

    return (
        <>
            {loading ? (
                <LoadingOverlay active={loading} spinner text="Loading...">
                    <div className="min-h-screen"></div>
                </LoadingOverlay>
            ) : (
                children
            )}
        </>
    );
}

export default ProtectedPage;
