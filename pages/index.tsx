import { useRouter } from 'next/router';
import { HiPlus } from 'react-icons/hi';
import CardActions from '../components/card/CardActions';
import CardInfo from '../components/card/CardInfo';
import ParentCard from '../components/card/ParentCard';
import CategoryBar from '../components/CategoryBar';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import { useGetMenusQuery } from '../graphql/graphql';
import { enUS } from '../lib/i18n/enUS';
import { esMX } from '../lib/i18n/esMX';
import { formatDinero } from '../lib/utils';

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
    const t = locale === 'es-MX' ? esMX : enUS;
    const { data, error } = useGetMenusQuery();
    const menus = data ? data.menus.filter((menu) => menu.isActive) : [];
    /* console.log("menus: ", menus);
     * console.log("error: ", error); */

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

    return (
        <div className="bg-gray-200 p-8 h-full min-h-screen">
            <Navbar />
            <h1 className="font-semibold text-3xl text-brown">Menú</h1>

            <SearchBar />

            <CategoryBar data={categoryData} />
            {menus.length > 0 &&
                menus.map((menu) => (
                    <div key={menu._id}>
                        <h2 className="mt-10 mb-6 text-brown text-lg uppercase">{menu.title}</h2>
                        {menu.dishes &&
                            menu.dishes.map((dish) => (
                                <ParentCard
                                    key={dish._id}
                                    url_img={dish.url_img?.toString()}
                                    onClick={() => router.push(`/dish/${dish._id}`)}
                                >
                                    <CardInfo>
                                        <CardInfo.Title>{dish.name}</CardInfo.Title>
                                        <CardInfo.Footer>
                                            {formatDinero(dish.price)}
                                        </CardInfo.Footer>
                                    </CardInfo>
                                    <CardActions>
                                        <CardActions.Bottom icon={<HiPlus />} />
                                    </CardActions>
                                </ParentCard>
                            ))}
                    </div>
                ))}
        </div>
    );
}
