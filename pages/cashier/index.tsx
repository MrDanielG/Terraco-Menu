import { useRouter } from 'next/router';
import { useEffect, useState, Fragment } from 'react';
import PaymentCard from '../../components/cards/PaymentCard';
import DirectSellsPanel from '../../components/DirectSellsPanel';
import Navbar from '../../components/layout/Navbar';
import ProtectedPage from '../../components/ProtectedPage';
import { Tab } from '@headlessui/react';

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
            const hasTicket = activeTickets.some((activeTicket) => activeTicket._id === ticket._id);
            const newTickets = [...activeTickets];
            if (ticket.status !== TicketStatus.Paid) {
                newTickets.push(ticket);
                setActiveTickets(newTickets);
            } else if (hasTicket) {
                const filteredTickets = newTickets.filter(
                    (currentTicket) => currentTicket._id !== ticket._id
                );
                setActiveTickets(filteredTickets);
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
                <Tab.Group>
                    <Tab.List className="grid gap-4 grid-cols-2 bg-brown p-2 text-white rounded-md">
                        <Tab
                            className={({ selected }) =>
                                selected
                                    ? 'p-px bg-white text-black rounded-md  hover:bg-white/[0.12]'
                                    : 'p-px hover:bg-white/[0.12]'
                            }
                        >
                            Tickets
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                selected
                                    ? 'm-left-2 p-px bg-white text-black rounded-md'
                                    : 'p-px hover:bg-white/[0.12]'
                            }
                        >
                            Venta directa
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <div className="mt-8 overflow-auto">
                                <h1 className="font-semibold text-3xl text-brown">
                                    {getDayNumberDate(locale!)}{' '}
                                </h1>

                                <h2 className="mt-10 mb-6 text-brown text-lg">
                                    Cobros Solicitados
                                </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 gap-y-8 items-start justify-items-center">
                                    {activeTickets.map((ticket, i) => (
                                        <PaymentCard key={i} ticket={ticket} />
                                    ))}
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <DirectSellsPanel />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </ProtectedPage>
    );
};

export default CahsierHome;
