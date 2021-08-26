import Image from 'next/image';
import { forwardRef, useImperativeHandle, useState, Ref } from 'react';
export interface CategoryBarRef {
    reset: () => void;
}
interface Props {
    data: ICategoryData[];
    onClick?: (category: ICategoryData) => void;
    ref?: Ref<CategoryBarRef>;
}

const CategoryBar: React.FC<Props> = forwardRef<CategoryBarRef, Props>(({ data, onClick }, ref) => {
    const [selected, setSelected] = useState(-1);

    useImperativeHandle(ref, () => ({
        reset: () => {
            setSelected(-1);
        },
    }));
    return (
        <div className="flex overflow-x-auto my-8">
            {data &&
                data.map((category, i) => (
                    <button
                        className={`mr-6 flex flex-col items-center justify-center ${
                            selected === i || selected === -1 ? '' : 'opacity-20'
                        }`}
                        key={i}
                        onClick={() => {
                            if (onClick) {
                                const toggled = selected === i;
                                onClick(toggled ? { name: '', url: '' } : category);
                                setSelected(toggled ? -1 : i);
                            }
                        }}
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
});
CategoryBar.displayName = 'CategoryBar';
export default CategoryBar;
