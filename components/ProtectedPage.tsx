import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';
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
                <div className="p-12 min-h-screen w-full flex justify-center items-center">
                    <ContentLoader
                        speed={2}
                        viewBox="0 0 200 800"
                        backgroundColor="#f1f1f1"
                        foregroundColor="#ebebeb"
                    >
                        <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
                        <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
                        <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
                        <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
                        <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
                        <circle cx="20" cy="20" r="20" />
                    </ContentLoader>
                </div>
            ) : (
                children
            )}
        </>
    );
}

export default ProtectedPage;
