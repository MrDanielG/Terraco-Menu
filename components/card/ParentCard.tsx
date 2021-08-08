import Image from 'next/image';
import CardActions from './CardActions';
import CardInfo from './CardInfo';

interface Props {}
const ParentCard = (props: Props) => {
    return (
        <div className="my-6 bg-white rounded-xl shadow-md overflow-hidden max-w-2xl md:max-w-xs">
            <div className="flex md:block">
                <div className="flex-shrink-0">
                    <figure className="relative w-28 h-full md:h-40 md:w-full">
                        <Image
                            src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                            alt="Dish Img"
                            layout="fill"
                            objectFit="cover"
                        />
                    </figure>
                </div>

                <CardInfo />

                <CardActions />
            </div>
        </div>
    );
};

export default ParentCard;
