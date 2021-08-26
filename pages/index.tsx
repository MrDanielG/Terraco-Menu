import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { HiPlusSm } from 'react-icons/hi';
import CardActions from '../components/cards/parent-card/CardActions';
import CardInfo from '../components/cards/parent-card/CardInfo';
import ParentCard from '../components/cards/parent-card/ParentCard';
import CategoryBar, { CategoryBarRef } from '../components/layout/CategoryBar';
import Navbar from '../components/layout/Navbar';
import SearchBar from '../components/layout/SearchBar';
import Modal from '../components/modals/Modal';
import { Dish, Order, Menu, useGetMenusQuery, useGetTableByIdQuery } from '../graphql/graphql';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { enUS } from '../lib/i18n/enUS';
import { esMX } from '../lib/i18n/esMX';
import { intlFormat } from '../lib/utils';

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

export default function Home() {
    const router = useRouter();
    const { locale } = router;
    const { tableId } = router.query;
    const t = locale === 'es-MX' ? esMX : enUS;
    const [isOpen, setIsOpen] = useState(false);
    const catBarRef = useRef<CategoryBarRef>(null);
    const [menus, setMenus] = useState<Menu[]>([]);
    const [dishes, setDishes] = useState<Dish[]>([]);
    const { data } = useGetMenusQuery();
    const fullMenus = data ? data.menus.filter((menu) => menu.isActive) : [];
    const fullDishes =
        fullMenus.length > 0
            ? fullMenus.map((menu) => menu.dishes).reduce((prev, cur) => prev.concat(cur))
            : [];
    useEffect(() => {
        setMenus(fullMenus);
    }, [data]);

    const [currentOrder, setCurrentOrder] = useLocalStorage<CurrentOrder<Dish>>('currentOrder', {
        tableId: tableId?.toString() || '',
        items: [],
    });
    const [order, _setOrder] = useLocalStorage<Order | null>('myOrder', null);

    const { refetch: tableRefetch } = useGetTableByIdQuery({
        variables: { tableByIdId: tableId?.toString() || '610718dddf48fb045b10da03' },
    });

    const nPending = `${currentOrder ? currentOrder.items.length : ''}`;
    const nOrder = `${order ? order.items.length : ''}`;
    const nItems = nOrder + (nPending !== '0' ? ' + ' + nPending : '');
    const [numItems, setNumItems] = useState(nItems);

    const handleLanguageToggle = (myLocale: 'en-US' | 'es-MX') => {
        switch (myLocale) {
            case 'es-MX':
                router.push('/', '/', { locale: 'en-US' });
                break;

            case 'en-US':
                router.push('/', '/', { locale: 'es-MX' });
                break;

            default:
                break;
        }
    };
    const validateTable = async () => {
        if (!tableId) {
            setIsOpen(true);
            return false;
        }

        const { data } = await tableRefetch({
            tableByIdId: tableId?.toString() || '',
        });

        const isTableEnabled = data.tableById?.enabled || false;
        if (!isTableEnabled || tableId === '') {
            setIsOpen(true);
            return false;
        }
        return true;
    };

    const handleDishDetails = async (path: string) => {
        const validTable = await validateTable();
        if (!validTable) return;

        if (path && path !== '') {
            router.push(path);
        }
    };

    const handleNavbarClick = async () => {
        const validTable = await validateTable();
        if (validTable && numItems !== '') {
            router.push('/newOrder');
        }
    };
    const handleAddDish = async (dish: Dish) => {
        const validTable = await validateTable();
        if (!validTable) return;

        const idx = currentOrder.items.findIndex((value) => value.dish._id === dish._id);
        currentOrder.tableId = tableId?.toString() || '';

        if (idx > -1) {
            currentOrder.items[idx].qty++;
        } else {
            currentOrder.items.push({ qty: 1, dish });
        }
        setCurrentOrder(currentOrder);
        const nPending = `${currentOrder ? currentOrder.items.length : ''}`;
        const nOrder = `${order ? order.items.length : ''}`;
        const nItems = nOrder + (nPending !== '0' ? ' + ' + nPending : '');
        setNumItems(nItems);
        toast.success(
            <Link href="/newOrder" passHref>
                <span>{`Se agregó 1 ${dish.name}  a tu orden`}</span>
            </Link>,
            { className: 'underline cursor-pointer' }
        );
    };
    const handleSearch = (results: Dish[], pattern: string) => {
        catBarRef.current?.reset();
        if (pattern !== '' || results.length > 0) {
            setMenus([]);
            setDishes(results);
        } else {
            setMenus(fullMenus);
            setDishes([]);
        }
    };

    const handleCategoryFilter = (category: ICategoryData) => {
        const name = category.name;
        let filteredMenus = fullMenus;
        if (name !== '') {
            filteredMenus = fullMenus.map((menu) => {
                const dishes = menu.dishes.filter((dish) => dish.categories.includes(name));
                return { ...menu, dishes };
            });
        }
        setMenus(filteredMenus);
    };
    return (
        <div className="bg-gray-200 p-8 min-h-screen">
            <Navbar itemsQty={numItems} onClick={handleNavbarClick} />
            <h1 className="font-semibold text-3xl text-brown">Menú</h1>

            <SearchBar
                list={fullDishes}
                keys={['name', 'description', 'categories']}
                onSearch={handleSearch}
            />

            <CategoryBar data={categoryData} onClick={handleCategoryFilter} ref={catBarRef} />
            <div>
                {menus.length > 0 &&
                    menus.map(
                        (menu) =>
                            menu.dishes.length > 0 && (
                                <div key={menu._id}>
                                    <h2 className="mt-10 mb-6 text-brown text-lg uppercase">
                                        {menu.title}
                                    </h2>
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
                                                    <span>{intlFormat(dish.price, 'es-MX')}</span>
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
                            )
                    )}
            </div>
            <div>
                {menus.length === 0 && (
                    <h2 className="mt-10 mb-6 text-brown text-lg uppercase">
                        Resultados de la búsqueda
                    </h2>
                )}
                {dishes.length > 0 && (
                    <div>
                        {dishes.map((dish) => (
                            <ParentCard
                                url_img={dish.url_img?.toString()}
                                onClick={() =>
                                    handleDishDetails(`/dish/${dish._id}?tableId=${tableId}`)
                                }
                                key={dish._id}
                            >
                                <CardInfo
                                    onClick={() =>
                                        handleDishDetails(`/dish/${dish._id}?tableId=${tableId}`)
                                    }
                                >
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
                                        onClick={(_e) => {
                                            handleAddDish(dish);
                                        }}
                                    />
                                </CardActions>
                            </ParentCard>
                        ))}
                    </div>
                )}
            </div>
            <Modal
                title=""
                isOpen={isOpen}
                closeBtnTitle="Aceptar"
                onCloseModal={() => {}}
                closeModal={() => setIsOpen(false)}
            >
                <div className="text-center">
                    {!tableId || tableId === '' ? (
                        <p>Accede desde el códgio QR que está en tu mesa para poder ordenar.</p>
                    ) : (
                        <p>Solicita que activen tu mesa para poder ordenar.</p>
                    )}
                </div>
            </Modal>
        </div>
    );
}
