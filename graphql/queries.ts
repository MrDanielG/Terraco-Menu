import { gql } from '@apollo/client';

const GET_USER_BY_EMAIL = gql`
    query getUserByEmail($userByEmailEmail: String!) {
        userByEmail(email: $userByEmailEmail) {
            _id
            email
            name
            roles {
                name
                _id
            }
        }
    }
`;
