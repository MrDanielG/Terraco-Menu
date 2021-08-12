import { useRouter } from 'next/router';
import { useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import AddButton from '../../components/buttons/AddButton';
import CardActions from '../../components/cards/parent-card/CardActions';
import CardInfo from '../../components/cards/parent-card/CardInfo';
import ParentCard from '../../components/cards/parent-card/ParentCard';
import CategoryBar from '../../components/layout/CategoryBar';
import Navbar from '../../components/layout/Navbar';
import SearchBar from '../../components/layout/SearchBar';
import ProtectedPage from '../../components/ProtectedPage';
import { useGetMenusQuery } from '../../graphql/graphql';
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
    const [active, setActive] = useState(true);
    const router = useRouter();
    const { data } = useGetMenusQuery();
    const menus = data?.menus.filter((menu) => menu.isActive === active);
    const handleOnClick = (category: ICategoryData) => {
        if (category.name === 'Activos') {
            setActive(true);
        } else {
            setActive(false);
        }
    };
    return (
        <ProtectedPage username="Chef" redirectTo="/">
            <div className="bg-gray-200 p-8 h-full min-h-screen">
                <Navbar />
                <h1 className="font-semibold text-3xl text-brown">Menús</h1>

                <SearchBar />

                <CategoryBar data={categoryData} onClick={handleOnClick} />
                <div>
                    {menus &&
                        menus.map((menu) => (
                            <ParentCard
                                url_img="https://images.unsplash.com/photo-1529270296466-b09d5f5c2bab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1490&q=80"
                                key={menu._id}
                                onClick={() => router.push(`/chef/menu/${menu._id}`)}
                            >
                                <CardInfo>
                                    <CardInfo.Title>
                                        <span>{menu.title}</span>
                                    </CardInfo.Title>
                                </CardInfo>
                                <CardActions>
                                    <CardActions.Bottom icon={<HiPencil />} />
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
