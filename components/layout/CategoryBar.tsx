import Image from 'next/image';
import { forwardRef, useImperativeHandle, useState, Ref } from 'react';
export interface CategoryBarRef {
    reset: () => void;
    select: (idx: number) => void;
    setIdx: (idx: number) => void;
}

interface Props {
    data: ICategoryData[];
    onClick?: (category: ICategoryData) => void;
    ref?: Ref<CategoryBarRef>;
    all_img?: string;
    default_idx?: number;
}

const CategoryBar: React.FC<Props> = forwardRef<CategoryBarRef, Props>(
    ({ data, onClick, all_img, default_idx }, ref) => {
        const [selected, setSelected] = useState(default_idx !== undefined ? default_idx : -1);

        useImperativeHandle(ref, () => ({
            reset: () => {
                setSelected(-1);
            },
            select: (idx) => {
                if (!onClick) return;
                if (idx < 0) {
                    onClick({ name: '', url: '' });
                    setSelected(-1);
                } else if (idx + 1 <= data.length) {
                    onClick(data[idx]);
                    setSelected(idx);
                }
            },
            setIdx: (idx) => {
                console.log('setIdx');
                if (idx < 0) {
                    setSelected(-1);
                } else if (idx + 1 <= data.length) {
                    setSelected(idx);
                }
            },
        }));
        return (
            <div className="flex overflow-x-auto my-8 no-scrollbar">
                {all_img && all_img !== '' && (
                    <button
                        className={`mr-6 flex flex-col items-center justify-center ${
                            selected < 0 ? 'border-b-4 border-orange' : ''
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
                                src={all_img}
                                alt="Todo"
                                className="rounded-lg"
                                layout="fill"
                                objectFit="cover"
                            />
                        </figure>
                        <p className="text-sm text-brown">Todo</p>
                    </button>
                )}

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
    }
);
CategoryBar.displayName = 'CategoryBar';
export default CategoryBar;
