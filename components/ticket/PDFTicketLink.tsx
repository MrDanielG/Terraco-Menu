import React, { useEffect, useRef, useState } from 'react';
import { Ticket } from '../../graphql/graphql';
import html2canvas from 'html2canvas';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TicketDocument from './TicketDocument';
import TicketRender from './TicketRenderer';
import PulseLoader from 'react-spinners/PulseLoader';
interface Props {
    ticket: Ticket;
}

const PDFTicketLink: React.FC<Props> = ({ ticket }) => {
    const [ticketImgURL, setTicketImgURL] = useState(
        'https://res.cloudinary.com/brosimgstorage/image/upload/v1629850963/noimage_ycfq5j.png'
    );
    const ready = useRef(false);
    useEffect(() => {
        const updateTicketURL = async () => {
            const ticketDiv = document.getElementById('ticket') || new HTMLDivElement();

            try {
                const canvas = await html2canvas(ticketDiv, {
                    scale: 4,
                    onclone: (_clone, element) => {
                        element.hidden = false;
                    },
                });
                ready.current = true;
                setTicketImgURL(canvas.toDataURL('image/png'));
            } catch (err) {
                console.error('Cannot convert html to canvas');
                console.error(err);
            }
        };
        updateTicketURL();
    }, []);

    return (
        <div className="flex justify-center">
            <div id="ticket" className="sm:w-72" hidden>
                <TicketRender ticket={ticket} />
            </div>
            <PDFDownloadLink
                style={{ color: '#3ABB2E' }}
                className="text-sky-500 mt-6"
                document={<TicketDocument ticketImgURL={ticketImgURL} />}
                fileName={`ticket-${ticket.ticketNumber}.pdf`}
            >
                {() =>
                    ready.current ? 'Descargar PDF' : <PulseLoader loading={true} color="#3ABB2E" />
                }
            </PDFDownloadLink>
        </div>
    );
};

export default PDFTicketLink;
