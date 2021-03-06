import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { HiPlusSm } from 'react-icons/hi';
import {
    Dish,
    useAddDishToMenuMutation,
    useGetDishesQuery,
    useGetCategoriesQuery,
} from '../graphql/graphql';
import { intlFormat } from '../lib/utils';
import CardActions from './cards/parent-card/CardActions';
import CardInfo from './cards/parent-card/CardInfo';
import ParentCard from './cards/parent-card/ParentCard';
import CategoryBar, { CategoryBarRef } from './layout/CategoryBar';
import SearchBar, { SearchBarRef } from './layout/SearchBar';

interface Props {
    currentDishesId: string[];
    menuId: string;
}

const AddDishToMenu = ({ currentDishesId, menuId }: Props) => {
    const { data: dataDishes, refetch: refetchDishes } = useGetDishesQuery();
    const { data: cData } = useGetCategoriesQuery();
    const categoryData =
        cData?.categories.map((cat) => {
            return { name: cat.name, url: cat.url_img || '' };
        }) || [];
    const [availableDishes, setAvailableDishes] = useState<Dish[]>();
    const [addDishToMenuMutation] = useAddDishToMenuMutation();
    const allAvailableDishes = useRef<Dish[]>([]);
    const searchRef = useRef<SearchBarRef | null>(null);
    const catBarRef = useRef<CategoryBarRef | null>(null);

    const addPlatilloToMenu = async (dishId: string) => {
        try {
            const { data } = await addDishToMenuMutation({
                variables: { addDishToMenuIdDish: dishId, addDishToMenuIdMenu: menuId },
            });
            const newCurrentDishes = data?.addDishToMenu.dishes.map((dish) => dish._id);
            const newAvailableDishes = getAvailableDishes(
                dataDishes?.dishes || [],
                newCurrentDishes!
            );
            allAvailableDishes.current = newAvailableDishes;
            setAvailableDishes(newAvailableDishes);
            toast.success('Platillo Agregado a Menú');
        } catch (error) {
            console.error(error);
            toast.error('Error al Agregar Platillo');
        }
    };

    const getAvailableDishes = (allDishes: Dish[], dishesIdToFilter: string[]): Dish[] => {
        const availableDishes = allDishes.filter((dish) => {
            return !dishesIdToFilter.includes(dish._id);
        });
        return availableDishes;
    };
    const handleSearch = (results: Dish[], pattern: string) => {
        catBarRef.current?.reset();
        if (pattern !== '' || results.length > 0) {
            setAvailableDishes(results);
        } else {
            setAvailableDishes(allAvailableDishes.current);
        }
    };

    const handleCategoryFilter = (category: ICategoryData) => {
        searchRef.current?.clear();
        const name = category.name;
        let filtered = allAvailableDishes.current;
        if (name !== '') {
            filtered = filtered.filter((dish) => dish.categories.some((cat) => cat.name === name));
        }
        setAvailableDishes(filtered);
    };

    useEffect(() => {
        const filter = async () => {
            await refetchDishes();
            const availableDishes = getAvailableDishes(dataDishes?.dishes || [], currentDishesId);
            allAvailableDishes.current = availableDishes;
            setAvailableDishes(availableDishes);
        };
        filter();
    }, [dataDishes, refetchDishes, currentDishesId]);

    return (
        <>
            <SearchBar
                list={allAvailableDishes.current}
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

            <h2 className="mt-10 mb-6 text-brown text-lg">Agregar a Menú</h2>

            {availableDishes?.map((dish) => (
                <ParentCard
                    url_img={
                        dish.url_img?.toString() ||
                        'https://images.unsplash.com/photo-1602881917445-0b1ba001addf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
                    }
                    key={dish._id}
                >
                    <CardInfo>
                        <CardInfo.Title>
                            <span>{dish.name}</span>
                        </CardInfo.Title>
                        <CardInfo.Footer>
                            <span>{intlFormat(dish.price, 'es-MX')}</span>
                        </CardInfo.Footer>
                    </CardInfo>
                    <CardActions>
                        <CardActions.Bottom
                            icon={<HiPlusSm />}
                            onClick={() => addPlatilloToMenu(dish._id)}
                        />
                    </CardActions>
                </ParentCard>
            ))}
        </>
    );
};

export default AddDishToMenu;
