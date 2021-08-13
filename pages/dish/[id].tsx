import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {
    HiArrowLeft,
    HiMinusSm,
    HiOutlineBookOpen,
    HiOutlineClock,
    HiPlusSm
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
    return (
        <>
            <div className="h-screen">
                <div
                    className="p-6 h-1/3 w-full relative"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, #00000094, #0000004c), url(${
                            dish?.url_img || defaultBgImg
                        })`,
                        backgroundSize: 'cover',
                    }}
                >
                    <div className="flex justify-between items-center z-10 relative">
                        <div
                            className="flex items-center text-white gap-2 cursor-pointer"
                            onClick={() => router.push('/?tableId=' + tableId)}
                        >
                            <HiArrowLeft /> Detalles
                        </div>
                        <div
                            className="flex gap-2 px-2 py-1 max-w-sm h-8 cursor-pointer"
                            onClick={() => router.push('/newOrder')}
                        >
                            <HiOutlineBookOpen className="text-2xl text-white" />
                            <p className="text-white">{nItems}</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 rounded-3xl absolute top-52 bg-white w-full">
                    <div className=" flex justify-between py-8">
                        <h1 className="text-brown text-2xl font-semibold">{dish && dish.name}</h1>
                        <p className="text-brown text-2xl font-semibold">
                            {dish && intlFormat(dish.price, 'es-MX')}
                        </p>
                    </div>

                    <div className="flex justify-between pb-10">
                        {dish && dish.preparation_time && (
                            <div className="rounded-3xl bg-brown gap-2 px-3 py-1 max-w-sm h-8 flex items-center">
                                <HiOutlineClock className="text-xl text-white" />
                                <p className="text-white text-sm font-semibold">
                                    {dish.preparation_time.toString()}
                                </p>
                            </div>
                        )}

                        <div className="flex items-center gap-2 self-end">
                            <p className="font-semibold text-brown">Cant:</p>

                            <div className="flex bg-brown gap-2 px-2 py-1 max-w-sm h-8 rounded-3xl ">
                                <button
                                    className="text-white text-xl"
                                    onClick={() => {
                                        if (quantity > 1) setQuantity(quantity - 1);
                                    }}
                                >
                                    <HiMinusSm />
                                </button>
                                <p className="text-white font-semibold">{quantity}</p>
                                <button
                                    className="text-white text-xl"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    <HiPlusSm />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-brown text-xl pb-4 font-semibold">Descripcion</h2>
                        <p>{dish && dish.description}</p>
                    </div>

                    <BigButton text="Añadir a la orden" onClick={() => addToOrder(dish)} />
                </div>
            </div>
        </>
    );
};

export default DishDetail;
