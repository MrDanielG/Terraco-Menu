import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { animated } from 'react-spring';
import AddButton from '../../components/buttons/AddButton';
import CardInfo from '../../components/cards/parent-card/CardInfo';
import ParentCard from '../../components/cards/parent-card/ParentCard';
import CategoryBar from '../../components/layout/CategoryBar';
import Navbar from '../../components/layout/Navbar';
import SearchBar from '../../components/layout/SearchBar';
import DangerModal from '../../components/modals/DangerModal';
import ProtectedPage from '../../components/ProtectedPage';
import { Dish, useDelDishByIdMutation, useGetDishesQuery } from '../../graphql/graphql';
import { useSwipe } from '../../hooks/useSwipe';
import { intlFormat } from '../../lib/utils';

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

const Platillos = (props: Props) => {
    const router = useRouter();
    const { data, refetch } = useGetDishesQuery();
    const [isOpen, setIsOpen] = useState(false);
    const [dish, setDish] = useState<Dish>();
    const [delDishByIdMutation] = useDelDishByIdMutation();

    const handleDeleteDish = (dishId: string) => {
        const dish = data?.dishes.find((dish) => dish._id === dishId);
        setDish(dish);
        setIsOpen(true);
    };

    const deleteDish = async () => {
        try {
            await delDishByIdMutation({ variables: { delDishByIdId: dish?._id! } });
            await refetch();
            setIsOpen(false);
            toast.success('Platillo Eliminado');
        } catch (error) {
            console.error(error);
            toast.error('Error al Eliminar Platillo');
        }
    };

    const [springs, bind] = useSwipe(data?.dishes.length || 0, handleDeleteDish);

    return (
        <ProtectedPage username="Chef" redirectTo="/">
            <div className="bg-gray-200 p-8 min-h-screen">
                <Navbar />
                <h1 className="font-semibold text-3xl text-brown">Platillos</h1>

                <SearchBar />

                <CategoryBar data={categoryData} />

                <h2 className="mt-10 mb-6 text-brown text-lg">Entrantes</h2>

                <p className="text-xs text-gray-500 mt-4 text-center">
                    Desliza a la izquierda para eliminar un platillo
                </p>

                {springs.map(({ x }, i) => (
                    <animated.div
                        key={i}
                        {...bind(i, data?.dishes[i]._id)}
                        style={{ x, touchAction: 'pan-y' }}
                    >
                        <ParentCard url_img={data?.dishes[i].url_img?.toString()}>
                            <CardInfo>
                                <CardInfo.Title>
                                    <span>{data?.dishes[i].name}</span>
                                </CardInfo.Title>
                                <CardInfo.Footer>
                                    <span>{intlFormat(data?.dishes[0]?.price, 'es-MX')}</span>
                                </CardInfo.Footer>
                            </CardInfo>
                        </ParentCard>
                    </animated.div>
                ))}

                <ParentCard />

                <AddButton onClick={() => router.push('/chef/addDish')} />
            </div>

            <DangerModal
                title="Eliminar Platillo"
                description={`Deseas eliminar el platillo "${dish?.name}"`}
                isOpen={isOpen}
                dangerBtnTitle="Eliminar"
                onCloseModal={() => setIsOpen(false)}
                onClickDangerBtn={deleteDish}
            ></DangerModal>
        </ProtectedPage>
    );
};

export default Platillos;
