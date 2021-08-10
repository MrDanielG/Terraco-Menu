import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation Login($loginPassword: String!, $loginEmail: String!) {
        login(password: $loginPassword, email: $loginEmail) {
            accessToken
        }
    }
`;

export const ADD_MENU = gql`
    mutation AddMenu($addMenuData: MenuDataInput!) {
        addMenu(data: $addMenuData) {
            _id
            title
            description
            url_img
            isActive
        }
    }
`;

export const ADD_DISH = gql`
    mutation AddDish($addDishData: DishDataInput!) {
        addDish(data: $addDishData) {
            _id
            name
            description
            url_img
            price
            preparation_time
            categories
        }
    }
`;

export const ADD_DISH_TO_MENU = gql`
    mutation AddDishToMenu(
        $addDishToMenuIdDish: String!
        $addDishToMenuIdMenu: String!
    ) {
        addDishToMenu(
            idDish: $addDishToMenuIdDish
            idMenu: $addDishToMenuIdMenu
        ) {
            _id
            title
            dishes {
                _id
                name
                price
            }
        }
    }
`;

export const ADD_TABLE = gql`
    mutation GenerateTable($generateTableName: String!) {
        generateTable(name: $generateTableName) {
            _id
            tableNumber
            name
            token
            enabled
        }
    }
`;
