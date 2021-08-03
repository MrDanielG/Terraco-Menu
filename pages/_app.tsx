import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { useApollo } from '../lib/ApolloClient';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
    const apolloClient = useApollo(pageProps.initialApolloState);

    return (
        <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
        </ApolloProvider>
    );
}
export default MyApp;
