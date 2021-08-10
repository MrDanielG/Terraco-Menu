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

export const GET_MENUS = gql`
    query GetMenus {
        menus {
            _id
            title
            isActive
            description
            url_img
        }
    }
`;

export const GET_TABLES = gql`
    query getTables {
        tables {
            _id
            tableNumber
            name
            enabled
            token
        }
    }
`;

export const GET_TABLE_BY_ID = gql`
    query getTableById($tableByIdId: String!) {
        tableById(id: $tableByIdId) {
            _id
            tableNumber
            name
            token
            enabled
        }
    }
`;
