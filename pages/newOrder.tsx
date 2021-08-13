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
import Modal from '../components/layout/Modal';
import Navbar from '../components/layout/Navbar';
import {
    Dish,
    Order,
    Status,
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
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
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
    const handlePayement = () => {

        if(currentOrder.items.length > 0){
            setMessage("Aún quedan ordenes por hacer. ¿Deseas continuar con el pago?");
            setIsOpen(true);            
        } else {
            let areServed = true;
            order?.items.forEach(item => {
                areServed = areServed && (item.status === Status.Served);
            });

            if(!areServed){
                setMessage("Aún faltan platos por servir. ¿Desea continuar con el pago?");
                setIsOpen(true);                
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

                <div>
                    {items &&
                        items.map((item, idx) => (
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
                                                    item.qty
                                                ).toJSON(),
                                                'es-MX'
                                            )}
                                        </span>
                                    </CardInfo.Body>
                                    <CardInfo.Footer>
                                        <span>Cant: {item.qty}</span>
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
                {order && (
                    <h1 className="font-semibold text-3xl text-brown">
                        {order.items?.length} Platillos pedidos
                    </h1>
                )}
                <>
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
                            Tu consumo hasta ahora:{' '}
                            <span>{intlFormat(total.toJSON(), 'es-MX')}</span>
                        </p>
                    )}
                    <Modal
                        title="Advertencia"
                        isOpen={isOpen}
                        closeModal={() => setIsOpen(false)}
                        onCloseModal={() => setIsOpen(false)}
                        closeBtnTitle=""
                    >
                        <div className="flex flex-col items-center justify-center">
                            <p>{message}</p>
                            <div>
                                <button onClick={()=> router.push(`/ticketView?tableId=${tableId}`) }>Sí</button>
                                <button onClick={() => setIsOpen(false)}>No</button>
                            </div>
                        </div>
                    </Modal>
                </>
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
                            text={'Pagar: ' + intlFormat(total.toJSON(), 'es-MX')}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default NewOrder;
