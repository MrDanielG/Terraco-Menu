import { useRouter } from 'next/router';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
    PayMethod,
    Ticket,
    TicketStatus,
    useSetTicketStatusMutation,
    useSetPaymentMethodMutation,
} from '../../graphql/graphql';
import { getDayMonthTime, intlFormat, paymentMethodsToString } from '../../lib/utils';
import TwoActionsModal from '../modals/TwoActionsModal';
import Modal from '../modals/Modal';
import SelectPaymentMethod from '../SelectPaymentMethod';
import TicketView from '../ticket/TicketView';
import PDFTicketLink from '../ticket/PDFTicketLink';
import { dinero } from 'dinero.js';

// const BlobProvider = dynamic<ReactPDF.BlobProviderProps>(
//     () => import('@react-pdf/renderer').then((mod) => mod.BlobProvider),
//     { ssr: false }
// );

interface Props {
    ticket: Ticket;
}

const PaymentCard = ({ ticket }: Props) => {
    const router = useRouter();
    const { locale } = router;
    const [openPaymentModal, setOpenPaymentModal] = useState(false);
    const [openPrintModal, setOpenPrintModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(ticket.paymentMethod);

    const [setTicketStatusMutation, { loading }] = useSetTicketStatusMutation({
        variables: {
            setTicketStatusStatus: TicketStatus.Paid,
            setTicketStatusTikcetId: ticket._id,
        },
    });
    const [setPaymentMethodMutation] = useSetPaymentMethodMutation({
        variables: {
            ticketId: ticket._id,
            paymentMethod: paymentMethod,
        },
    });
    const acceptPaymentMethod = async () => {
        try {
            await setPaymentMethodMutation({
                variables: {
                    ticketId: ticket._id,
                    paymentMethod: paymentMethod,
                },
            });
        } catch (err) {
            console.error(err);
        }
    };
    const confirmPayment = async () => {
        try {
            await setTicketStatusMutation();
            toast.success('Pago Confirmado');
        } catch (error) {
            toast.error('Error al Confirmar Pago');
            console.error(error);
        }
    };
    const getDineroPaymentMethodMaybe = (method: PayMethod) => {
        let payment = paymentMethod.find((p) => p.method === method);
        if (!!payment) {
            return dinero(payment.paymentAmount);
        }
        return undefined;
    };
    return (
        <div className="flex flex-col justify-between px-8 pt-4 pb-8 transition-shadow duration-300 ease-in-out bg-white sm:w-72 rounded-3xl hover:shadow-xl">
            <TicketView ticket={ticket} />
            <div className="flex items-center justify-between mb-2 sm:flex-col sm:items-start">
                <p className="font-semibold text-brown">{ticket.tableName}</p>
                <p className="text-sm text-gray-500 ">
                    {getDayMonthTime(ticket.timestamp, locale!)}
                </p>
            </div>
            <p className="text-sm text-gray-500">
                Pago {paymentMethodsToString(ticket.paymentMethod)}
            </p>
            <p className="font-semibold text-brown-light">{intlFormat(ticket.total, locale!)}</p>

            <div className="flex flex-col items-center justify-between gap-4 sm:flex-col sm:gap-2 mt-2">
                <button
                    onClick={() => setOpenPrintModal(true)}
                    disabled={loading}
                    className="w-full px-6 py-0 text-sm border-2 border-solid text-gray-500 border-none rounded-xl disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Imprimir ticket
                </button>
                <button
                    onClick={() => setOpenPaymentModal(true)}
                    disabled={loading}
                    className="w-full px-6 py-0 text-sm border-2 border-solid text-gray-500 border-none rounded-xl disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Cambiar Forma de Pago
                </button>
                <button
                    onClick={confirmPayment}
                    disabled={loading}
                    className="w-full px-6 py-3 text-sm border-2 border-solid text-mygreen border-mygreen rounded-xl disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Confirmar Pago
                </button>
                <TwoActionsModal
                    title="¿Cómo quieres dividr el pago?"
                    show={openPaymentModal}
                    acceptLabel="Aceptar"
                    onClose={() => setOpenPaymentModal(false)}
                    onAccept={() => {
                        acceptPaymentMethod();
                        setOpenPaymentModal(false);
                    }}
                    onCancel={() => setOpenPaymentModal(false)}
                >
                    <SelectPaymentMethod
                        total={dinero(ticket.total)}
                        efectivo={getDineroPaymentMethodMaybe(PayMethod.Cash)}
                        tarjeta={getDineroPaymentMethodMaybe(PayMethod.Tc)}
                        onChange={(efectivo, tarjeta) =>
                            setPaymentMethod([
                                { method: PayMethod.Cash, paymentAmount: efectivo.toJSON() },
                                { method: PayMethod.Tc, paymentAmount: tarjeta.toJSON() },
                            ])
                        }
                    />
                </TwoActionsModal>
                <Modal
                    title=""
                    closeBtnTitle="Cerrar"
                    isOpen={openPrintModal}
                    closeModal={() => setOpenPrintModal(false)}
                    onCloseModal={() => setOpenPrintModal(false)}
                >
                    <p className="text-gray-700 text-center">Se está generando el documento PDF</p>
                    <PDFTicketLink ticket={ticket} />
                </Modal>
            </div>
        </div>
    );
};

export default PaymentCard;
