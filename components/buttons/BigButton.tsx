interface Props {
    text: string;
    isDisabled?: boolean;
    onClick?: () => any;
    isFloat?: boolean;
}

const BigButton = ({ text, onClick, isDisabled, isFloat }: Props) => {
    const baseClass =
        'bg-brown text-white rounded-2xl p-3 font-semibold uppercase mt-6 disabled:bg-grey-400 disabled:cursor-not-allowed disabled:opacity-50';
    const defaultClass = 'w-full ' + baseClass;
    const floatClass = 'fixed bottom-4 w-full ' + baseClass;

    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className={isFloat ? floatClass : defaultClass}
        >
            {text}
        </button>
    );
};

export default BigButton;
