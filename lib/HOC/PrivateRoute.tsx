import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';

const PrivateRoute = (WrappedComponent: any) => {
    return (props: any) => {
        // checks whether we are on client / browser or server.
        // If we are on server, return null
        if (typeof window === 'undefined') return null;

        const router = useRouter();
        const { currentUser } = useAuth();

        // If there is no access token we redirect to "/" page.
        if (currentUser === null) router.replace('/');

        // If this is an accessToken we just render the component that was passed with all its props
        return <WrappedComponent {...props} />;
    };
};

export default PrivateRoute;
