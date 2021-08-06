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
                    <img
                        src={category.url}
                        alt=""
                        className="w-11 h-11 rounded-lg mb-2"
                    />
                    <p className="text-sm text-brown">{category.name}</p>
                </button>
            ))}
        </div>
    );
};

export default CategoryBar;
