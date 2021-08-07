interface Props {
    numTable: number;
}

const ComandaCard = (props: Props) => {
    return (
        <div className="bg-white p-8 rounded-3xl">
            <h1 className="text-brown font-semibold text-sm">Mesa #123</h1>
            <p className="text-sm text-gray-500 mb-4">
                29 de Julio 2021, 08:28 PM
            </p>

            <div>
                <div className="flex justify-between">
                    <p className="text-brown font-semibold">Sopa de Medula</p>
                    <p className="text-brown font-semibold">Qty: 3</p>
                </div>
                <p className="text-sm text-gray-500">Sin Lechuga</p>
            </div>
            <br />

            <div className="w-full flex justify-end">
                <button className="text-mygreen border-2 border-mygreen border-solid py-3 px-6 rounded-xl">
                    Completar
                </button>
            </div>
        </div>
    );
};

export default ComandaCard;
