// Main example from: https://github.com/vercel/next.js/blob/canary/examples/with-typescript-graphql/lib/apollo.ts
import {
    ApolloClient,
    ApolloLink,
    InMemoryCache,
    NormalizedCacheObject,
    split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
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
    const wsUri = process.env.NEXT_PUBLIC_SUBSCRIPTION_URI || '';
    const tokenName = process.env.NEXT_PUBLIC_AUTH_KEY || 'Authorization';
    const httpLink = createUploadLink({ uri });

    if (typeof window === 'undefined') return;
    const wsLink = new WebSocketLink({
        uri: wsUri,
        options: {
            reconnect: true,
        },
    });

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

    // The split function takes three parameters:
    //
    // * A function that's called for each operation to execute
    // * The Link to use for an operation if the function returns a "truthy" value
    // * The Link to use for an operation if the function returns a "falsy" value
    const splitLink = split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
            );
        },
        wsLink,
        authLink.concat(httpLink) // Chain it with the HttpLink
    );

    return splitLink;
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
