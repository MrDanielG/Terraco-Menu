import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { animated } from 'react-spring';
import AddButton from '../../components/buttons/AddButton';
import CardInfo from '../../components/cards/parent-card/CardInfo';
import ParentCard from '../../components/cards/parent-card/ParentCard';
import CategoryBar,{CategoryBarRef} from '../../components/layout/CategoryBar';
import SearchBar, {SearchBarRef} from '../../components/layout/SearchBar';
import Navbar from '../../components/layout/Navbar';
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
    const { data, refetch } = useGetDishesQuery({ fetchPolicy: 'cache-and-network' });
    const [isOpen, setIsOpen] = useState(false);
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [dish, setDish] = useState<Dish>();
    const searchRef = useRef<SearchBarRef | null>(null);
    const catBarRef = useRef<CategoryBarRef | null>(null);
    const [delDishByIdMutation] = useDelDishByIdMutation();
    const allDishes: Dish[] = data?.dishes || [];
    const handleDeleteDish = (dishId: string) => {
        const dish = data?.dishes.find((dish) => dish._id === dishId);
        setDish(dish);
        setIsOpen(true);
    };

    useEffect(() => {
        setDishes(allDishes);
    }, [data]);
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

    const handleSearch = (results: Dish[], pattern: string) => {
        catBarRef.current?.reset();        
        if (pattern !== '' || results.length > 0) {
            setDishes(results);
        } else {
            setDishes(allDishes);
        }
    };
    const handleCategoryFilter = (category: ICategoryData) => {
        searchRef.current?.clear();
        const name = category.name;
        let filtered = allDishes;
        if(name !== '') {
            filtered = allDishes.filter(dish => dish.categories.includes(name));
        }
        setDishes(filtered);
    };

    const [springs, bind] = useSwipe(dishes.length || 0, handleDeleteDish);

    return (
        <ProtectedPage username="Chef" redirectTo="/">
            <div className="bg-gray-200 p-8 min-h-screen">
                <Navbar />
                <h1 className="font-semibold text-3xl text-brown">Platillos</h1>

                <SearchBar
                    list={dishes}
                    keys={['name', 'description']}
                    onSearch={handleSearch}
                    ref={searchRef}
                />

                <CategoryBar
                    data={categoryData}
                    onClick={handleCategoryFilter}
                    ref={catBarRef}
                    all_img="https://images.unsplash.com/photo-1452967712862-0cca1839ff27?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                />

                <h2 className="mt-10 mb-6 text-brown text-lg">Entrantes</h2>

                <p className="text-xs text-gray-500 mt-4 text-center">
                    Desliza a la izquierda para eliminar un platillo
                </p>

                {springs.map(({ x }, i) => (
                    <animated.div
                        key={i}
                        {...bind(i, dishes[i]._id)}
                        style={{ x, touchAction: 'pan-y' }}
                    >
                        <ParentCard url_img={dishes[i].url_img?.toString()}>
                            <CardInfo>
                                <CardInfo.Title>
                                    <span>{dishes[i].name}</span>
                                </CardInfo.Title>
                                <CardInfo.Footer>
                                    <span>{intlFormat(dishes[0]?.price, 'es-MX')}</span>
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
