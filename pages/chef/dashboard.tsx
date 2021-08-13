import { useEffect, useState } from 'react';
import ComandaCard from '../../components/cards/ComandaCard';
import Navbar from '../../components/layout/Navbar';
import {
    Order,
    Status,
    useGetOrdersQuery,
    useOrderChangesSubscription,
} from '../../graphql/graphql';

interface Props {}

const Dashboard = (props: Props) => {
    const { data: currentOrders } = useGetOrdersQuery();
    const [orders, setOrders] = useState<Order[]>([]);
    const { data } = useOrderChangesSubscription();
    let orderArray: Order[] = [];

    const filterServedOrders = (orders: Order[]) => {
        const activeOrders = orders.filter((order) => {
            return !order.items.every((item) => item.status !== Status.Cooking);
        });
        return activeOrders;
    };

    useEffect(() => {
        if (data?.orderChanges) {
            const order = data.orderChanges as Order;
            console.log('pre', orders);
            orderArray = orders.filter((currentOrder) => currentOrder._id !== order._id);
            console.log('post', orderArray);
            orderArray.push(order);
            setOrders(orderArray);
        }
    }, [data]);

    useEffect(() => {
        if (currentOrders) {
            const activeOrders = filterServedOrders(currentOrders.orders as Order[]);
            setOrders(activeOrders);
        }
    }, [currentOrders]);

    return (
        <div className="bg-gray-200 p-8 min-h-screen">
            <Navbar />
            <h1 className="font-semibold text-3xl text-brown">Dashboard</h1>

            <h2 className="mt-10 mb-6 text-brown text-lg">Entrantes</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {orders.map((order) => (
                    <ComandaCard order={order} key={order._id} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
