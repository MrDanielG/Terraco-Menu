import AddButton from '../../components/AddButton';
import ParentCard from '../../components/card/ParentCard';
import CategoryBar from '../../components/CategoryBar';
import Navbar from '../../components/Navbar';
import ProtectedPage from '../../components/ProtectedPage';
import SearchBar from '../../components/SearchBar';
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

    return (
        <ProtectedPage username="Chef" redirectTo="/">
            <div className="bg-gray-200 p-8 h-full">
                <Navbar />
                <h1 className="font-semibold text-3xl text-brown">Menú</h1>

                <SearchBar />

                <CategoryBar data={categoryData} />

                <ParentCard />

                <ParentCard />

                <ParentCard />

                <AddButton onClick={() => console.log('Add Clicked')} />
            </div>
        </ProtectedPage>
    );
};

export default ChefHome;
