import { gql } from '@apollo/client';

export const GET_USER_BY_EMAIL = gql`
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
            isActive
            url_img
            title
            description
            dishes {
                _id
                name
                description
                url_img
                price
                score
                categories
                preparation_time
            }
        }
    }
`;
export const GET_DISHES = gql`
    query GetDishes {
        dishes {
            _id
            name
            description
            url_img
            price
            score
            categories
            preparation_time
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

export const GET_DISH_BY_ID = gql`
    query getDishById($dishByIdId: String!) {
        dishById(id: $dishByIdId) {
            _id
            name
            description
            url_img
            price
            score
            categories
            preparation_time
        }
    }
`;

export const GET_MENU_BY_ID = gql`
    query getMenyById($menuByIdId: String!) {
        menuById(id: $menuByIdId) {
            _id
            title
            description
            url_img
            isActive
            dishes {
                _id
                name
                url_img
                price
            }
        }
    }
`;

export const GET_ORDERS = gql`
    query GetOrders {
        orders {
            _id
            orderNumber
            table {
                name
                tableNumber
            }
            items {
                _id
                dish {
                    name
                }
                quantity
                status
            }
            start_time
            end_time
        }
    }
`;
