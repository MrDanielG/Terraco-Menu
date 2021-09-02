import { Switch } from '@headlessui/react';
import QRCode from 'qrcode.react';
import toast from 'react-hot-toast';
import { useGetTableByIdQuery, useUpdateTableMutation } from '../graphql/graphql';
import {
    Page,
    View,
    Document,
    StyleSheet,
    PDFDownloadLink,
    Image,
    Text,
} from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
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
        width: '7cm',
        height: '7cm',
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
interface QRDocumentProps {
    qrValue: string;
    label: string;
}
const QRDocument = ({ qrValue, label }: QRDocumentProps) => {
    return (
        <Document>
            <Page size="LETTER" style={styles.page}>
                <View style={styles.section} wrap={true}>
                    <Image src={qrValue} style={styles.image} />
                    <Text style={styles.text}>{label}</Text>
                </View>
            </Page>
        </Document>
    );
};

interface Props {
    tableId: string;
}

const InfoTable = ({ tableId }: Props) => {
    const { data } = useGetTableByIdQuery({
        variables: {
            tableByIdId: tableId,
        },
    });
    const [qrURL, setQRURL] = useState(
        'https://res.cloudinary.com/brosimgstorage/image/upload/v1629850963/noimage_ycfq5j.png'
    );
    const [updateTableMutation] = useUpdateTableMutation();
    const currentUrl = process.env.NEXT_PUBLIC_LOCAL_URI || 'http://localhost:3000';
    const qrValue = `${currentUrl}?tableId=${data?.tableById?._id}`;
    useEffect(() => {
        const canvas = document.getElementById('qrcode') as HTMLCanvasElement;
        if (canvas) {
            setQRURL(canvas.toDataURL('image/png'));
        }
    }, [setQRURL]);
    const handleChange = async () => {
        try {
            await updateTableMutation({
                variables: {
                    updateTableData: { enabled: !data?.tableById?.enabled },
                    updateTableId: tableId,
                },
            });
            toast.success('Mesa Actualizada');
        } catch (error) {
            console.error(error);
            toast.error('Error al Actualizar Mesa');
        }
    };
    return (
        <div className="mt-2">
            <div className="flex items-center justify-center">
                <QRCode value={qrValue} className="my-3" size={200} id="qrcode" />
            </div>
            <h1 className="text-center my-2 text-brown font-semibold">{data?.tableById?.name}</h1>
            <PDFDownloadLink
                style={styles.link}
                document={
                    <QRDocument qrValue={qrURL} label={`Mesa #${data?.tableById?.tableNumber}`} />
                }
                fileName="qrcode.pdf"
            >
                {({ loading }) => (loading ? 'Generando PDF...' : 'Descargar PDF')}
            </PDFDownloadLink>
            <div className="flex justify-around my-4">
                <p className="text-gray-500">Activada:</p>
                <Switch
                    checked={data?.tableById?.enabled!}
                    onChange={handleChange}
                    className={`${
                        data?.tableById?.enabled ? 'bg-blue-600' : 'bg-gray-200'
                    } relative inline-flex items-center h-6 rounded-full w-11`}
                >
                    <span className="sr-only">Enable notifications</span>
                    <span
                        className={`${
                            data?.tableById?.enabled ? 'translate-x-6' : 'translate-x-1'
                        } inline-block w-4 h-4 transform bg-white rounded-full`}
                    />
                </Switch>
            </div>
        </div>
    );
};

export default InfoTable;
