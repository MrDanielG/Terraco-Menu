import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { HiPlusSm } from 'react-icons/hi';
import BackButton from '../../../components/buttons/BackButton';
import CardActions from '../../../components/cards/parent-card/CardActions';
import CardInfo from '../../../components/cards/parent-card/CardInfo';
import ParentCard from '../../../components/cards/parent-card/ParentCard';
import Navbar from '../../../components/layout/Navbar';
import ProtectedPage from '../../../components/ProtectedPage';
import { Dish, Menu, useGetMenusQuery, useGetTableByIdQuery } from '../../../graphql/graphql';
import { intlFormat } from '../../../lib/utils';

interface Props {}

const TableMenu = (props: Props) => {
    const router = useRouter();
    const { data } = useGetMenusQuery();
    const { tableId } = router.query;
    const [menus, setMenus] = useState<Menu[]>([]);
    const { data: tableData } = useGetTableByIdQuery({
        variables: {
            tableByIdId: String(tableId),
        },
    });

    const fullMenus = data ? data.menus.filter((menu) => menu.isActive) : [];
    const fullDishes =
        fullMenus.length > 0
            ? fullMenus.map((menu) => menu.dishes).reduce((prev, cur) => prev.concat(cur))
            : [];

    useEffect(() => {
        setMenus(fullMenus);
    }, [data]);

    const handleAddDish = (dish: Dish) => {};

    const handleDishDetails = (value: string) => {};

    return (
        <ProtectedPage username="Mesero" redirectTo="/">
            <div className="min-h-screen p-8 bg-gray-200">
                <Navbar />
                <BackButton
                    text="Regresar"
                    pathNameOnBack={`/waiter/tableDetail?tableId=${tableId}`}
                />
                <h1 className="text-3xl font-semibold text-brown">
                    Menú {tableData?.tableById?.name}
                </h1>

                {menus.length > 0 &&
                    menus.map(
                        (menu) =>
                            menu.dishes.length > 0 && (
                                <div key={menu._id}>
                                    <h2 className="mt-10 mb-6 text-lg uppercase text-brown">
                                        {menu.title}
                                    </h2>
                                    <div className="sm:grid sm:gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5">
                                        {menu.dishes.map((dish) => (
                                            <ParentCard
                                                url_img={dish.url_img?.toString()}
                                                onClick={() =>
                                                    handleDishDetails(
                                                        `/dish/${dish._id}?tableId=${tableId}`
                                                    )
                                                }
                                                key={dish._id}
                                            >
                                                <CardInfo
                                                    onClick={() =>
                                                        handleDishDetails(
                                                            `/dish/${dish._id}?tableId=${tableId}`
                                                        )
                                                    }
                                                >
                                                    <CardInfo.Title>
                                                        <span>{dish.name}</span>
                                                    </CardInfo.Title>
                                                    <CardInfo.Footer>
                                                        <span>
                                                            {intlFormat(dish.price, 'es-MX')}
                                                        </span>
                                                    </CardInfo.Footer>
                                                </CardInfo>
                                                <CardActions>
                                                    <CardActions.Bottom
                                                        icon={<HiPlusSm />}
                                                        onClick={(_e) => {
                                                            handleAddDish(dish);
                                                        }}
                                                    />
                                                </CardActions>
                                            </ParentCard>
                                        ))}
                                    </div>
                                </div>
                            )
                    )}
            </div>
        </ProtectedPage>
    );
};

export default TableMenu;
