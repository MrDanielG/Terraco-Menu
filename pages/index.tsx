import { useRouter } from 'next/router';
import ParentCard from '../components/card/ParentCard';
import CardInfo from '../components/card/CardInfo';
import CardActions from '../components/card/CardActions';
import CategoryBar from '../components/CategoryBar';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import { enUS } from '../lib/i18n/enUS';
import { esMX } from '../lib/i18n/esMX';
import { useGetMenusQuery } from '../graphql/graphql';
import { intlFormat } from '../lib/utils';
import { HiPlusSm } from 'react-icons/hi';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Dish } from '../graphql/graphql';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';

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
    const { data } = useGetMenusQuery();
    const menus = data ? data.menus.filter((menu) => menu.isActive) : [];
    const [currentOrder, setCurrentOrder] = useLocalStorage<CurrentOrder<Dish>>('currentOrder', {
        tableId: tableId?.toString() || '',
        items: [],
    });
    const [numItems, setNumItems] = useState(currentOrder.items.length);

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

    const handleAddDish = (dish: Dish) => {
        const idx = currentOrder.items.findIndex((value) => value.dish._id === dish._id);
        currentOrder.tableId = tableId?.toString() || '';

        if (idx > -1) {
            currentOrder.items[idx].qty++;
        } else {
            currentOrder.items.push({ qty: 1, dish });
        }
        console.log(name);
        setCurrentOrder(currentOrder);
        setNumItems(currentOrder.items.length);
        toast.success(
            <Link href="/newOrder">
                <span>{`Se agregó 1 ${dish.name}  a tu orden`}</span>
            </Link>,
            { className: 'underline cursor-pointer' }
        );
    };

    return (
        <div className="bg-gray-200 p-8 h-full">
            <Navbar itemsQty={numItems} />
            <h1 className="font-semibold text-3xl text-brown">Menú</h1>

            <SearchBar />

            <CategoryBar data={categoryData} />
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
                                            onClick={() => router.push(`/dish/${dish._id}`)}
                                            key={dish._id}
                                        >
                                            <CardInfo
                                                onClick={() => router.push(`/dish/${dish._id}`)}
                                            >
                                                <CardInfo.Title>{dish.name}</CardInfo.Title>
                                                <CardInfo.Footer>
                                                    {intlFormat(dish.price, 'es-MX')}
                                                </CardInfo.Footer>
                                            </CardInfo>
                                            <CardActions>
                                                <CardActions.Bottom
                                                    icon={<HiPlusSm />}
                                                    onClick={(e) => {
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
        </div>
    );
}
