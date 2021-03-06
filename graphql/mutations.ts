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
            categories {
                name
                url_img
            }
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
                url_img
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
                    url_img
                }
            }
        }
    }
`;

export const CREATE_ORDER_WITH_STATUS = gql`
    mutation CreateOrderWithStatus(
        $createOrderItemsIds: [String!]!
        $createOrderTableId: String!
        $itemsStatus: Status
    ) {
        createOrder(
            itemsIds: $createOrderItemsIds
            tableId: $createOrderTableId
            itemsStatus: $itemsStatus
        ) {
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
                    url_img
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
                url_img
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
                    url_img
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

export const GENERATE_TICKET = gql`
    mutation GenerateTicket($orderId: String!) {
        generateTicket(orderId: $orderId) {
            _id
            orderId
            ticketNumber
            timestamp
            tableName
            total
            paymentMethod {
                method
                paymentAmount
            }
            vat
            items {
                _id
                quantity
                dishName
                dishPrice
                amount
            }
        }
    }
`;

export const SET_TICKET_STATUS = gql`
    mutation SetTicketStatus(
        $setTicketStatusStatus: TicketStatus!
        $setTicketStatusTikcetId: String!
    ) {
        setTicketStatus(status: $setTicketStatusStatus, tikcetId: $setTicketStatusTikcetId) {
            _id
            status
        }
    }
`;
export const SET_PAYMENT_METHOD = gql`
    mutation SetPaymentMethod($paymentMethod: [PaymentMethodDataInput!]!, $ticketId: String!) {
        setPaymentMethod(paymentMethod: $paymentMethod, ticketId: $ticketId) {
            _id
            paymentMethod {
                paymentAmount
                method
            }
        }
    }
`;
export const REMOVE_DISH_FROM_MENU = gql`
    mutation RemoveDishFromMenu(
        $removeDishFromMenuIdDish: String!
        $removeDishFromMenuIdMenu: String!
    ) {
        removeDishFromMenu(idDish: $removeDishFromMenuIdDish, idMenu: $removeDishFromMenuIdMenu) {
            title
            dishes {
                name
                _id
            }
            _id
        }
    }
`;

export const DELETE_DISH_BY_ID = gql`
    mutation DelDishById($delDishByIdId: String!) {
        delDishById(id: $delDishByIdId)
    }
`;

export const ADD_CATEGORY = gql`
    mutation AddCategory($urlImg: String!, $name: String!) {
        addCategory(url_img: $urlImg, name: $name) {
            _id
            name
            url_img
        }
    }
`;

export const DELETE_CATEGORY_BY_ID = gql`
    mutation DelCategoryById($categoryId: String!) {
        delCategoryById(categoryId: $categoryId)
    }
`;

export const UPDATE_CATEGORY = gql`
    mutation UpdateCategory($urlImg: String!, $name: String!, $categoryId: String!) {
        updateCategory(url_img: $urlImg, name: $name, categoryId: $categoryId) {
            _id
            name
            url_img
        }
    }
`;
