import { dinero, multiply } from 'dinero.js';
import { useRouter } from 'next/router';
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
import { Dish, useGetTableByIdQuery } from '../../../graphql/graphql';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { intlFormat } from '../../../lib/utils';

const TableDetail = () => {
    const router = useRouter();
    const { tableId } = router.query;
    const { data } = useGetTableByIdQuery({
        variables: {
            tableByIdId: String(tableId),
        },
    });
    const [currentOrders, setCurrentOrders] = useLocalStorage<CurrentOrder<Dish>[]>('orders', []);
    const tableOrder = currentOrders.find((order) => order.tableId === tableId);
    console.log(tableOrder);

    const handleQuantityChange = (i: number, arg1: number): void => {
        throw new Error('Function not implemented.');
    };

    return (
        <ProtectedPage username="Mesero" redirectTo="/">
            <div className="min-h-screen p-8 bg-gray-200">
                <Navbar />
                <BackButton text="Regresar" pathNameOnBack="/waiter" />
                <h1 className="text-3xl font-semibold text-brown">{data?.tableById?.name}</h1>
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

                    <Action text="Mandar a Cocina" style={{ background: '#3ABB2E' }}>
                        <HiClipboardCheck className="text-xl" />
                    </Action>

                    <Action text="Cobrar" style={{ background: '#3ABB2E' }}>
                        <HiCurrencyDollar className="text-xl" />
                    </Action>

                    <Action text="Cancelar Orden" style={{ background: '#b91c1c' }}>
                        <HiBan className="text-xl" />
                    </Action>
                </Fab>

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

                {tableOrder?.items.length === undefined && (
                    <div className="flex justify-center w-full mt-32 opacity-70">
                        <div className="flex flex-col items-center gap-4 text-sm text-gray-500">
                            <span>Aún no hay ningún platillo</span>
                            <FaUtensils className="text-xl" />
                        </div>
                    </div>
                )}
            </div>
        </ProtectedPage>
    );
};

export default TableDetail;
