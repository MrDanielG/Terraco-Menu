import Image from 'next/image';
interface Props {
    data: ICategoryData[];
}

const CategoryBar = ({ data }: Props) => {
    return (
        <div className="flex overflow-x-auto my-8">
            {data.map((category, i) => (
                <button
                    className="mr-6 flex flex-col items-center justify-center"
                    key={i}
                >
                    <figure className="relative w-10 h-10 mb-2">
                        <Image
                            src={category.url}
                            alt={category.name}
                            className="rounded-lg"
                            layout="fill"
                            objectFit="cover"
                        />
                    </figure>
                    <p className="text-sm text-brown">{category.name}</p>
                </button>
            ))}
        </div>
    );
};

export default CategoryBar;
