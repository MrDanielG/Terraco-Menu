import { MXN } from '@dinero.js/currencies';
import ReactPDF, { Document, Image, Page, StyleSheet, View } from '@react-pdf/renderer';
import { dinero, multiply, subtract } from 'dinero.js';
import html2canvas from 'html2canvas';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Collapsible from 'react-collapsible';
import toast from 'react-hot-toast';
import { AiFillCaretDown } from 'react-icons/ai';
import { Ticket, TicketStatus, useSetTicketStatusMutation } from '../../graphql/graphql';
import { getDayMonthTime, intlFormat } from '../../lib/utils';

const BlobProvider = dynamic<ReactPDF.BlobProviderProps>(
    () => import('@react-pdf/renderer').then((mod) => mod.BlobProvider),
    { ssr: false }
);

interface Props {
    ticket: Ticket;
}

const PaymentCard = ({ ticket }: Props) => {
    const router = useRouter();
    const { locale } = router;

    const [ticketURL, setTicketURL] = useState(
        'https://res.cloudinary.com/brosimgstorage/image/upload/v1629850963/noimage_ycfq5j.png'
    );

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
    const printTicket = (url: string | null) => {
        console.log('Imprimir Ticket');
        handlePDFDownload(url);
    };

    useEffect(() => {
        updateTicketURL();
    }, []);
    console.log(ticket);
    const vatAmount = multiply(dinero(ticket.total), { amount: ticket.vat, scale: 2});
    const baseImp = subtract(dinero(ticket.total), vatAmount);
    /* let baseImp = dinero({ amount: 0, currency: MXN });
     * let vatAmount = dinero({ amount: 0, currency: MXN });
     * if (ticket) {
     *     vatAmount = multiply(dinero(ticket.total), { amount: ticket.vat, scale: 2 });
     *     baseImp = subtract(dinero(ticket.total), vatAmount);
     * } */

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
        },
        section: {
            flex: 1,
            margin: 0,
            padding: 0,
            justifyContent: 'center',
            alignItems: 'center',
        },
        image: {
            width: '48mm',
        },
        text: {
            padding: 0,
            fontSize: '24pt',
            color: '#401D0A',
        },
        link: {
            color: '#2563EB',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
        },
    });

    interface TicketDocumentProps {
        ticketImgUrl: string;
    }
    const TicketDocument = ({ ticketImgUrl }: TicketDocumentProps) => {
        return (
            <Document>
                <Page size={{ width: '50mm' }} style={styles.page}>
                    <View style={styles.section} wrap={true}>
                        <Image src={ticketImgUrl} style={styles.image} />
                    </View>
                </Page>
            </Document>
        );
    };

    const updateTicketURL = async () => {
        const ticketDiv = document.getElementById('ticket') || new HTMLDivElement();
        try {
            const canvas = await html2canvas(ticketDiv, {scale: 4});
            setTicketURL(canvas.toDataURL('image/png'));
        } catch (err) {
            console.error('Cannot convert html to canvas');
            console.error(err);
        }
    };

    const handlePDFDownload = (url: string | null) => {
        if (url && window) {
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'Terraco-ticket.pdf';
            anchor.click();
        }
    };

    const TicketView = () => (
        <Collapsible
            trigger={
                <div className="flex items-center justify-between text-sm text-gray-500 cursor-pointer">
                    <span>Visualizar Ticket</span>
                    <AiFillCaretDown />
                </div>
            }
        >
            <div id="ticket">
                <h1 className="mb-1 text-lg font-semibold text-center text-black">
                    Terraco Restaurant
                </h1>
                <div className="mb-6 text-sm text-center text-black">
                    <p>Tel. +52 492 140 3408</p>
                    <p>Cerro de la bufa, 98000 Zac.</p>
                </div>

                <div className="flex flex-row mb-6 space-x-1 text-xs text-black">
                    <ul>
                        <li>Ticket No. {ticket.ticketNumber}</li>
                        <li>Fecha: {new Date(ticket.timestamp).toLocaleDateString('es-MX')}</li>
                        <li>Tipo Pago: {ticket.paymentMethod}</li>
                    </ul>
                    <ul>
                        <li>Hora: {new Date(ticket.timestamp).toLocaleTimeString('es-MX')}</li>
                        <li>{ticket.tableName}</li>
                    </ul>
                </div>

                <table className="mb-6 text-sm">
                    <thead>
                        <tr className="text-left text-black">
                            <th className="font-semibold">Cant.</th>
                            <th className="font-semibold">Desc.</th>
                            <th className="font-semibold">Precio</th>
                            <th className="font-semibold">Importe</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs">
                        {ticket.items.map((item, idx) => (
                            <tr key={idx} className="text-xs text-black">
                                <td className="text-xs font-semibold text-black">
                                    {item.quantity}
                                </td>
                                <td className="text-xs text-left">{item.dishName}</td>
                                <td className="text-xs font-semibold">
                                    {intlFormat(item.dishPrice, 'es-MX')}
                                </td>
                                <td className="text-xs font-semibold">
                                    {intlFormat(item.amount, 'es-MX')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex flex-row-reverse">
                    <table className="mb-6 mr-2">
                        <tbody className="font-semibold text-black">
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

                <div className="flex justify-between mx-2 text-xl font-semibold text-black">
                    <span className="font-semibold text-black">Total: </span>
                    <span>{intlFormat(ticket.total, 'es-MX')}</span>
                </div>

                <p className="pt-8 text-xs text-center text-black">IVA Incluido</p>
                <p className="pb-2 text-xs text-center text-black">Gracias por su prefencia</p>
            </div>
        </Collapsible>
    );

    return (
        <div className="flex flex-col justify-between px-8 pt-4 pb-8 transition-shadow duration-300 ease-in-out bg-white sm:w-72 rounded-3xl hover:shadow-xl">
            <TicketView />
            <div className="flex items-center justify-between mb-2 sm:flex-col sm:items-start">
                <p className="font-semibold text-brown">{ticket.tableName}</p>
                <p className="text-sm text-gray-500 ">
                    {getDayMonthTime(ticket.timestamp, locale!)}
                </p>
            </div>
            <p className="text-sm text-gray-500">Pago {ticket.paymentMethod}</p>
            <p className="font-semibold text-brown-light">{intlFormat(ticket.total, locale!)}</p>

            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-2">
                <BlobProvider document={<TicketDocument ticketImgUrl={ticketURL} />}>
                    {({ loading, url, error }) => {
                        if (error) {
                            console.error(error);
                            return <p>Error</p>;
                        }

                        return loading ? (
                            <p className="text-center">Generando PDF...</p>
                        ) : (
                            <div>
                                <button
                                    onClick={() => printTicket(url)}
                                    className="w-full text-sm text-gray-500"
                                >
                                    Imprimir Ticket
                                </button>
                            </div>
                        );
                    }}
                </BlobProvider>
                <button
                    onClick={confirmPayment}
                    disabled={loading}
                    className="w-full px-6 py-3 text-sm border-2 border-solid text-mygreen border-mygreen rounded-xl disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Confirmar Pago
                </button>
            </div>
        </div>
    );
};

export default PaymentCard;
