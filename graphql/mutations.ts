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
    mutation AddDishToMenu($addDishToMenuIdDish: String!, $addDishToMenuIdMenu: String!) {
        addDishToMenu(idDish: $addDishToMenuIdDish, idMenu: $addDishToMenuIdMenu) {
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

export const UPDATE_TABLE = gql`
    mutation UpdateTable($updateTableData: TableInputData!, $updateTableId: String!) {
        updateTable(data: $updateTableData, id: $updateTableId) {
            _id
            tableNumber
            name
            token
            enabled
        }
    }
`;

export const CREATE_ORDER = gql`
    mutation CreateOrder($createOrderItemsIds: [String!]!, $createOrderTableId: String!) {
        createOrder(itemsIds: $createOrderItemsIds, tableId: $createOrderTableId) {
            _id
            orderNumber
            table {
                _id
                name
                tableNumber
            }
            items {
                _id
                status
                quantity
                dish {
                    name
                    _id
                    price
                }
            }
        }
    }
`;

export const CREATE_ORDERITEMS = gql`
    mutation CreateOrderItems($createOrderItemsItems: [CreateOrderItemsInput!]!) {
        createOrderItems(items: $createOrderItemsItems) {
            _id
            quantity
            status
            dish {
                name
                _id
                price
            }
        }
    }
`;

export const ADD_ITEMS_TO_ORDER = gql`
    mutation AddItemsToOrder(
        $addItemsToOrderOrderId: String!
        $addItemsToOrderItemsIds: [String!]!
    ) {
        addItemsToOrder(orderId: $addItemsToOrderOrderId, itemsIds: $addItemsToOrderItemsIds) {
            _id
            orderNumber
            table {
                _id
                name
                tableNumber
            }
            items {
                _id
                status
                quantity
                dish {
                    name
                    _id
                    price
                }
            }
        }
    }
`;

export const CHANGE_ORDER_ITEM_STATUS = gql`
    mutation ChangeOrderItemsStatus(
        $changeOrderItemsStatusStatus: Status!
        $changeOrderItemsStatusOrderId: String!
    ) {
        changeOrderItemsStatus(
            status: $changeOrderItemsStatusStatus
            orderId: $changeOrderItemsStatusOrderId
        ) {
            _id
            items {
                status
                quantity
                _id
                dish {
                    name
                }
            }
        }
    }
`;
