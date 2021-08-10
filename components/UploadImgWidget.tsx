import Image, { ImageLoaderProps } from 'next/image';
import { useEffect, useState } from 'react';
import { HiPhotograph } from 'react-icons/hi';

interface Props {
    onChange?: (file: File | null) => void;
}

export const uploadImage = async (image: File) => {
    const upload_endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_URI || '';
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'brosimg');
    data.append('cloud_name', 'brosimagstorage');

    const url = await fetch(upload_endpoint, {
        method: 'post',
        body: data,
    })
        .then((res) => res.json())
        .then((data) => data.url);
    return url;
};

const UploadImgWidget = (props: Props) => {
    const [image, setImage] = useState<File | null>(null);
    const [url, setUrl] = useState<string | null>(null);

    useEffect(() => {
        if (props.onChange && image) {
            props.onChange(image);
        }
        return () => setImage(null);
    }, [image, props]);

    const onImageChange = (event: React.FormEvent) => {
        const files = (event.target as HTMLInputElement).files;
        if (files && files.length > 0) {
            setImage(files[0]);
            setUrl(URL.createObjectURL(files[0]));
        }
    };

    const customImgLoader = ({ src }: ImageLoaderProps) => {
        return `${src}`;
    };

    return (
        <div className="w-40 h-40 flex justify-center items-center text-sm text-white text-center bg-brown rounded-full">
            <label htmlFor="file-upload" className="cursor-pointer">
                {/* <span>Upload a file</span> */}
                {url === null && <HiPhotograph className="w-20 h-20" />}
                {url && (
                    <figure className="relative w-40 h-40 rounded-full overflow-hidden">
                        <Image
                            src={url}
                            loader={customImgLoader}
                            alt="Dish img"
                            layout="fill"
                            objectFit="cover"
                        />
                    </figure>
                )}
                <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={(e) => onImageChange(e)}
                />
            </label>
        </div>
    );
};

export default UploadImgWidget;
