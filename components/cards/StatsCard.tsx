interface Props {
    profit: number;
}

const StatsCard = (props: Props) => {
    const sign = props.profit > 0 ? '+' : '';
    const profitStr = `${sign} ${props.profit.toFixed(2)} %`;
    return (
        <div className="my-6 bg-white rounded-xl shadow-md overflow-hidden max-w-2xl md:max-w-xs h-full md:max-h-56">
            <div className="m-5 flex flex-col gap-2">
                <h1 className="text-mygreen text-5xl">{profitStr}</h1>
                <p className="text-mygreen text-sm">
                    Comparado al mes anterior
                </p>
            </div>
        </div>
    );
};

export default StatsCard;
