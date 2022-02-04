interface Props {
    children?: JSX.Element | JSX.Element[];
}

interface ActionProps {
    icon?: JSX.Element;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children?: JSX.Element | JSX.Element[];
}

const CardActionTop = (props: ActionProps) => {
    return (
        <button
            onClick={props.onClick}
            className="w-full h-14 bg-brown-light rounded-bl-3xl text-white text-3xl mb-1 flex items-center justify-center md:w-20 md:mb-0 md:rounded-bl-none md:rounded-tr-none md:rounded-tl-3xl md:float-right absolute top-0 md:relative"
        >
            {props.icon}
        </button>
    );
};

const CardActionBottom = (props: ActionProps) => {
    return (
        <button
            onClick={props.onClick}
            className="w-full h-14 bg-brown-light rounded-tl-3xl text-white text-3xl mt-30 flex items-center justify-center md:w-20 md:mt-0 md:rounded-bl-none md:rounded-tl-none md:rounded-tr-3xl md:float-left absolute bottom-0 md:relative order-last"
        >
            {props.icon}
        </button>
    );
};

const CardActions: React.FC<Props> & {
    Top: typeof CardActionTop;
    Bottom: typeof CardActionBottom;
} = (props: Props) => {
    return (
        <div className="h-auto w-56 flex flex-wrap flex-col md:block md:w-full md:h-auto relative">
            {props.children}
        </div>
    );
};

CardActions.Top = CardActionTop;
CardActions.Bottom = CardActionBottom;

export default CardActions;
