import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation Login($loginPassword: String!, $loginEmail: String!) {
        login(password: $loginPassword, email: $loginEmail) {
            accessToken
        }
    }
`;
