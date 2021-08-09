import { useRouter } from 'next/router';
import { useState } from 'react';
import AddButton from '../../../components/buttons/AddButton';
import ParentCard from '../../../components/card/ParentCard';
import CategoryBar from '../../../components/CategoryBar';
import Modal from '../../../components/Modal';
import Navbar from '../../../components/Navbar';
import SearchBar from '../../../components/SearchBar';

interface Props {}

const categoryData = [
    {
        name: 'Platillos',
        url: 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    },
    {
        name: 'Bebidas',
        url: 'https://images.unsplash.com/photo-1599225745889-5697ac8ed5d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=967&q=80',
    },
    {
        name: 'Postres',
        url: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
        name: 'Ensaladas',
        url: 'https://images.unsplash.com/photo-1595670002930-b30d563cf121?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1490&q=80',
    },
];

const MenuDetail = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const {
        query: { menuId },
    } = router;
    return (
        <>
            <div className="bg-gray-200 p-8 h-auto min-h-screen">
                <Navbar />
                <h1 className="font-semibold text-3xl text-brown">
                    Nombre Menu
                </h1>

                <ParentCard />

                <ParentCard />

                <AddButton onClick={() => setIsOpen(true)} />
            </div>

            <Modal
                isOpen={isOpen}
                title="Agrega Platillos al Menú"
                closeModal={() => setIsOpen(false)}
                onCloseModal={() => console.log('Modal clsed')}
                closeBtnTitle="Cerrar"
            >
                <div>
                    <SearchBar />

                    <CategoryBar data={categoryData} />

                    <h2 className="mt-10 mb-6 text-brown text-lg">Entrantes</h2>

                    <ParentCard />
                </div>
            </Modal>
        </>
    );
};

export default MenuDetail;
