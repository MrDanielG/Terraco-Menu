import { useRouter } from 'next/router';
import { useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import AddDishToMenu from '../../../components/AddDishToMenu';
import AddButton from '../../../components/buttons/AddButton';
import BackButton from '../../../components/buttons/BackButton';
import CardInfo from '../../../components/card/CardInfo';
import ParentCard from '../../../components/card/ParentCard';
import Modal from '../../../components/Modal';
import Navbar from '../../../components/Navbar';
import { useGetMenyByIdQuery } from '../../../graphql/graphql';
import { intlFormat } from '../../../lib/utils';

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
    const { id } = router.query;
    const { data, refetch } = useGetMenyByIdQuery({
        variables: {
            menuByIdId: id?.toString() || '',
        },
    });
    const menu = data?.menuById || null;
    const currentDishesId = data?.menuById?.dishes.map((dish) => dish._id);

    return (
        <>
            <div className="bg-gray-200 p-8 h-auto min-h-screen">
                <Navbar />
                <BackButton text="Inicio" pathNameOnBack="/chef" />
                <div className="flex items-center">
                    <h1 className="font-semibold text-3xl text-brown">{menu?.title}</h1>
                    <button>
                        <HiPencil className="text-3xl text-brown ml-2" />
                    </button>
                </div>
                <p className="text-gray-500 mt-1">
                    Status:{' '}
                    <span className={menu?.isActive ? 'text-mygreen' : 'text-red-600'}>
                        {menu?.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                </p>
                <p className="text-gray-500 mt-2">{menu?.description}</p>

                {menu?.dishes.map((dish) => (
                    <ParentCard url_img={dish.url_img?.toString()} key={dish._id}>
                        <CardInfo>
                            <CardInfo.Title>{dish.name}</CardInfo.Title>
                            <CardInfo.Footer>{intlFormat(dish.price, 'es-MX')}</CardInfo.Footer>
                        </CardInfo>
                    </ParentCard>
                ))}

                <AddButton onClick={() => setIsOpen(true)} />
            </div>

            <Modal
                isOpen={isOpen}
                title="Agrega Platillos al Menú"
                closeModal={() => setIsOpen(false)}
                onCloseModal={async () => {
                    setIsOpen(false);
                    await refetch();
                }}
                closeBtnTitle="Cerrar"
            >
                <AddDishToMenu menuId={menu?._id!} currentDishesId={currentDishesId!} />
            </Modal>
        </>
    );
};

export default MenuDetail;
