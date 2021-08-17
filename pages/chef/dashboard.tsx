import { useEffect, useState } from 'react';
import ComandaCard from '../../components/cards/ComandaCard';
import Navbar from '../../components/layout/Navbar';
import ProtectedPage from '../../components/ProtectedPage';
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

    const filterServedOrders = (orders: Order[]) => {
        const activeOrders = orders.filter((order) => {
            return !order.items.every((item) => item.status !== Status.Cooking);
        });
        return activeOrders;
    };

    useEffect(() => {
        if (data?.orderChanges) {
            console.log('hola');
            const order = data.orderChanges as Order;
            const orderIsNotCooking = order.items.some((item) => item.status !== Status.Cooking);
            const idx = orders.findIndex((currentOrder) => currentOrder._id === order._id);
            const orderIsNotInOrders = idx === -1;
            if (orderIsNotInOrders) {
                orders.push(order);
            } else if (orderIsNotCooking) {
                orders.splice(idx, 1);
            }
            setOrders(orders);
        }
    }, [data]);

    useEffect(() => {
        if (currentOrders) {
            const activeOrders = filterServedOrders(currentOrders.orders as Order[]);
            setOrders(activeOrders);
        }
    }, [currentOrders]);

    return (
        <ProtectedPage username="Chef" redirectTo="/">
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
        </ProtectedPage>
    );
};

export default Dashboard;
