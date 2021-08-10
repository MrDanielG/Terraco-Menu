interface Props {
    children: JSX.Element | JSX.Element[];
}

const CardInfoTitle = (props: any) => {
    return (
        <h1 className="block text-md leading-tight text-black hover:underline">
            {props.children}
        </h1>
    );
};

const CardInfoBody = (props: any) => {
    return (
        <div className="uppercase mt-2 tracking-wide text-sm text-gray-400">
            {props.children}
        </div>
    );
};

const CardInfoFooter = (props: any) => {
    return <p className="mt-2 text-brown font-semibold">{props.children}</p>;
};

const CardInfo: React.FC<Props> & {
    Title: typeof CardInfoTitle;
    Body: typeof CardInfoBody;
    Footer: typeof CardInfoFooter;
} = (props: Props) => {
    return <div className="p-5 w-full">{props.children}</div>;
};
CardInfo.Title = CardInfoTitle;
CardInfo.Body = CardInfoBody;
CardInfo.Footer = CardInfoFooter;
export default CardInfo;
