import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { HiPencil, HiTrash } from 'react-icons/hi';
import AddButton from '../../components/buttons/AddButton';
import CardActions from '../../components/cards/parent-card/CardActions';
import CardInfo from '../../components/cards/parent-card/CardInfo';
import ParentCard from '../../components/cards/parent-card/ParentCard';
import CategoryBar, { CategoryBarRef } from '../../components/layout/CategoryBar';
import Navbar from '../../components/layout/Navbar';
import SearchBar, { SearchBarRef } from '../../components/layout/SearchBar';
import ProtectedPage from '../../components/ProtectedPage';
import { Menu, useGetMenusNoDishesQuery } from '../../graphql/graphql';
import useRedirect from '../../hooks/useRedirect';

const categoryData = [
    {
        name: 'Activos',
        url: 'https://images.unsplash.com/photo-1617957718587-60a442884bee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
    },
    {
        name: 'Inactivos',
        url: 'https://images.unsplash.com/photo-1557682260-96773eb01377?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1315&q=80',
    },
];

interface Props {}

const ChefHome = (props: Props) => {
    useRedirect();
    const router = useRouter();
    const { data } = useGetMenusNoDishesQuery();
    const catBarRef = useRef<CategoryBarRef | null>(null);
    const searchBarRef = useRef<SearchBarRef | null>(null);
    const [menus, setMenus] = useState<Partial<Menu>[]>([]);
    const [loading, setLoading] = useState(true);
    const allMenus = data?.menus || [];
    console.log('allMenus: ', data);
    const handleCategoryFilter = (category: ICategoryData) => {
        if (searchBarRef.current) {
            searchBarRef.current.setInput('');
        }
        const isActive = category.name === 'Activos';
        setMenus(allMenus.filter((menu) => menu.isActive === isActive));
    };

    const handleSearch = (results: Partial<Menu>[], pattern: string) => {
        catBarRef.current?.reset();
        if (pattern !== '' || results.length > 0) {
            setMenus(results);
        } else {
            catBarRef.current?.select(0);
        }
    };

    const handleCatRef = (ref: CategoryBarRef | null) => {
        catBarRef.current = ref;
        if (loading && ref && data) {
            ref.select(0);
            setLoading(false);
        }
    };
    return (
        <ProtectedPage username="Chef" redirectTo="/">
            <div className="min-h-screen p-8 bg-gray-200">
                <Navbar />
                <h1 className="text-3xl font-semibold text-brown">Menús</h1>
                <SearchBar
                    list={allMenus}
                    keys={['title', 'description']}
                    onSearch={handleSearch}
                    ref={searchBarRef}
                />

                <CategoryBar
                    data={categoryData}
                    onClick={handleCategoryFilter}
                    ref={(ref) => handleCatRef(ref)}
                />
                <div className="sm:grid sm:gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5">
                    {menus.map((menu, idx) => (
                        <ParentCard
                            url_img="https://images.unsplash.com/photo-1529270296466-b09d5f5c2bab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1490&q=80"
                            key={idx}
                        >
                            <CardInfo>
                                <CardInfo.Title>
                                    <span>{menu.title}</span>
                                </CardInfo.Title>
                            </CardInfo>
                            <CardActions>
                                <CardActions.Bottom
                                    icon={<HiPencil />}
                                    onClick={() => router.push(`/chef/menu/${menu._id}`)}
                                />
                            </CardActions>
                        </ParentCard>
                    ))}
                </div>
                <AddButton onClick={() => router.push('/chef/addMenu')} />
            </div>
        </ProtectedPage>
    );
};

export default ChefHome;
