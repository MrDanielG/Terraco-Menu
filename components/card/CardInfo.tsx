interface Props {}

const CardInfo = (props: Props) => {
    return (
        <div className="p-5 w-full">
            <h1 className="block text-md leading-tight text-black hover:underline">
                Sopa Juchipila
            </h1>
            {/* <div className="uppercase mt-2 tracking-wide text-sm text-gray-400">
                Importe: $40:00
            </div> */}
            <p className="mt-2 text-brown font-semibold">Cant: 3</p>
        </div>
    );
};

export default CardInfo;
