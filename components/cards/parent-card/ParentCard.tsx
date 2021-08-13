import Image from 'next/image';
import { MouseEventHandler } from 'react';

const defaultImg =
    'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

interface Props {
    url_img?: string;
    children?: JSX.Element | JSX.Element[];
    onClick?: MouseEventHandler<HTMLDivElement>;
}

const ParentCard = (props: Props) => {
    return (
        <div className="my-6 bg-white rounded-2xl shadow-lg overflow-hidden max-w-2xl md:max-w-xs cursor-pointer">
            <div className="flex md:block">
                <div className="flex-shrink-0">
                    <figure className="relative w-28 h-full md:h-40 md:w-full">
                        <Image
                            src={props?.url_img ?? defaultImg}
                            alt="Dish Img"
                            layout="fill"
                            objectFit="cover"
                            onClick={props?.onClick}
                        />
                    </figure>
                </div>
                <>{props.children}</>
            </div>
        </div>
    );
};

export default ParentCard;