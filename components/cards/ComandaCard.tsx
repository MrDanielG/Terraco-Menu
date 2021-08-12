import { useRouter } from 'next/router';
import { Order } from '../../graphql/graphql';

interface Props {
    order: Order;
}

const ComandaCard = ({ order }: Props) => {
    const router = useRouter();
    const { locale } = router;
    const date = new Date(order.start_time.toString()).toLocaleString(locale);

    return (
        <div className="bg-white p-8 rounded-3xl">
            <h1 className="text-brown font-semibold text-sm">Mesa # {order.table.tableNumber}</h1>
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
            <br />

            <div className="w-full flex justify-end">
                <button
                    onClick={() => console.log('Id Order: ', order._id)}
                    className="text-mygreen border-2 border-mygreen border-solid py-3 px-6 rounded-xl"
                >
                    Completar
                </button>
            </div>
        </div>
    );
};

export default ComandaCard;
