interface Props {}

const StatsCard = (props: Props) => {
    return (
        <div className="my-6 bg-white rounded-xl shadow-md overflow-hidden max-w-2xl md:max-w-xs">
            <div className="m-5 flex flex-col gap-2">
                <h1 className="text-mygreen text-5xl">+%22.00</h1>
                <p className="text-mygreen text-sm">
                    Comparado al mes anterior
                </p>
            </div>
        </div>
    );
};

export default StatsCard;
