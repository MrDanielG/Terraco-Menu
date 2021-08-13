import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { HiPencil } from 'react-icons/hi';
import { animated } from 'react-spring';
import AddDishToMenu from '../../../components/AddDishToMenu';
import AddButton from '../../../components/buttons/AddButton';
import BackButton from '../../../components/buttons/BackButton';
import CardInfo from '../../../components/cards/parent-card/CardInfo';
import ParentCard from '../../../components/cards/parent-card/ParentCard';
import Modal from '../../../components/layout/Modal';
import Navbar from '../../../components/layout/Navbar';
import { useGetMenyByIdQuery, useRemoveDishFromMenuMutation } from '../../../graphql/graphql';
import { useSwipe } from '../../../hooks/useSwipe';
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
    const router = useRouter();
    const { id: menuId } = router.query;
    const [isOpen, setIsOpen] = useState(false);
    const [removeDishFromMenuMutation, { loading, error }] = useRemoveDishFromMenuMutation();
    const { data, refetch } = useGetMenyByIdQuery({
        variables: {
            menuByIdId: menuId?.toString() || '',
        },
    });
    const currentDishesId = data?.menuById?.dishes.map((dish) => dish._id);

    const onSwipe = async (id?: string) => {
        try {
            const res = await removeDishFromMenuMutation({
                variables: {
                    removeDishFromMenuIdDish: id || '',
                    removeDishFromMenuIdMenu: menuId?.toString() || '',
                },
            });
            console.log(res);
            toast.success('Platillo Eliminado de Menú');
        } catch (error) {
            console.error(error);
            toast.error('Error al Eliminar Platillo');
        }
    };

    const [springs, bind] = useSwipe(data?.menuById?.dishes.length || 0, onSwipe);

    return (
        <>
            <div className="bg-gray-200 p-8 h-auto min-h-screen">
                <Navbar />
                <BackButton text="Inicio" pathNameOnBack="/chef" />
                <div className="flex items-center">
                    <h1 className="font-semibold text-3xl text-brown">{data?.menuById?.title}</h1>
                    <button>
                        <HiPencil className="text-3xl text-brown ml-2" />
                    </button>
                </div>
                <p className="text-gray-500 mt-1">
                    Status:{' '}
                    <span className={data?.menuById?.isActive ? 'text-mygreen' : 'text-red-600'}>
                        {data?.menuById?.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                </p>
                <p className="text-gray-500 mt-2">{data?.menuById?.description}</p>

                {springs.map(({ x }, i) => (
                    <animated.div
                        key={i}
                        {...bind(i, data?.menuById?.dishes[i]._id)}
                        style={{ x, touchAction: 'pan-y' }}
                    >
                        <ParentCard url_img={data?.menuById?.dishes[i].url_img?.toString()}>
                            <CardInfo>
                                <CardInfo.Title>
                                    <span>{data?.menuById?.dishes[i].name}</span>
                                </CardInfo.Title>
                                <CardInfo.Footer>
                                    <span>
                                        {intlFormat(data?.menuById?.dishes[0]?.price, 'es-MX')}
                                    </span>
                                </CardInfo.Footer>
                            </CardInfo>
                        </ParentCard>
                    </animated.div>
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
                <AddDishToMenu menuId={data?.menuById?._id!} currentDishesId={currentDishesId!} />
            </Modal>
        </>
    );
};

export default MenuDetail;
