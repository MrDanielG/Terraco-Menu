import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation Login($loginPassword: String!, $loginEmail: String!) {
        login(password: $loginPassword, email: $loginEmail) {
            accessToken
        }
    }
`;

export const ADD_MENU = gql`
    mutation AddMenuMutation($addMenuData: MenuDataInput!) {
        addMenu(data: $addMenuData) {
            _id
            title
            description
            url_img
            isActive
        }
    }
`;
