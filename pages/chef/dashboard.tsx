import { useEffect, useState } from 'react';
import ComandaCard from '../../components/cards/ComandaCard';
import Navbar from '../../components/layout/Navbar';
import { Order, useOrderChangesSubscription } from '../../graphql/graphql';

interface Props {}

const Dashboard = (props: Props) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const { data } = useOrderChangesSubscription();
    const orderArray: Order[] = [];

    useEffect(() => {
        console.log(data?.orderChanges);
        if (data?.orderChanges) {
            orderArray.push(data.orderChanges as Order);
            setOrders(orderArray);
        }
    }, [data]);

    useEffect(() => {
        console.log('Orders', orders);
    }, [orders]);

    return (
        <div className="bg-gray-200 p-8 h-screen">
            <Navbar />
            <h1 className="font-semibold text-3xl text-brown">Dashboard</h1>

            <h2 className="mt-10 mb-6 text-brown text-lg">Entrantes</h2>

            {orders.map((order) => (
                <ComandaCard order={order} key={order._id} />
            ))}
        </div>
    );
};

export default Dashboard;
