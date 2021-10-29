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
    query getMenuById($menuByIdId: String!) {
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

export const GET_ORDER_BY_ID = gql`
    query getOrderById($orderByIdId: String!) {
        orderById(id: $orderByIdId) {
            _id
            orderNumber
            table {
                _id
                tableNumber
                name
                token
                enabled
            }
            items {
                _id
                dish {
                    description
                    name
                    price
                    _id
                }
                quantity
                status
            }
            start_time
        }
    }
`;

export const GET_DISH_SALES = gql`
    query getDishSales($dishSalesTimezone: String!, $dishSalesYear: Float!) {
        dishSales(timezone: $dishSalesTimezone, year: $dishSalesYear) {
            month
            year
            dishName
            totalUnits
            totalSales
        }
    }
`;

export const GET_YEAR_SALES = gql`
    query getYearSales($yearSalesTimezone: String!, $yearSalesYear: Float!) {
        yearSales(timezone: $yearSalesTimezone, year: $yearSalesYear) {
            month
            year
            total
        }
    }
`;

export const GET_MONTH_SALES = gql`
    query getMonthSales(
        $monthSalesTimezone: String!
        $monthSalesMonth: Float!
        $monthSalesYear: Float!
    ) {
        monthSales(timezone: $monthSalesTimezone, month: $monthSalesMonth, year: $monthSalesYear) {
            year
            month
            dayOfMonth
            dayOfWeek
            total
        }
    }
`;

export const GET_DAILY_SALES = gql`
    query getDailySales(
        $daySalesTimezone: String!
        $daySalesDay: Float!
        $daySalesMonth: Float!
        $daySalesYear: Float!
    ) {
        daySales(
            timezone: $daySalesTimezone
            day: $daySalesDay
            month: $daySalesMonth
            year: $daySalesYear
        ) {
            year
            tableNumber
            tableName
            totalSum
            salesCount
            sales {
                total
                timestamp
            }
        }
    }
`;

export const GET_TICKETS = gql`
    query getTickets {
        tickets {
            _id
            timestamp
            status
            paymentMethod
            tableName
            tableNumber
            total
            items {
                quantity
                dishName
                dishPrice
                amount
                _id
            }
        }
    }
`;

export const GET_TICKET_BY_ID = gql`
    query getTicketById($ticketByIdId: String!) {
        ticketById(id: $ticketByIdId) {
            _id
            status
            orderId
            ticketNumber
            timestamp
            tableName
            tableNumber
            total
            paymentMethod
            vat
        }
    }
`;
