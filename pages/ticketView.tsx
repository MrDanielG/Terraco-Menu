import { MXN } from '@dinero.js/currencies';
import { dinero, multiply, subtract } from 'dinero.js';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BackButton from '../components/buttons/BackButton';
import BigButton from '../components/buttons/BigButton';
import {
    Dish,
    Order,
    Ticket,
    useGenerateTicketMutation,
    useGetOrderByIdQuery,
} from '../graphql/graphql';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { intlFormat } from '../lib/utils';

interface Props {}
const TicketView = (props: Props) => {
    const router = useRouter();
    const { tableId } = router.query;
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [_currentOrder, setCurrentOrder] = useLocalStorage<CurrentOrder<Dish>>('currentOrder', {
        tableId: '',
        items: [],
    });
    const [order, setOrder] = useLocalStorage<Order | null>('myOrder', null);

    const orderRes = useGetOrderByIdQuery({
        variables: { orderByIdId: order?._id || '' },
    });

    const [GenerateTicket] = useGenerateTicketMutation();

    const generateTicket = async () => {
        if (!order) {
            router.push(`/?tableId=${tableId}`);
        }
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
        if (ticket && window) {
            window.onafterprint = function (event) {
                console.log(event);
            };
            window.print();
            setOrder(null);
            setCurrentOrder({ items: [], tableId: '' });
            router.push('/');
        }
    };
    useEffect(() => {
        if (!ticket) {
            generateTicket();
        }
    }, [ticket]);

    let baseImp = dinero({ amount: 0, currency: MXN });
    let vatAmount = dinero({ amount: 0, currency: MXN });
    if (ticket) {
        vatAmount = multiply(dinero(ticket.total), { amount: ticket.vat, scale: 2 });
        baseImp = subtract(dinero(ticket.total), vatAmount);
    }
    return (
        <div className="bg-gray-200 p-8 min-h-screen">
            <BackButton text="Mi orden" pathNameOnBack="/newOrder" />
            {ticket && (
                <div>
                    <h1 className="text-center text-brown font-semibold text-lg mb-1">
                        Restarurante Terraco
                    </h1>
                    <div className="text-sm text-center mb-6 text-gray-700">
                        <p>Tel. 525 9263 939</p>
                        <p>Calle X No. XX Colonia XX C.P. 67252</p>
                    </div>

                    <div className="flex flex-row space-x-10 mb-6 text-sm text-gray-700">
                        <ul>
                            <li>Ticket No. {ticket.ticketNumber}</li>
                            <li>Fecha: {new Date(ticket.timestamp).toLocaleDateString('es-MX')}</li>
                        </ul>
                        <ul>
                            <li>Hora: {new Date(ticket.timestamp).toLocaleTimeString('es-MX')}</li>
                            <li>{ticket.tableName}</li>
                        </ul>
                    </div>

                    <table className="mb-6">
                        <thead>
                            <tr className="text-brown">
                                <th className="font-semibold">Cant.</th>
                                <th className="font-semibold">Desc.</th>
                                <th className="font-semibold">Precio</th>
                                <th className="font-semibold">Importe</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ticket.items.map((item, idx) => (
                                <tr key={idx} className="text-sm text-center text-gray-700">
                                    <td className="text-brown font-semibold">{item.quantity}</td>
                                    <td className="text-left">{item.dishName}</td>
                                    <td>{intlFormat(item.dishPrice, 'es-MX')}</td>
                                    <td>{intlFormat(item.amount, 'es-MX')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex flex-row-reverse">
                        <table className="mb-6 mr-2">
                            <tbody className="font-semibold text-brown">
                                <tr>
                                    <td>Base Imp. </td>
                                    <td>{intlFormat(baseImp.toJSON(), 'es-MX')}</td>
                                </tr>
                                <tr>
                                    <td>IVA {ticket.vat}%</td>
                                    <td>{intlFormat(vatAmount.toJSON(), 'es-MX')}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="text-brown text-xl font-semibold flex justify-between mx-2">
                        <span className="text-brown font-semibold">Total: </span>
                        <span>{intlFormat(ticket.total, 'es-MX')}</span>
                    </div>

                    <p className="text-center text-gray-600 text-xs pt-8">IVA Incluido</p>
                    <p className="text-center text-gray-700 text-xs">Gracias por su prefencia</p>
                    <BigButton text="Imprimir" onClick={() => handlePrint()} />
                </div>
            )}
        </div>
    );
};

export default TicketView;
