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
