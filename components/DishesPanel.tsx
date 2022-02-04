import React, { useState, useRef, useEffect } from 'react';
import { Dish, useGetDishesQuery, useGetCategoriesQuery } from '../graphql/graphql';
import { ParentCard, CardInfo, CardActions } from './cards';
import CategoryBar, { CategoryBarRef } from './layout/CategoryBar';
import SearchBar, { SearchBarRef } from './layout/SearchBar';
import { intlFormat } from '../lib/utils';
import { HiPlusSm } from 'react-icons/hi';

interface Props {
    onAddDish?: (dish: Dish) => void;
}

const DishesPanel: React.FC<Props> = ({ onAddDish }) => {
    const [dishes, setDishes] = useState<Dish[]>([]);
    const searchRef = useRef<SearchBarRef>(null);
    const catBarRef = useRef<CategoryBarRef>(null);
    const { data } = useGetDishesQuery();
    const { data: cData } = useGetCategoriesQuery();
    const categoryData =
        cData?.categories.map((cat) => {
            return { name: cat.name, url: cat.url_img || '' };
        }) || [];
    const allDishes: Dish[] = data?.dishes || [];
    useEffect(() => {
        setDishes(allDishes);
    }, [data]);
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
        if (name !== '') {
            filtered = filtered.filter((dish) => dish.categories.some((cat) => cat.name === name));
        }
        setDishes(filtered);
    };

    return (
        <div className="flex flex-col w-full">
            <div className="md:px-4 min-w-full">
                <SearchBar
                    className="p-3 focus:ring-brown-light focus:border-brown-light block w-full shadow-sm sm:text-sm border-none rounded-3xl"
                    list={allDishes}
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
            </div>

            <div className="md:grid md:grid-cols-3 md:gap-8 overflow-auto md:p-4">
                {dishes.map((dish, i) => (
                    <div className="max-h-96" key={i}>
                        <ParentCard url_img={dish.url_img?.toString()}>
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
                                    onClick={() => !!onAddDish && onAddDish(dish)}
                                />
                            </CardActions>
                        </ParentCard>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DishesPanel;
