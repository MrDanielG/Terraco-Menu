import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
    Dish,
    Order,
    Ticket,
    useGenerateTicketMutation,
    useGetOrderByIdQuery,
} from '../graphql/graphql';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { intlFormat } from '../lib/utils';
import { dinero, multiply, subtract } from 'dinero.js';
import { MXN } from '@dinero.js/currencies';
import BigButton from '../components/buttons/BigButton';

interface Props {}
const TicketView = (props: Props) => {
    const router = useRouter();
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [currentOrder, setCurrentOrder] = useLocalStorage<CurrentOrder<Dish>>('currentOrder', {
        tableId: '',
        items: [],
    });
    const [order, setOrder] = useLocalStorage<Order | null>('myOrder', null);
    const orderRes = useGetOrderByIdQuery({
        variables: { orderByIdId: order?._id || '' },
    });

    const [GenerateTicket] = useGenerateTicketMutation();

    const generateTicket = async () => {
        try {
            const ticket = await GenerateTicket({
                variables: {
                    orderId: orderRes.data?.orderById._id || order?._id || '',
                    paymentMethod: 'Efectivo',
                    vat: 16,
                },
            });
            setTicket(ticket.data?.generateTicket as Ticket | null);
        } catch (err) {
            console.error(err);
        }
    };
    const handlePrint = () => {
        if(ticket && window){
            /* window.onafterprint = function(_event){
             *     console.log("printed");
             * }; */
            window.print();

            console.log("Printed 2");
            setOrder(null);
            setCurrentOrder({items: [], tableId: ""});
            router.push('/');
            
        }
    };
    useEffect(() => {
        if (!ticket) {
            generateTicket();
        }
    }, []);
    let baseImp = dinero({ amount: 0, currency: MXN });
    let vatAmount = dinero({ amount: 0, currency: MXN });
    if (ticket) {
        vatAmount = multiply(dinero(ticket.total), 0.01 * ticket.vat);
        baseImp = subtract(dinero(ticket.total), vatAmount);
    }
    return (
        <div>
            {ticket && (
                <div>
                    <h1>Restarurante Terraco</h1>
                    <div>
                        <p>Tel. 525 9263 939</p>
                        <p>Calle X No. XX Colonia XX C.P. 67252</p>
                    </div>
                    <div className="flex flex-row space-x-10">
                        <ul>
                            <li>Ticket No. {ticket.ticketNumber}</li>
                            <li>Fecha: {new Date(ticket.timestamp).toLocaleDateString('es-MX')}</li>
                        </ul>
                        <ul>
                            <li>Hora: {new Date(ticket.timestamp).toLocaleTimeString('es-MX')}</li>
                            <li>{ticket.tableName}</li>
                        </ul>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Cant.</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Importe</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ticket.items.map((item) => (
                                <tr>
                                    <td>{item.quantity}</td>
                                    <td>{item.dishName}</td>
                                    <td>{intlFormat(item.dishPrice, 'es-MX')}</td>
                                    <td>{intlFormat(item.amount, 'es-MX')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <hr />
                    <div>
                        <ul>
                            <li>Base Imp.</li>
                            <li>IVA {ticket.vat}%</li>
                        </ul>
                        <ul>
                            <li>{intlFormat(vatAmount.toJSON(), 'es-MX')}</li>
                            <li>{intlFormat(baseImp.toJSON(), 'es-MX')}</li>
                        </ul>
                    </div>
                    <hr />
                    <div>
                        <span>Total:</span>
                        <span>{intlFormat(ticket.total, 'es-MX')}</span>
                    </div>
                    <p>IVA Incluido</p>
                    <p>Gracias por si prefencia</p>
                    <BigButton text="Imprimir" onClick={() => handlePrint() } />
        </div>

            )}
        </div>
    );
};

export default TicketView;
