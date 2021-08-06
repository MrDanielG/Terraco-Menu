import { useRouter } from 'next/router';
import { useState } from 'react';
import {
    HiArrowLeft,
    HiMinusSm,
    HiOutlineBookOpen,
    HiOutlineClock,
    HiPlusSm,
} from 'react-icons/hi';
import BigButton from '../components/BigButton';

interface Props {}

const DishDetail = (props: Props) => {
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const addToOrder = () => {
        console.log(`Add ${quantity} to the order`);
    };

    return (
        <>
            <div className="h-screen">
                <div
                    className="p-6 h-1/3 w-full relative"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, #00000094, #0000004c), url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
                        backgroundSize: 'cover',
                    }}
                >
                    <div className="flex justify-between items-center z-10 relative">
                        <div
                            className="flex items-center text-white gap-2 cursor-pointer"
                            onClick={() => router.back()}
                        >
                            <HiArrowLeft /> Detalles
                        </div>
                        <div className="flex gap-2 px-2 py-1 max-w-sm h-8 cursor-pointer">
                            <HiOutlineBookOpen className="text-2xl text-white" />
                            <p className="text-white">4</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 rounded-3xl absolute top-52 bg-white">
                    <div className=" flex justify-between py-8">
                        <h1 className="text-brown text-2xl font-semibold">
                            Sopa estilo Juchipila
                        </h1>
                        <p className="text-brown text-2xl font-semibold">
                            $65.00
                        </p>
                    </div>

                    <div className="flex justify-between pb-10">
                        <div className="rounded-3xl bg-brown gap-2 px-3 py-1 max-w-sm h-8 flex items-center">
                            <HiOutlineClock className="text-xl text-white" />
                            <p className="text-white text-sm font-semibold">
                                4 mins
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <p className="font-semibold text-brown">Cant:</p>

                            <div className="flex bg-brown gap-2 px-2 py-1 max-w-sm h-8 rounded-3xl">
                                <button
                                    className="text-white text-xl"
                                    onClick={() => {
                                        if (quantity > 1)
                                            setQuantity(quantity - 1);
                                    }}
                                >
                                    <HiMinusSm />
                                </button>
                                <p className="text-white font-semibold">
                                    {quantity}
                                </p>
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
                        <h2 className="text-brown text-xl pb-4 font-semibold">
                            Descripcion
                        </h2>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Vitae deserunt veniam earum libero a! Nesciunt
                            culpa recusandae provident sapiente id architecto
                            tempora tenetur esse excepturi distinctio ratione,
                            veniam magni quas.
                        </p>
                    </div>

                    <BigButton text="Añadir a la orden" onClick={addToOrder} />
                </div>
            </div>
        </>
    );
};

export default DishDetail;
