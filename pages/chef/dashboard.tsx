import ComandaCard from '../../components/ComandaCard';
import Navbar from '../../components/Navbar';

interface Props {}

const Dashboard = (props: Props) => {
    return (
        <div className="bg-gray-200 p-8 h-screen">
            <Navbar />
            <h1 className="font-semibold text-3xl text-brown">Dashboard</h1>

            <h2 className="mt-10 mb-6 text-brown text-lg">Entrantes</h2>

            <ComandaCard numTable={22} />
        </div>
    );
};

export default Dashboard;
