interface Props {
    text: string;
    isDisabled?: boolean;
    onClick?: () => any;
}

const BigButton = ({ text, onClick, isDisabled }: Props) => {
    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className="bg-brown text-white w-full rounded-2xl p-3 font-semibold uppercase mt-6 disabled:bg-grey-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {text}
        </button>
    );
};

export default BigButton;
