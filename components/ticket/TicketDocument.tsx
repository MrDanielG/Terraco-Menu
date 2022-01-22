import { Document, Image, Page, StyleSheet, View } from '@react-pdf/renderer';
// import html2canvas from 'html2canvas';
import React, { useState, useEffect } from 'react';
import { Ticket } from '../../graphql/graphql';

interface Props {
    ticketImgURL: string;
}

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

const TicketDocument: React.FC<Props> = ({ ticketImgURL }) => {
    // const [ticketImgURL, setTicketImgURL] = useState(
    //     'https://res.cloudinary.com/brosimgstorage/image/upload/v1629850963/noimage_ycfq5j.png'
    // );

    // useEffect(() => {
    //     const updateTicketURL = async () => {
    //         const ticketDiv = document.getElementById('ticket') || new HTMLDivElement();
    //         try {
    //             const canvas = await html2canvas(ticketDiv, { scale: 4 });
    //             setTicketImgURL(canvas.toDataURL('image/png'));
    //             onTicketGenerated();
    //         } catch (err) {
    //             console.error('Cannot convert html to canvas');
    //             console.error(err);
    //         }
    //     };
    //     updateTicketURL();
    // }, []);
    return (
        <Document>
            <Page size={{ width: '50mm' }} style={styles.page}>
                <View style={styles.section} wrap={true}>
                    <Image src={ticketImgURL} style={styles.image} />
                </View>
            </Page>
        </Document>
    );
};

export default TicketDocument;
