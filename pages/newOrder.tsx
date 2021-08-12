import { MXN } from '@dinero.js/currencies';
import { add, dinero, multiply } from 'dinero.js';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { HiMinusSm, HiPlusSm } from 'react-icons/hi';
import BackButton from '../components/buttons/BackButton';
import BigButton from '../components/buttons/BigButton';
import CardActions from '../components/cards/parent-card/CardActions';
import CardInfo from '../components/cards/parent-card/CardInfo';
import ParentCard from '../components/cards/parent-card/ParentCard';
import Navbar from '../components/layout/Navbar';
import {
    Dish,
    Order,
    useAddItemsToOrderMutation,
    useCreateOrderItemsMutation,
    useCreateOrderMutation,
} from '../graphql/graphql';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { intlFormat } from '../lib/utils';

interface Props {}
const NewOrder = (props: Props) => {
    const router = useRouter();
    const [currentOrder, setCurrentOrder] = useLocalStorage<CurrentOrder<Dish>>('currentOrder', {
        tableId: '',
        items: [],
    });
    const [order, setOrder] = useLocalStorage<Order | null>('myOrder', null);
    const [_change, setChange] = useState(-21);

    const { items, tableId } = currentOrder;
    let total = dinero({ amount: 0, currency: MXN });
    items.forEach((item) => {
        const amount = multiply(dinero(item.dish.price), item.qty);
        total = add(total, amount);
    });
    if (order) {
        order.items.forEach((item) => {
            const amount = multiply(dinero(item.dish.price), item.quantity);
            total = add(total, amount);
        });
    }

    const [CreateOrderItemsMutation] = useCreateOrderItemsMutation();
    const [CreateOrderMutation] = useCreateOrderMutation();
    const [AddItemsToOrderMutation] = useAddItemsToOrderMutation();
    console.log('order: ', order);
    const handleQuantityChange = (idx: number, value: number) => {
        const { qty } = currentOrder.items[idx];
        const sum = qty + value;
        if (sum > 0) {
            currentOrder.items[idx].qty = sum;
        }
        setChange(sum);
        setCurrentOrder(currentOrder);
    };

    const handleCreateOrder = async () => {
        if (tableId !== '') {
            const items = currentOrder.items.map((item) => {
                return { dishId: item.dish._id, quantity: item.qty };
            });
            try {
                const itemsRes = await CreateOrderItemsMutation({
                    variables: {
                        createOrderItemsItems: items,
                    },
                });

                if (itemsRes.errors !== undefined) {
                    throw new Error('Order items could not be created.');
                }

                const itemsIds = itemsRes.data?.createOrderItems.map((item) => item._id);

                let orderRes;

                if (order) {
                    orderRes = await AddItemsToOrderMutation({
                        variables: {
                            addItemsToOrderOrderId: order._id,
                            addItemsToOrderItemsIds: itemsIds || [],
                        },
                    });
                    setCurrentOrder({ items: [], tableId: tableId });
                    setOrder(orderRes.data?.addItemsToOrder as Order);
                } else {
                    orderRes = await CreateOrderMutation({
                        variables: {
                            createOrderTableId: tableId,
                            createOrderItemsIds: itemsIds || [],
                        },
                    });
                    setCurrentOrder({ items: [], tableId: tableId });
                    setOrder(orderRes.data?.createOrder as Order);
                }

                if (orderRes.errors !== undefined) {
                    throw new Error('Order could not be created');
                }
            } catch (err) {
                console.error(err);
                toast.error('Error al crear tu orden');
            }
        }
    };
    return (
        <>
            <div className="bg-gray-200 p-8 h-auto min-h-screen">
                <Navbar itemsQty={items?.length} />
                <BackButton text="Menú" pathNameOnBack={`/?tableId=${tableId}`} />
                {order && (
                    <h1 className="font-semibold text-3xl text-brown">
                        {order.items?.length} Platillos pedidos
                    </h1>
                )}
                <div>
                    {order &&
                        order.items.map((item) => (
                            <ParentCard url_img={item.dish.url_img?.toString()} key={item.dish._id}>
                                <CardInfo>
                                    <CardInfo.Title>
                                        <span>{item.dish.name}</span>
                                    </CardInfo.Title>
                                    <CardInfo.Body>
                                        <div>
                                            Importe:{' '}
                                            {intlFormat(
                                                multiply(
                                                    dinero(item.dish.price),
                                                    item.quantity
                                                ).toJSON(),
                                                'es-MX'
                                            )}
                                        </div>
                                    </CardInfo.Body>
                                    <CardInfo.Footer>
                                        <div>Cant: {item.quantity}</div>
                                    </CardInfo.Footer>
                                </CardInfo>
                            </ParentCard>
                        ))}
                </div>
                {items && (
                    <h1 className="font-semibold text-3xl text-brown">
                        {items?.length} Platillos por pedir
                    </h1>
                )}
                <div>
                    {items &&
                        items.map((item, idx) => (
                            <ParentCard url_img={item.dish.url_img?.toString()} key={item.dish._id}>
                                <CardInfo>
                                    <CardInfo.Title>
                                        <span>{item.dish.name}</span>
                                    </CardInfo.Title>
                                    <CardInfo.Body>
                                        <div>
                                            Importe:{' '}
                                            {intlFormat(
                                                multiply(
                                                    dinero(item.dish.price),
                                                    item.qty
                                                ).toJSON(),
                                                'es-MX'
                                            )}
                                        </div>
                                    </CardInfo.Body>
                                    <CardInfo.Footer>
                                        <div>Cant: {item.qty}</div>
                                    </CardInfo.Footer>
                                </CardInfo>
                                <CardActions>
                                    <CardActions.Top
                                        icon={<HiPlusSm />}
                                        onClick={() => handleQuantityChange(idx, 1)}
                                    />
                                    <CardActions.Bottom
                                        icon={<HiMinusSm />}
                                        onClick={() => handleQuantityChange(idx, -1)}
                                    />
                                </CardActions>
                            </ParentCard>
                        ))}
                </div>
                <div>
                    {items.length > 0 && (
                        <BigButton
                            onClick={() => handleCreateOrder()}
                            text={'Ordernar: ' + intlFormat(total.toJSON(), 'es-MX')}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default NewOrder;
