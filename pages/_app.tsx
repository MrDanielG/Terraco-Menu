import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import AuthProvider from '../contexts/AuthContext';
import { useApollo } from '../lib/ApolloClient';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
    const apolloClient = useApollo(pageProps.initialApolloState);

    return (
        <ApolloProvider client={apolloClient}>
            <AuthProvider>
                <Toaster />
                <Component {...pageProps} />
            </AuthProvider>
        </ApolloProvider>
    );
}
export default MyApp;
