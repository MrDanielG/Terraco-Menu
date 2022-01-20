import { dinero, multiply } from 'dinero.js';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { FaUtensils } from 'react-icons/fa';
import {
    HiBan,
    HiClipboardCheck,
    HiCurrencyDollar,
    HiMinusSm,
    HiPlus,
    HiPlusSm,
} from 'react-icons/hi';
import { Action, Fab } from 'react-tiny-fab';
import BackButton from '../../../components/buttons/BackButton';
import CardActions from '../../../components/cards/parent-card/CardActions';
import CardInfo from '../../../components/cards/parent-card/CardInfo';
import ParentCard from '../../../components/cards/parent-card/ParentCard';
import Navbar from '../../../components/layout/Navbar';
import ProtectedPage from '../../../components/ProtectedPage';
import {
    Dish,
    useAddItemsToOrderMutation,
    useCreateOrderItemsMutation,
    useCreateOrderMutation,
    useGetOrderByIdQuery,
    useGetTableByIdQuery,
} from '../../../graphql/graphql';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { intlFormat } from '../../../lib/utils';

const TableDetail = () => {
    const router = useRouter();
    const { tableId } = router.query;
    const [CreateOrderMutation] = useCreateOrderMutation();
    const [CreateOrderItemsMutation] = useCreateOrderItemsMutation();
    const [AddItemsToOrderMutation] = useAddItemsToOrderMutation();
    const [currentOrders, setCurrentOrders] = useLocalStorage<CurrentOrder<Dish>[]>('orders', []);
    const tableOrder = currentOrders.find((order) => order.tableId === tableId);
    const tableIdx = currentOrders.findIndex((order) => order.tableId === tableId);
    const { data: dataTable } = useGetTableByIdQuery({
        variables: {
            tableByIdId: String(tableId),
        },
    });
    const { data: dataOrder, refetch: orderRefetch } = useGetOrderByIdQuery({
        variables: {
            orderByIdId: tableOrder?.orderId || '',
        },
    });

    const updateCurrentOrder = (items: CurrentOrderItem<Dish>[], orderId?: string) => {
        if (!tableOrder) return;

        const newCurrentOrders = [...currentOrders];
        newCurrentOrders[tableIdx] = tableOrder;
        newCurrentOrders[tableIdx].items = items;

        if (orderId) newCurrentOrders[tableIdx].orderId = orderId;
        setCurrentOrders(newCurrentOrders);
    };

    const handleQuantityChange = (idx: number, value: number): void => {
        if (!tableOrder) return;
        const { qty } = tableOrder.items[idx]!;
        const sum = qty + value;
        if (sum > 0) {
            tableOrder.items[idx].qty = sum;
        } else {
            const newItems = tableOrder.items.filter((_order, i) => i !== idx);
            updateCurrentOrder(newItems);
            toast('Platillo Eliminado', {
                icon: '👏',
            });
        }

        const newOrders = [...currentOrders];
        newOrders[tableIdx] = tableOrder;
        setCurrentOrders(newOrders);
    };

    const handleCreateOrder = async () => {
        if (!tableId || !tableOrder) return;

        const items = tableOrder.items.map((item) => {
            return { dishId: item.dish._id, quantity: item.qty };
        });

        if (items.length <= 0) return toast.error('No hay platillos para enviar');

        try {
            const { data, errors } = await CreateOrderItemsMutation({
                variables: {
                    createOrderItemsItems: items,
                },
            });

            if (errors !== undefined) throw new Error('Order items could not be created');

            const itemsIds = data?.createOrderItems.map((item) => item._id);

            if (tableOrder.orderId) {
                await AddItemsToOrderMutation({
                    variables: {
                        addItemsToOrderOrderId: tableOrder.orderId,
                        addItemsToOrderItemsIds: itemsIds || [],
                    },
                });
                updateCurrentOrder([]);
            } else {
                const { data } = await CreateOrderMutation({
                    variables: {
                        createOrderTableId: tableId.toString(),
                        createOrderItemsIds: itemsIds || [],
                    },
                });
                updateCurrentOrder([], data?.createOrder._id);
                orderRefetch();
            }
            toast.success('Pedido enviado a Cocina');
        } catch (error) {
            console.error(error);
            toast.error('Error al mandara  cocina');
        }
    };

    return (
        <ProtectedPage username="Mesero" redirectTo="/">
            <div className="min-h-screen p-8 bg-gray-200">
                <Navbar />
                <BackButton text="Regresar" pathNameOnBack="/waiter" />
                <h1 className="text-3xl font-semibold text-brown">{dataTable?.tableById?.name}</h1>
                <Fab
                    icon={<HiPlus className="text-3xl" />}
                    alwaysShowTitle={true}
                    mainButtonStyles={{ background: '#3ABB2E' }}
                >
                    <Action
                        text="Menu"
                        style={{ background: '#3ABB2E' }}
                        onClick={() => router.push(`/waiter/tableDetail/menu?tableId=${tableId}`)}
                    >
                        <FaUtensils />
                    </Action>

                    <Action
                        text="Mandar a Cocina"
                        style={{ background: '#3ABB2E' }}
                        onClick={handleCreateOrder}
                    >
                        <HiClipboardCheck className="text-xl" />
                    </Action>

                    <Action text="Cobrar" style={{ background: '#3ABB2E' }}>
                        <HiCurrencyDollar className="text-xl" />
                    </Action>

                    <Action text="Cancelar Orden" style={{ background: '#b91c1c' }}>
                        <HiBan className="text-xl" />
                    </Action>
                </Fab>

                {(tableOrder === undefined || tableOrder.items.length <= 0) && (
                    <>
                        <h2 className="mt-4 text-brown">Nuevos Platillos:</h2>
                        <div className="flex justify-center w-full my-10 opacity-70">
                            <div className="flex flex-col items-center gap-4 text-sm text-gray-500">
                                <span>Ooops! Olvidaste ordenar?</span>
                                <FaUtensils className="text-xl" />
                            </div>
                        </div>
                    </>
                )}

                <div className="sm:grid sm:gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5">
                    {tableOrder?.items.map((order, i) => (
                        <ParentCard url_img={order.dish.url_img?.toString()} key={i}>
                            <CardInfo>
                                <CardInfo.Title>
                                    <span>{order.dish.name}</span>
                                </CardInfo.Title>
                                <CardInfo.Body>
                                    <span>
                                        Importe:{' '}
                                        {intlFormat(
                                            multiply(dinero(order.dish.price), order.qty).toJSON(),
                                            'es-MX'
                                        )}
                                    </span>
                                </CardInfo.Body>
                                <CardInfo.Footer>
                                    <span> Cant: {order.qty} </span>
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
                    ))}
                </div>

                {tableOrder?.orderId && <h2 className="mt-4 text-brown">Platillos Pedidos:</h2>}

                {dataOrder?.orderById.items.map((item) => (
                    <ParentCard url_img={item.dish.url_img?.toString()} key={item._id}>
                        <CardInfo>
                            <CardInfo.Title>
                                <span>{item.dish.name}</span>
                            </CardInfo.Title>
                            <CardInfo.Body>
                                <span>
                                    Importe:{' '}
                                    {intlFormat(
                                        multiply(dinero(item.dish.price), item.quantity).toJSON(),
                                        'es-MX'
                                    )}
                                </span>
                            </CardInfo.Body>
                            <CardInfo.Footer>
                                <span> Cant: {item.quantity} </span>
                            </CardInfo.Footer>
                        </CardInfo>
                    </ParentCard>
                ))}
            </div>
        </ProtectedPage>
    );
};

export default TableDetail;
