import { gql } from '@apollo/client';

export const ORDER_CHANGES = gql`
    subscription OrderChanges {
        orderChanges {
            _id
            orderNumber
            table {
                name
                tableNumber
                _id
            }
            end_time
            start_time
            items {
                dish {
                    name
                }
                _id
                quantity
                status
            }
        }
    }
`;

export const TICKET_CHANGES = gql`
    subscription TicketChanges {
        ticketChanges {
            _id
            orderId
            ticketNumber
            timestamp
            tableName
            tableNumber
            total
            paymentMethod {
                method
                paymentAmount
            }
            vat
            status
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
