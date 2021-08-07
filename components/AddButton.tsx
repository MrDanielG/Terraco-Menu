import { HiPlusSm } from 'react-icons/hi';

interface Props {
    onClick: () => any;
}

const AddButton = ({ onClick }: Props) => {
    return (
        <button
            onClick={onClick}
            className="bg-mygreen fixed bottom-4 right-4 rounded-full p-3 hover:bg-green-700"
        >
            <HiPlusSm className="text-white text-4xl" />
        </button>
    );
};

export default AddButton;
