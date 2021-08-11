import { MouseEventHandler } from 'react';

interface Props {
    children: JSX.Element | JSX.Element[];
    onClick?: MouseEventHandler<HTMLDivElement>;
}

const CardInfoTitle = (props: Props) => {
    return (
        <h1
            className="block text-md leading-tight text-black hover:underline"
            onClick={props.onClick}
        >
            {props.children}
        </h1>
    );
};

const CardInfoBody = (props: Props) => {
    return (
        <div className="uppercase mt-2 tracking-wide text-sm text-gray-400" onClick={props.on}>
            {props.children}
        </div>
    );
};

const CardInfoFooter = (props: Props) => {
    return (
        <p onClick={props.onClick} className="mt-2 text-brown font-semibold">
            {props.children}
        </p>
    );
};

const CardInfo: React.FC<Props> & {
    Title: typeof CardInfoTitle;
    Body: typeof CardInfoBody;
    Footer: typeof CardInfoFooter;
} = (props: Props) => {
    return (
        <div onClick={props.onClick} className="p-5 w-full flex flex-col justify-center">
            {props.children}
        </div>
    );
};
CardInfo.Title = CardInfoTitle;
CardInfo.Body = CardInfoBody;
CardInfo.Footer = CardInfoFooter;
export default CardInfo;
