import { useState, useRef, useEffect } from 'react';
import { add, dinero, multiply } from 'dinero.js';
import Image from 'next/image';
import ContentLoader from 'react-content-loader';
import { toast } from 'react-hot-toast';
import { HiMinusSm, HiOutlineEmojiSad, HiPlusSm, HiTrash } from 'react-icons/hi';
import {
    CreateOrderItemsInput,
    Dish,
    Status,
    useCreateOrderItemsMutation,
    useCreateOrderWithStatusMutation,
    useGenerateTicketMutation,
    useGetTableByNumberQuery,
} from '../graphql/graphql';
import { useWindowSize } from '../hooks';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { intlFormat } from '../lib/utils';
import BigButton from './buttons/BigButton';
import DishesPanel from './DishesPanel';
import Modal from './modals/Modal';
import AddButton from './buttons/AddButton';

interface Props {}
interface SellItem extends Dish {
    quantity: number;
}

function sumSellItems(items: SellItem[]) {
    const zero = { amount: 0, currency: { base: 10, exponent: 2, code: 'MXN' } };
    if (items.length === 0) return intlFormat(zero, 'es-MX');
    let sum = dinero(zero);
    for (const item of items) {
        sum = add(sum, multiply(dinero(item.price), item.quantity));
    }
    return intlFormat(sum.toJSON(), 'es-MX');
}

const DirectSellsPanel: React.FC<Props> = () => {
    const [items, setItems] = useLocalStorage<SellItem[]>('sellItems', []);
    const [CreateOrderItems] = useCreateOrderItemsMutation();
    const [CreateOrder] = useCreateOrderWithStatusMutation();
    const [GenerateTicket] = useGenerateTicketMutation();
    const { data, loading } = useGetTableByNumberQuery({ variables: { tableNumber: -1 } });
    const windowSize = useWindowSize();
    const [isOpen, setIsOpen] = useState(false);
    const itemsDivRef = useRef<HTMLDivElement>(null);
    const [processing, setProcessing] = useState(false);
    useEffect(() => {
        itemsDivRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [items.length]);
    if (loading) {
        return (
            <ContentLoader className="mt-10" width="100%" height="80vh" viewBox="0 0 160 100">
                <rect x="0" y="0" width="30%" height="80%" />
                <rect x="35%" y="0" width="65%" height="95%" />
                <rect x="0" y="85%" width="30%" height="10%" />
            </ContentLoader>
        );
    }
    if (!!!data || !!!data.tableByNumber) {
        return (
            <div className="flex justify-center w-full my-10 opacity-70">
                <div className="flex flex-col items-center gap-4 text-center text-gray-500">
                    <span>Ooops! No se puede vender desde la barra</span>
                    <HiOutlineEmojiSad fontSize={28} />
                </div>
            </div>
        );
    }

    const handleAddDish = (dish: Dish) => {
        const newItems = [...items];
        const index = newItems.findIndex((item) => item._id === dish._id);
        if (index > -1) {
            const item = newItems[index];
            newItems[index] = { ...item, quantity: item.quantity + 1 };
        } else {
            newItems.push({ ...dish, quantity: 1 });
        }
        setItems(newItems);
    };

    const handleQuantityChange = (item: SellItem, operation: 'plus' | 'minus') => {
        const newItems = [...items];
        const index = newItems.findIndex((it) => it._id === item._id);
        if (operation === 'minus' && item.quantity === 1) {
            newItems.splice(index, 1);
        } else if (operation === 'minus') {
            newItems[index].quantity--;
        } else {
            newItems[index].quantity++;
        }
        setItems(newItems);
    };

    const handleCobrar = async () => {
        if (!!data.tableByNumber) {
            try {
                setProcessing(true);
                const orderItemsInput: CreateOrderItemsInput[] = items.map((item) => {
                    return { dishId: item._id, quantity: item.quantity };
                });
                const orderItems = await CreateOrderItems({
                    variables: { createOrderItemsItems: orderItemsInput },
                });
                const order = await CreateOrder({
                    variables: {
                        createOrderTableId: data.tableByNumber._id,
                        itemsStatus: Status.Beingpaid,
                        createOrderItemsIds:
                            orderItems.data?.createOrderItems.map((o) => o._id) || [],
                    },
                });
                if (!!order.data && !!order.data.createOrder) {
                    await GenerateTicket({
                        variables: { orderId: order.data.createOrder._id },
                    });

                  toast.success('Venta registrada, revisa la pestaña de Tickets', {duration: 3000});
                    setItems([]);
                }
            } catch (err) {
                console.error(err);
                toast.error('Error al generar ticket');
            } finally {
                setProcessing(false);
            }
        }
    };

    return (
        <div className="flex flex-col lg:flex-row mt-6 md:mt-10 h-1/4">
            <div className="h-80 lg:h-152 flex flex-col lg:mr-10 lg:w-2/4">
                <div className="h-full bg-white rounded-lg overflow-auto">
                    {items.map((item, i) => (
                        <div key={i} className="flex flex-row p-4 items-center md:text-xl">
                            <Image
                                height="100%"
                                width="100%"
                                objectFit="cover"
                                className="rounded-md"
                                src={item.url_img?.toString() || ''}
                            />
                            <div className="flex flex-col ml-2 md:ml-6 w-full">
                                <span>{item.name}</span>
                                <span className="text-brown font-bold">
                                    {intlFormat(
                                        multiply(dinero(item.price), item.quantity).toJSON(),
                                        'es-MX'
                                    )}
                                </span>
                            </div>
                            <div className="flex flex-row">
                                <button onClick={() => handleQuantityChange(item, 'minus')}>
                                    {item.quantity === 1 ? (
                                        <HiTrash className="text-red-700 text-3xl" />
                                    ) : (
                                        <HiMinusSm className="text-3xl" />
                                    )}
                                </button>
                                <span className="p-2">{item.quantity}</span>
                                <button onClick={() => handleQuantityChange(item, 'plus')}>
                                    <HiPlusSm className="text-3xl" />
                                </button>
                            </div>
                        </div>
                    ))}
                    {/*dummy div to scroll when items are added*/}
                    <div ref={itemsDivRef} />
                </div>
                <BigButton
                    text={`Cobrar: ${sumSellItems(items)}`}
                    onClick={handleCobrar}
                    isDisabled={items.length === 0 || processing}
                />
            </div>
            {windowSize.width >= 1024 ? (
                <div className="mt-6 md:mt-0 md:w-full h-96 lg:h-152 flex flex-grow">
                    <DishesPanel onAddDish={handleAddDish} />
                </div>
            ) : (
                <>
                    <AddButton onClick={() => setIsOpen(true)} />
                    <Modal
                        isOpen={isOpen}
                        title="Agrega Productos"
                        closeModal={() => setIsOpen(false)}
                        onCloseModal={() => setIsOpen(false)}
                        closeBtnTitle="Cerrar"
                    >
                        <div className="flex flex-nowrap h-96 mt-4 w-70 xs:w-full">
                            <DishesPanel onAddDish={handleAddDish} />
                        </div>
                    </Modal>
                </>
            )}
        </div>
    );
};

export default DirectSellsPanel;
