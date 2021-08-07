import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

const ProtectedPage = ({ username, redirectTo, children }: any) => {
    const router = useRouter();
    const { currentUser } = useAuth();
    const loading = true;

    return (
        <div>
            {currentUser?.name !== username
                ? router.push(redirectTo)
                : loading
                ? 'Loading....'
                : children}
        </div>
    );
};

export default ProtectedPage;
