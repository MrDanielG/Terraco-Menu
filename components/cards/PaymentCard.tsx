import { useRouter } from 'next/router';
import React from 'react';
import { Ticket } from '../../graphql/graphql';
import { intlFormat } from '../../lib/utils';

interface Props {
    ticket: Ticket;
}

const PaymentCard = ({ ticket }: Props) => {
    const router = useRouter();
    const { locale } = router;

    const confirmPayment = () => {
        console.log('Confirmar Ticket');
    };
    const printTicket = () => {
        console.log('Imprimir Ticket');
    };

    return (
        <div className="bg-white p-8 rounded-3xl flex flex-col justify-between">
            <div>
                <div className="flex justify-between">
                    <p className="text-brown font-semibold">{ticket.tableName}</p>
                    <p className="text-sm text-gray-500">{ticket.timestamp}</p>
                </div>
                <p className="text-sm text-gray-500">Pago Efectivo</p>
                <p className="text-brown-light font-semibold">
                    $ {intlFormat(ticket.total, locale!)}
                </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-2">
                <button onClick={printTicket} className="text-sm w-full text-gray-500 ">
                    Imprimir Ticket
                </button>
                <button
                    onClick={confirmPayment}
                    className="text-sm w-full text-mygreen border-2 border-mygreen border-solid py-3 px-6 rounded-xl disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Confirmar Pago
                </button>
            </div>
        </div>
    );
};

export default PaymentCard;
