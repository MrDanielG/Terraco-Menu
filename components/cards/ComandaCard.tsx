import { useRouter } from 'next/router';
import { Order, Status, useChangeOrderItemsStatusMutation } from '../../graphql/graphql';

interface Props {
    order: Order;
}

const ComandaCard = ({ order }: Props) => {
    const router = useRouter();
    const { locale } = router;
    const date = new Date(order.start_time.toString()).toLocaleString(locale);
    const [changeOrderItemsStatusMutation, { loading }] = useChangeOrderItemsStatusMutation({
        variables: {
            changeOrderItemsStatusStatus: Status.Served,
            changeOrderItemsStatusOrderId: order._id,
        },
    });

    const changeOrderStatus = async () => {
        const res = await changeOrderItemsStatusMutation();
        console.log(res);
    };

    return (
        <div className="bg-white p-8 rounded-3xl flex flex-col justify-between">
            <div>
                <div className="flex justify-between">
                    <p className="text-brown font-semibold text-sm">
                        Mesa # {order.table.tableNumber}:
                    </p>
                    <p className="text-sm text-brown font-semibold">{order.table.name}</p>
                </div>
                <p className="text-sm text-gray-500 mb-4">{date}</p>

                {order.items.map((item) => (
                    <div key={item._id} className="my-2">
                        <div className="flex justify-between">
                            <p className="text-brown font-semibold">{item.dish.name}</p>
                            <p className="text-brown font-semibold">Cant: {item.quantity}</p>
                        </div>
                        <p
                            className={`text-sm ${
                                item.status === 'COOKING' ? 'text-yellow-400' : 'text-gray-500'
                            }`}
                        >
                            {item.status}
                        </p>
                    </div>
                ))}
            </div>

            <button
                onClick={changeOrderStatus}
                disabled={loading}
                className="text-mygreen border-2 border-mygreen border-solid py-3 px-6 mt-4 rounded-xl disabled:cursor-not-allowed disabled:opacity-50"
            >
                Completar
            </button>
        </div>
    );
};

export default ComandaCard;
