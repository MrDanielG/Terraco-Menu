import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {
    HiArrowLeft,
    HiMinusSm,
    HiOutlineBookOpen,
    HiOutlineClock,
    HiPlusSm,
} from 'react-icons/hi';
import BigButton from '../../components/buttons/BigButton';
import { Dish, Order, useGetDishByIdQuery } from '../../graphql/graphql';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { intlFormat } from '../../lib/utils';

const defaultBgImg =
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
interface Props {}
const DishDetail = (props: Props) => {
    const router = useRouter();
    const { id, tableId } = router.query;
    const [quantity, setQuantity] = useState(1);

    const { data } = useGetDishByIdQuery({
        variables: {
            dishByIdId: id?.toString() || '',
        },
    });
    const [currentOrder, setCurrentOrder] = useLocalStorage<CurrentOrder<Dish>>('currentOrder', {
        tableId: tableId?.toString() || '',
        items: [],
    });
    const [currentOrders, setCurrentOrders] = useLocalStorage<CurrentOrder<Dish>[]>('orders', []);
    const [order, setOrder] = useLocalStorage<Order | null>('myOrder', null);
    const dish = data?.dishById || null;
    const nPending = `${currentOrder ? currentOrder.items.length : ''}`;
    const nOrder = `${order ? order.items.length : ''}`;
    const nItems = nOrder + (nPending !== '0' ? ' + ' + nPending : '');

    const addToOrder = (dish: Dish | null) => {
        if (!dish) return;
        const idx = currentOrder.items.findIndex((value) => value.dish._id === dish._id);
        currentOrder.tableId = tableId?.toString() || '';

        if (idx > -1) {
            currentOrder.items[idx].qty += quantity;
        } else {
            currentOrder.items.push({ qty: quantity, dish });
        }
        setCurrentOrder(currentOrder);
        //    setNumItems(currentOrder.items.length + order?.items.length);
        toast.success(`Se agregó ${quantity} ${dish.name}  a tu orden`);
        router.push('/newOrder');
    };

    const waiterAddToOrder = (dish: Dish | null) => {
        const tableOrder = currentOrders.find((order) => order.tableId === tableId);
        const tableIdx = currentOrders.findIndex((order) => order.tableId === tableId);

        if (!tableOrder || !dish) return;
        const dishIdx = tableOrder.items.findIndex((item) => item.dish._id === dish._id);

        if (dishIdx > -1) {
            tableOrder.items[dishIdx].qty += quantity;
        } else {
            tableOrder?.items.push({ qty: quantity, dish });
        }

        const newCurrentOrders = [...currentOrders];
        newCurrentOrders[tableIdx] = tableOrder;
        setCurrentOrders(newCurrentOrders);

        toast.success(`Se agregó ${quantity} ${dish.name} a tu orden`);
        router.push(`/waiter/tableDetail?tableId=${tableId}`);
    };

    return (
        <>
            <div className="h-screen">
                <div
                    className="relative w-full p-6 h-1/3"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, #00000094, #0000004c), url(${
                            dish?.url_img || defaultBgImg
                        })`,
                        backgroundSize: 'cover',
                    }}
                >
                    <div className="relative z-10 flex items-center justify-between">
                        <div
                            className="flex items-center gap-2 text-white cursor-pointer"
                            onClick={() => router.back()}
                        >
                            <HiArrowLeft /> Detalles
                        </div>
                        <div
                            className="flex h-8 max-w-sm gap-2 px-2 py-1 cursor-pointer"
                            onClick={() => router.push('/newOrder')}
                        >
                            <HiOutlineBookOpen className="text-2xl text-white" />
                            <p className="text-white">{nItems}</p>
                        </div>
                    </div>
                </div>

                <div className="absolute w-full p-6 bg-white rounded-3xl top-52">
                    <div className="flex justify-between py-8 ">
                        <h1 className="text-2xl font-semibold text-brown">{dish && dish.name}</h1>
                        <p className="text-2xl font-semibold text-brown">
                            {dish && intlFormat(dish.price, 'es-MX')}
                        </p>
                    </div>

                    <div className="flex justify-between pb-10">
                        {dish && dish.preparation_time && (
                            <div className="flex items-center h-8 max-w-sm gap-2 px-3 py-1 rounded-3xl bg-brown">
                                <HiOutlineClock className="text-xl text-white" />
                                <p className="text-sm font-semibold text-white">
                                    {dish.preparation_time.toString()}
                                </p>
                            </div>
                        )}

                        <div className="flex items-center self-end gap-2">
                            <p className="font-semibold text-brown">Cant:</p>

                            <div className="flex h-8 max-w-sm gap-2 px-2 py-1 bg-brown rounded-3xl ">
                                <button
                                    className="text-xl text-white"
                                    onClick={() => {
                                        if (quantity > 1) setQuantity(quantity - 1);
                                    }}
                                >
                                    <HiMinusSm />
                                </button>
                                <p className="font-semibold text-white">{quantity}</p>
                                <button
                                    className="text-xl text-white"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    <HiPlusSm />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="pb-4 text-xl font-semibold text-brown">Descripcion</h2>
                        <p>{dish && dish.description}</p>
                    </div>

                    <BigButton text="Añadir a la orden" onClick={() => waiterAddToOrder(dish)} />
                </div>
            </div>
        </>
    );
};

export default DishDetail;
