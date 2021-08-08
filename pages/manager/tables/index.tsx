import { useState } from 'react';
import AddButton from '../../../components/AddButton';
import InfoTable from '../../../components/InfoTable';
import Modal from '../../../components/Modal';
import Navbar from '../../../components/Navbar';

interface Props {}

const Tables = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }
    const nums = [1, 2, 3, 4, 5];

    return (
        <>
            <div className="bg-gray-200 p-8 h-auto min-h-screen">
                <Navbar />
                <h1 className="font-semibold text-3xl text-brown">
                    Gestion de Mesas
                </h1>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 2xl:grid-cols-10 gap-6 mt-6">
                    {nums.map((num) => (
                        <button
                            key={num}
                            className="w-32 h-32 text-white text-3xl font-semibold rounded-2xl"
                            style={{
                                backgroundImage: `linear-gradient(to bottom, rgba(132, 66, 5, 0.5), rgba(132, 66, 5, 0.5)), url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
                                backgroundSize: 'cover',
                            }}
                        >
                            {num}
                        </button>
                    ))}
                </div>

                <AddButton onClick={() => setIsOpen(true)} />
            </div>

            <Modal
                isOpen={isOpen}
                title="Mesa Info"
                closeModal={closeModal}
                onCloseModal={() => console.log('onCloseModal')}
                closeBtnTitle="Imprimir QR"
            >
                <InfoTable />
            </Modal>
        </>
    );
};

export default Tables;