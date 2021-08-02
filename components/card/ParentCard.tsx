import { HiMinusSm, HiPlusSm } from 'react-icons/hi';

interface Props {}
const ParentCard = (props: Props) => {
    return (
        <div className=" mx-3 bg-white rounded-xl shadow-md overflow-hidden max-w-2xl md:max-w-xs">
            <div className="flex md:block">
                <div className="flex-shrink-0">
                    <img
                        className="object-cover h-full w-28 md:h-40 md:w-full"
                        src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                        alt="Man looking at item at a store"
                    />
                </div>

                <div className="p-5 w-full">
                    <h1 className="block text-lg leading-tight font-medium text-black hover:underline">
                        Sopa Juchipila
                    </h1>
                    <div className="uppercase mt-2 tracking-wide text-sm text-gray-400 font-semibold">
                        Importe: $40:00
                    </div>
                    <p className="mt-2 text-brown font-semibold">Cant: 3</p>
                </div>

                <div className="w-32 h-auto flex flex-wrap content-between float-right">
                    <button className="w-full h-14 bg-brown-light rounded-bl-3xl text-white text-3xl mb-1 flex items-center justify-center">
                        <HiPlusSm />
                    </button>
                    <button className="w-full h-14 bg-brown-light rounded-tl-3xl text-white text-2xl mt-1 flex items-center justify-center">
                        <HiMinusSm />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ParentCard;
