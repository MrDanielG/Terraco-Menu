import { useRouter } from 'next/router';
import React from 'react';
import Navbar from '../../components/layout/Navbar';
import ProtectedPage from '../../components/ProtectedPage';
import { useGetTablesQuery } from '../../graphql/graphql';

interface Props {}

const Waiter = (props: Props) => {
    const router = useRouter();
    const { data } = useGetTablesQuery();

    return (
        <ProtectedPage username="Mesero" redirectTo="/">
            <div className="min-h-screen p-8 bg-gray-200">
                <Navbar />
                <h1 className="text-3xl font-semibold text-brown">Mesas</h1>

                <div className="grid grid-cols-2 gap-6 mt-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 2xl:grid-cols-10">
                    {data?.tables.map((table) => (
                        <button
                            key={table._id}
                            onClick={() => router.push(`/waiter/tableDetail?tableId=${table._id}`)}
                            className="w-32 h-32 text-3xl font-semibold text-white rounded-2xl"
                            style={{
                                backgroundImage: `linear-gradient(to bottom, rgba(132, 66, 5, 0.5), rgba(132, 66, 5, 0.5)), url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
                                backgroundSize: 'cover',
                            }}
                        >
                            {table.tableNumber}
                        </button>
                    ))}
                </div>
            </div>
        </ProtectedPage>
    );
};

export default Waiter;
