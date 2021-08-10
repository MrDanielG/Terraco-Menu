import { useRouter } from 'next/router';
import { HiOutlineChevronLeft } from 'react-icons/hi';

interface Props {
    text: string;
    pathNameOnBack: string;
}

const BackButton = ({ text, pathNameOnBack }: Props) => {
    const router = useRouter();
    return (
        <button
            className="flex items-center text-gray-500 mb-6"
            onClick={() => router.push(pathNameOnBack)}
        >
            <HiOutlineChevronLeft className="mr-1" /> {text}
        </button>
    );
};

export default BackButton;
