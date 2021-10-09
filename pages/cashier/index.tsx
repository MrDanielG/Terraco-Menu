import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PaymentCard from '../../components/cards/PaymentCard';
import Navbar from '../../components/layout/Navbar';
import ProtectedPage from '../../components/ProtectedPage';
import {
    Ticket,
    TicketStatus,
    useGetTicketsQuery,
    useTicketChangesSubscription,
} from '../../graphql/graphql';
import { getDayNumberDate } from '../../lib/utils';

interface Props {}

const CahsierHome = (props: Props) => {
    const router = useRouter();
    const { locale } = router;
    const { data } = useTicketChangesSubscription();
    const { data: tickets } = useGetTicketsQuery();
    const [activeTickets, setActiveTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        if (data?.ticketChanges) {
            const ticket = data.ticketChanges as Ticket;
            const newTickets = [...activeTickets];
            if (ticket.status !== TicketStatus.Paid) {
                newTickets.push(ticket);
                setActiveTickets(newTickets);
            }
        }
    }, [data]);

    useEffect(() => {
        if (tickets) {
            const nonPaidTickets = tickets?.tickets.filter((ticket) => ticket.status !== 'PAID');
            setActiveTickets(nonPaidTickets as Ticket[]);
        }
    }, [tickets]);

    return (
        <ProtectedPage username="Cajero" redirectTo="/">
            <div className="bg-gray-200 p-8 min-h-screen">
                <Navbar />
                <h1 className="font-semibold text-3xl text-brown"> {getDayNumberDate(locale!)} </h1>

                <h2 className="mt-10 mb-6 text-brown text-lg">Cobros Solicitados</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {activeTickets.map((ticket) => (
                        <PaymentCard key={ticket._id} ticket={ticket} />
                    ))}
                </div>
            </div>
        </ProtectedPage>
    );
};

export default CahsierHome;
