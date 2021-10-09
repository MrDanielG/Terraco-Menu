import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import { Ticket, TicketStatus, useSetTicketStatusMutation } from '../../graphql/graphql';
import { getDayMonthTime, intlFormat } from '../../lib/utils';

interface Props {
    ticket: Ticket;
}

const PaymentCard = ({ ticket }: Props) => {
    const router = useRouter();
    const { locale } = router;

    const [setTicketStatusMutation, { loading }] = useSetTicketStatusMutation({
        variables: {
            setTicketStatusStatus: TicketStatus.Paid,
            setTicketStatusTikcetId: ticket._id,
        },
    });

    const confirmPayment = async () => {
        try {
            await setTicketStatusMutation();
            toast.success('Pago Confirmado');
        } catch (error) {
            toast.error('Error al Confirmar Pago');
            console.error(error);
        }
    };
    const printTicket = () => {
        console.log('Imprimir Ticket');
    };

    return (
        <div className="bg-white p-8 rounded-3xl flex flex-col justify-between">
            <div>
                <div className="flex justify-between">
                    <p className="text-brown font-semibold">{ticket.tableName}</p>
                    <p className="text-sm text-gray-500">
                        {getDayMonthTime(ticket.timestamp, locale!)}
                    </p>
                </div>
                <p className="text-sm text-gray-500">Pago {ticket.paymentMethod}</p>
                <p className="text-brown-light font-semibold">
                    {intlFormat(ticket.total, locale!)}
                </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-2">
                <button onClick={printTicket} className="text-sm w-full text-gray-500 ">
                    Imprimir Ticket
                </button>
                <button
                    onClick={confirmPayment}
                    disabled={loading}
                    className="text-sm w-full text-mygreen border-2 border-mygreen border-solid py-3 px-6 rounded-xl disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Confirmar Pago
                </button>
            </div>
        </div>
    );
};

export default PaymentCard;
