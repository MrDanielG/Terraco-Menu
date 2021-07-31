// Main example from: https://github.com/vercel/next.js/blob/canary/examples/with-typescript-graphql/lib/apollo.ts
import {
    ApolloClient,
    ApolloLink,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { IncomingMessage, ServerResponse } from 'http';
import { useMemo } from 'react';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export type ResolverContext = {
    req?: IncomingMessage;
    res?: ServerResponse;
};

function createIsomorphLink(context: ResolverContext = {}) {
    const uri = process.env.NEXT_PUBLIC_SERVER_URI || '';
    const tokenName = process.env.NEXT_PUBLIC_AUTH_KEY || 'Authorization';
    const httpLink = createUploadLink({ uri });

    const authLink = new ApolloLink((operation, forward) => {
        let token: string | null = '';
        if (typeof window !== 'undefined') {
            token = localStorage.getItem(tokenName);
        }

        // Use the setContext method to set the HTTP headers.
        operation.setContext({
            headers: { Authorization: token },
        });

        // Call the next link in the middleware chain.
        return forward(operation);
    });
    return authLink.concat(httpLink); // Chain it with the HttpLink
}

function createApolloClient(context?: ResolverContext) {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: createIsomorphLink(context),
        cache: new InMemoryCache(),
    });
}

export function initializeApollo(
    initialState: any = null,
    // Pages with Next.js data fetching methods, like `getStaticProps`, can send
    // a custom context which will be used by `SchemaLink` to server render pages
    context?: ResolverContext
) {
    const _apolloClient = apolloClient ?? createApolloClient(context);

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // get hydrated here
    if (initialState) {
        _apolloClient.cache.restore(initialState);
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === 'undefined') return _apolloClient;
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

export function useApollo(initialState: any) {
    const store = useMemo(() => initializeApollo(initialState), [initialState]);
    return store;
}
