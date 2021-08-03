import { HiMinusSm, HiPlusSm } from 'react-icons/hi';

interface Props {}

const CardActions = (props: Props) => {
    return (
        <>
            <div className="w-32 h-auto float-right md:w-full flex flex-wrap content-between md:block">
                <button className="w-full h-14 bg-brown-light rounded-bl-3xl text-white text-3xl mb-1 flex items-center justify-center md:w-20 md:mb-0 md:rounded-tl-3xl md:rounded-bl-none md:float-right">
                    <HiPlusSm />
                </button>
                <button className="w-full h-14 bg-brown-light rounded-tl-3xl text-white text-2xl mt-1 flex items-center justify-center md:w-20 md:mt-0 md:rounded-tr-3xl md:rounded-tl-none md:float-left">
                    <HiMinusSm />
                </button>
            </div>
        </>
    );
};
export default CardActions;
