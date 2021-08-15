import { useRouter } from 'next/router';
import { useState } from 'react';
import AddButton from '../../../components/buttons/AddButton';
import InfoTable from '../../../components/InfoTable';
import Navbar from '../../../components/layout/Navbar';
import Modal from '../../../components/modals/Modal';
import { useGetTablesQuery } from '../../../graphql/graphql';

interface Props {}

const Tables = (props: Props) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [tableId, setTableId] = useState('');
    const { data } = useGetTablesQuery();

    return (
        <>
            <div className="bg-gray-200 p-8 h-auto min-h-screen">
                <Navbar />
                <h1 className="font-semibold text-3xl text-brown">Gestion de Mesas</h1>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 2xl:grid-cols-10 gap-6 mt-6">
                    {data?.tables.map((table) => (
                        <button
                            key={table._id}
                            onClick={() => {
                                setTableId(table._id);
                                setIsOpen(true);
                            }}
                            className="w-32 h-32 text-white text-3xl font-semibold rounded-2xl"
                            style={{
                                backgroundImage: `linear-gradient(to bottom, rgba(132, 66, 5, 0.5), rgba(132, 66, 5, 0.5)), url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
                                backgroundSize: 'cover',
                            }}
                        >
                            {table.tableNumber}
                        </button>
                    ))}
                </div>

                <AddButton onClick={() => router.push('/manager/tables/addTable')} />
            </div>

            <Modal
                isOpen={isOpen}
                title="Mesa Info"
                closeModal={() => setIsOpen(false)}
                onCloseModal={() => setIsOpen(false)}
                closeBtnTitle="Imprimir QR"
            >
                {tableId && <InfoTable tableId={tableId} />}
            </Modal>
        </>
    );
};

export default Tables;
