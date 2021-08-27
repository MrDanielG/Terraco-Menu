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
        <div className="flex overflow-x-auto my-8 no-scrollbar">
            <button
                className={`mr-6 flex flex-col items-center justify-center ${
                    selected === -1 ? 'border-b-4 border-orange' : ''
                }`}
                onClick={() => {
                    if (onClick) {
                        onClick({ name: '', url: '' });
                        setSelected(-1);
                    }
                }}
            >
                <figure className="relative w-10 h-10 mb-2">
                    <Image
                        src="https://images.unsplash.com/photo-1452967712862-0cca1839ff27?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                        alt="Todo"
                        className="rounded-lg"
                        layout="fill"
                        objectFit="cover"
                    />
                </figure>
                <p className="text-sm text-brown">Todo</p>
            </button>
            {data &&
                data.map((category, i) => (
                    <button
                        className={`mr-6 flex flex-col items-center justify-center ${
                            selected === i ? 'border-b-4 border-orange' : ''
                        }`}
                        key={i}
                        onClick={() => {
                            if (onClick) {
                                onClick(category);
                                setSelected(i);
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
