import { useState } from 'react';
import toast from 'react-hot-toast';
import { HiPlusSm } from 'react-icons/hi';
import { Dish, useAddDishToMenuMutation, useGetDishesQuery } from '../graphql/graphql';
import { intlFormat } from '../lib/utils';
import CardActions from './card/CardActions';
import CardInfo from './card/CardInfo';
import ParentCard from './card/ParentCard';
import CategoryBar from './CategoryBar';
import SearchBar from './SearchBar';

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

interface Props {
    currentDishesId: string[];
    menuId: string;
}

const AddDishToMenu = ({ currentDishesId, menuId }: Props) => {
    const getAvailableDishes = (allDishes: Dish[], dishesIdToFilter: string[]): Dish[] => {
        const availableDishes = allDishes.filter((dish) => {
            return !dishesIdToFilter.includes(dish._id);
        });
        return availableDishes;
    };

    const { data: dataDishes } = useGetDishesQuery();
    const [availableDishes, setAvailableDishes] = useState(() =>
        getAvailableDishes(dataDishes?.dishes!, currentDishesId)
    );
    const [addDishToMenuMutation] = useAddDishToMenuMutation();

    const addPlatilloToMenu = async (dishId: string) => {
        try {
            const { data } = await addDishToMenuMutation({
                variables: { addDishToMenuIdDish: dishId, addDishToMenuIdMenu: menuId },
            });
            const newCurrentDishes = data?.addDishToMenu.dishes.map((dish) => dish._id);
            const newAvailableDishes = getAvailableDishes(dataDishes?.dishes!, newCurrentDishes!);

            setAvailableDishes(newAvailableDishes);
            toast.success('Platillo Agregado a Menú');
        } catch (error) {
            console.error(error);
            toast.error('Error al Agregar Platillo');
        }
    };

    return (
        <div>
            <SearchBar />

            <CategoryBar data={categoryData} />

            <h2 className="mt-10 mb-6 text-brown text-lg">Agregar a Menu</h2>

            {availableDishes?.map((dish) => (
                <ParentCard
                    url_img={
                        dish.url_img?.toString() ||
                        'https://images.unsplash.com/photo-1602881917445-0b1ba001addf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
                    }
                    key={dish._id}
                >
                    <CardInfo>
                        <CardInfo.Title>{dish.name}</CardInfo.Title>
                        <CardInfo.Footer>{intlFormat(dish.price, 'es-MX')}</CardInfo.Footer>
                    </CardInfo>
                    <CardActions>
                        <CardActions.Bottom
                            icon={<HiPlusSm />}
                            onClick={() => addPlatilloToMenu(dish._id)}
                        />
                    </CardActions>
                </ParentCard>
            ))}
        </div>
    );
};

export default AddDishToMenu;
