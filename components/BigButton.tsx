import React from 'react';

interface Props {
    text: string;
    onClick: () => any;
}

const BigButton = ({ text, onClick }: Props) => {
    return (
        <button
            onClick={onClick}
            className="bg-brown text-white w-full rounded-2xl p-3 font-semibold uppercase mt-6"
        >
            {text}
        </button>
    );
};

export default BigButton;
