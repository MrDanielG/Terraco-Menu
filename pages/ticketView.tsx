import { MXN } from '@dinero.js/currencies';
import ReactPDF, { Document, Image, Page, StyleSheet, View } from '@react-pdf/renderer';
import { dinero, multiply, subtract } from 'dinero.js';
import html2canvas from 'html2canvas';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BounceLoader from 'react-spinners/BounceLoader';
import BigButton from '../components/buttons/BigButton';
import {
    Dish,
    Order,
    Ticket,
    TicketStatus,
    useGenerateTicketMutation,
    useGetOrderByIdQuery,
    useGetTicketByIdQuery,
} from '../graphql/graphql';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { intlFormat } from '../lib/utils';

const BlobProvider = dynamic<ReactPDF.BlobProviderProps>(
    () => import('@react-pdf/renderer').then((mod) => mod.BlobProvider),
    { ssr: false }
);

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
    },
    section: {
        flex: 1,
        margin: 'auto',
        padding: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '5cm',
    },
    text: {
        padding: 10,
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
            <Page size={{ width: '7cm' }} style={styles.page}>
                <View style={styles.section} wrap={true}>
                    <Image src={ticketImgUrl} style={styles.image} />
                </View>
            </Page>
        </Document>
    );
};

interface Props {}
const TicketView = (props: Props) => {
    const router = useRouter();
    const { tableId, paymentMethod } = router.query;
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const { data: ticketById } = useGetTicketByIdQuery({
        variables: {
            ticketByIdId: ticket?._id || '',
        },
        pollInterval: 1000,
    });

    useEffect(() => {
        console.log(ticketById?.ticketById);
    }, [ticketById]);

    const [_currentOrder, setCurrentOrder] = useLocalStorage<CurrentOrder<Dish>>('currentOrder', {
        tableId: '',
        items: [],
    });
    const [order, setOrder] = useLocalStorage<Order | null>('myOrder', null);

    const orderRes = useGetOrderByIdQuery({
        variables: { orderByIdId: order?._id || '' },
    });
    const [ticketURL, setTicketURL] = useState(
        'https://res.cloudinary.com/brosimgstorage/image/upload/v1629850963/noimage_ycfq5j.png'
    );

    const [GenerateTicket] = useGenerateTicketMutation();

    const generateTicket = async () => {
        if (!order) {
            router.push(`/?tableId=${tableId}`);
        }
        try {
            const ticket = await GenerateTicket({
                variables: {
                    orderId: orderRes.data?.orderById._id || order?._id || '',
                    paymentMethod: paymentMethod?.toString(),
                    vat: 16,
                },
            });
            setTicket(ticket.data?.generateTicket as Ticket | null);
        } catch (err) {
            console.error(err);
        }
    };

    const updateTicketURL = async () => {
        const ticketDiv = document.getElementById('ticket') || new HTMLDivElement();
        try {
            const canvas = await html2canvas(ticketDiv);
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
            setOrder(null);
            setCurrentOrder({ items: [], tableId: '' });
            router.push('/');
        }
    };
    useEffect(() => {
        if (!ticket) {
            generateTicket();
        } else {
            updateTicketURL();
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
            {ticket && (
                <div id="ticket">
                    {ticketById?.ticketById.status !== TicketStatus.Paid ? (
                        <>
                            <p className="text-center text-lg mt-8">
                                Tu solicitud de pago está siendo atendida. En un momento un mesero
                                solicitará el dinero
                            </p>
                            <div className="flex justify-center mt-8">
                                <BounceLoader color="#3ABB2E" size={150} />
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className="text-center text-brown font-semibold text-lg mb-1">
                                Restarurante Terraco
                            </h1>
                            <div className="text-sm text-center mb-6 text-gray-700">
                                <p>Tel. 525 9263 939</p>
                                <p>Calle X No. XX Colonia XX C.P. 67252</p>
                            </div>

                            <div className="flex flex-row space-x-10 mb-6 text-sm text-gray-700">
                                <ul>
                                    <li>Ticket No. {ticket?.ticketNumber}</li>
                                    <li>
                                        Fecha:{' '}
                                        {new Date(ticket?.timestamp).toLocaleDateString('es-MX')}
                                    </li>
                                    <li>Tipo Pago: {paymentMethod}</li>
                                </ul>
                                <ul>
                                    <li>
                                        Hora:{' '}
                                        {new Date(ticket?.timestamp).toLocaleTimeString('es-MX')}
                                    </li>
                                    <li>{ticket?.tableName}</li>
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
                                    {ticket?.items.map((item, idx) => (
                                        <tr key={idx} className="text-sm text-center text-gray-700">
                                            <td className="text-brown font-semibold">
                                                {item.quantity}
                                            </td>
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
                                            <td>IVA {ticket?.vat}%</td>
                                            <td>{intlFormat(vatAmount.toJSON(), 'es-MX')}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="text-brown text-xl font-semibold flex justify-between mx-2">
                                <span className="text-brown font-semibold">Total: </span>
                                <span>{intlFormat(ticket?.total, 'es-MX')}</span>
                            </div>

                            <p className="text-center text-gray-600 text-xs pt-8">IVA Incluido</p>
                            <p className="text-center text-gray-700 text-xs pb-2">
                                Gracias por su prefencia
                            </p>
                        </>
                    )}
                </div>
            )}
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
                            {ticketById?.ticketById.status === TicketStatus.Paid && (
                                <BigButton
                                    text="Descargar PDF"
                                    onClick={() => handlePDFDownload(url)}
                                />
                            )}
                        </div>
                    );
                }}
            </BlobProvider>
        </div>
    );
};

export default TicketView;
