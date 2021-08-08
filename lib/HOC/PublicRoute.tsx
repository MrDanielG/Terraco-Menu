import Router from 'next/router';

const PublicRoute = (WrappedComponent: any) => {
    return (props: any) => {
        // checks whether we are on client / browser or server.
        if (typeof window !== 'undefined') {
            const tokenName =
                process.env.NEXT_PUBLIC_AUTH_KEY || 'Authorization';

            const accessToken = localStorage.getItem(tokenName);

            // If there's an access token we redirect to "/dashboard" page.
            if (accessToken) {
                Router.replace('/dashboard');
                return null;
            }

            // If this is an accessToken we just render the component that was passed with all its props
            return <WrappedComponent {...props} />;
        }

        // If we are on server, return null
        return null;
    };
};

export default PublicRoute;
