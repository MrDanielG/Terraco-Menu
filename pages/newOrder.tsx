import { MXN } from '@dinero.js/currencies';
import { add, dinero, multiply } from 'dinero.js';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { HiMinusSm, HiPlusSm } from 'react-icons/hi';
import { animated } from 'react-spring';
import BackButton from '../components/buttons/BackButton';
import BigButton from '../components/buttons/BigButton';
import CardActions from '../components/cards/parent-card/CardActions';
import CardInfo from '../components/cards/parent-card/CardInfo';
import ParentCard from '../components/cards/parent-card/ParentCard';
import Navbar from '../components/layout/Navbar';
import DangerModal from '../components/modals/DangerModal';
import PaymentModal from '../components/modals/PaymentModal';
import {
    Dish,
    Order,
    Status,
    useAddItemsToOrderMutation,
    useCreateOrderItemsMutation,
    useCreateOrderMutation,
    useGetOrderByIdQuery,
} from '../graphql/graphql';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useSwipe } from '../hooks/useSwipe';
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
    const [isDangerOpen, setIsDangerOpen] = useState(false);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [message, setMessage] = useState('');

    const { items, tableId } = currentOrder;
    let total = dinero({ amount: 0, currency: MXN });
    let currentTotal = dinero({ amount: 0, currency: MXN });

    items.forEach((item) => {
        const amount = multiply(dinero(item.dish.price), item.qty);
        currentTotal = add(currentTotal, amount);
    });
    if (order) {
        order.items.forEach((item) => {
            const amount = multiply(dinero(item.dish.price), item.quantity);
            total = add(total, amount);
        });
    }
    const { refetch: orderRefetch } = useGetOrderByIdQuery({
        variables: { orderByIdId: order?._id || '' },
    });
    const [CreateOrderItemsMutation] = useCreateOrderItemsMutation();
    const [CreateOrderMutation] = useCreateOrderMutation();
    const [AddItemsToOrderMutation] = useAddItemsToOrderMutation();

    const nPending = `${currentOrder ? currentOrder.items.length : ''}`;
    const nOrder = `${order ? order.items.length : ''}`;
    const nItems = nOrder + (nPending !== '0' ? ' + ' + nPending : '');

    const handleQuantityChange = (idx: number, value: number) => {
        const { qty } = currentOrder.items[idx];
        const sum = qty + value;
        if (sum > 0) {
            currentOrder.items[idx].qty = sum;
        }
        setChange(sum);
        setCurrentOrder(currentOrder);
    };
    const handlePayement = async () => {
        if (currentOrder.items.length > 0) {
            setMessage('Aún quedan ordenes por hacer. ¿Deseas continuar con el pago?');
            if (!isDangerOpen) setIsPaymentOpen(true);
            setIsDangerOpen(true);
        } else {
            const {
                data: {
                    orderById: { items },
                },
            } = await orderRefetch({
                orderByIdId: order?._id,
            });
            let areServed = true;
            items.forEach((item) => {
                areServed = areServed && item.status === Status.Served;
            });

            if (!areServed) {
                setMessage('Aún faltan platos por servir. ¿Deseas continuar con el pago?');
                setIsDangerOpen(true);
            } else {
                setIsPaymentOpen(true);
            }
        }
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
    const handleDeleteDish = (id: string) => {
        const newItems = currentOrder.items.filter((item) => item.dish._id !== id);
        const newOrder: CurrentOrder<Dish> = {
            tableId: currentOrder.tableId,
            items: newItems,
        };
        setCurrentOrder(newOrder);
        toast.success('Platillo Eliminado de la Orden');
    };

    const [springs, bind] = useSwipe(currentOrder.items.length, handleDeleteDish);

    return (
        <>
            <div className="bg-gray-200 p-8 h-auto min-h-screen">
                <Navbar itemsQty={nItems} />
                <BackButton text="Menú" pathNameOnBack={`/?tableId=${tableId}`} />
                {items && items.length > 0 && (
                    <h1 className="font-semibold text-3xl text-brown">
                        {items?.length} Platillos por pedir
                    </h1>
                )}

                {springs.map(({ x }, i) => (
                    <animated.div
                        key={i}
                        {...bind(i, currentOrder.items[i].dish._id)}
                        style={{ x, touchAction: 'pan-y' }}
                    >
                        <ParentCard
                            url_img={currentOrder.items[i].dish?.url_img?.toString()}
                            key={i + 1}
                        >
                            <CardInfo>
                                <CardInfo.Title>
                                    <span>{currentOrder.items[i].dish.name}</span>
                                </CardInfo.Title>
                                <CardInfo.Body>
                                    <span>
                                        Importe:{' '}
                                        {intlFormat(
                                            multiply(
                                                dinero(currentOrder.items[i].dish.price),
                                                currentOrder.items[i].qty
                                            ).toJSON(),
                                            'es-MX'
                                        )}
                                    </span>
                                </CardInfo.Body>
                                <CardInfo.Footer>
                                    <span>Cant: {currentOrder.items[i].qty}</span>
                                </CardInfo.Footer>
                            </CardInfo>
                            <CardActions>
                                <CardActions.Top
                                    icon={<HiPlusSm />}
                                    onClick={() => handleQuantityChange(i, 1)}
                                />
                                <CardActions.Bottom
                                    icon={<HiMinusSm />}
                                    onClick={() => handleQuantityChange(i, -1)}
                                />
                            </CardActions>
                        </ParentCard>
                    </animated.div>
                ))}

                {order && (
                    <h1 className="font-semibold text-3xl text-brown">
                        {order.items?.length} Platillos pedidos
                    </h1>
                )}

                <p className="text-xs text-gray-500 mt-4 text-center">
                    Desliza a la izquierda para eliminar un platillo
                </p>

                {order &&
                    order.items.map((item, idx) => (
                        <ParentCard url_img={item.dish?.url_img?.toString()} key={idx + 1}>
                            <CardInfo>
                                <CardInfo.Title>
                                    <span>{item.dish.name}</span>
                                </CardInfo.Title>
                                <CardInfo.Body>
                                    <span>
                                        Importe:{' '}
                                        {intlFormat(
                                            multiply(
                                                dinero(item.dish.price),
                                                item.quantity
                                            ).toJSON(),
                                            'es-MX'
                                        )}
                                    </span>
                                </CardInfo.Body>
                                <CardInfo.Footer>
                                    <span>Cant: {item.quantity}</span>
                                </CardInfo.Footer>
                            </CardInfo>
                        </ParentCard>
                    ))}
                {order && items.length > 0 && (
                    <p className="uppercase mt-2 tracking-wide text-sm text-gray-600 text-center mb-5">
                        Tu consumo hasta ahora: <span>{intlFormat(total.toJSON(), 'es-MX')}</span>
                    </p>
                )}
                <DangerModal
                    title="Advertencia"
                    description={message}
                    isOpen={isDangerOpen}
                    dangerBtnTitle="Continuar"
                    onCloseModal={() => setIsDangerOpen(false)}
                    onClickDangerBtn={() => {
                        setIsDangerOpen(false);
                        setIsPaymentOpen(true);
                    }}
                />

                <PaymentModal
                    isOpen={isPaymentOpen}
                    tableId={tableId}
                    onCloseModal={() => setIsPaymentOpen(false)}
                />

                <div>
                    {items.length > 0 && (
                        <BigButton
                            isFloat={false}
                            onClick={() => handleCreateOrder()}
                            text={'Ordernar: ' + intlFormat(currentTotal.toJSON(), 'es-MX')}
                        />
                    )}
                    {order && items.length < 1 && (
                        <BigButton
                            isFloat={false}
                            onClick={() => handlePayement()}
                            text={'Solicitar Cobro: ' + intlFormat(total.toJSON(), 'es-MX')}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default NewOrder;
